const db = require('../db/database');


const multer = require('multer');
const path = require('path');

// Setup multer storage
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

exports.uploadPhoto = [
  upload.single('photo'),
  (req, res) => {
    const medicationId = req.params.id;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!filePath) return res.status(400).json({ message: 'No file uploaded' });

    const db = require('../db/database');
    db.run(
      `UPDATE medications SET photo_path = ? WHERE id = ?`,
      [filePath, medicationId],
      function (err) {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Photo uploaded', path: filePath });
      }
    );
  }
];



exports.getMedications = (req, res) => {
  db.all(`SELECT * FROM medications WHERE user_id = ?`, [req.user.id], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};

exports.addMedication = (req, res) => {
  const { name, dosage, frequency, date, time } = req.body;
  db.run(`INSERT INTO medications (user_id, name, dosage, frequency, date, time) VALUES (?, ?, ?, ?,?,?)`,
    [req.user.id, name, dosage, frequency, date, time], function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ message: 'Medication added', id: this.lastID });
    });
};

exports.markTaken = (req, res) => {
  const { id } = req.params;
  db.run(`UPDATE medications SET taken = 1 WHERE id = ? AND user_id = ?`, [id, req.user.id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'Marked as taken' });
  });
};

exports.updateMedication = async (req, res) => {
    const { id } = req.params;
    const { name, dosage, frequency, date, time } = req.body;
  
    try {
      const result = await db.run(
        "UPDATE medications SET name = ?, dosage = ?, frequency = ?, date=?, time=? WHERE id = ?",
        [name, dosage, frequency, date, time, id]
      );
  
      if (result.changes === 0) return res.status(404).json({ error: "Medication not found" });
  
      res.json({ message: "Medication updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update medication" });
    }
  };
  
  // Delete medication
exports.deleteMedication = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    const medication = await Medication.findByPk(id);
    if (!medication) {
      return res.status(404).json({ error: "Medication not found" });
    }
  
    if (medication.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }
  
    await medication.destroy();
    res.json({ message: "Medication deleted successfully" });
  };
  


// Adding Adherence Tracking, Real-Time Updates, and Testing with Vitest

// 1. ✅ ADHERENCE TRACKING (Add to medicationController.js)
// Calculates percentage of taken medications per user
exports.getAdherence = (req, res) => {
    const userId = req.user.id;
    const sql = `
      SELECT COUNT(*) AS total,
             SUM(CASE WHEN taken = 1 THEN 1 ELSE 0 END) AS taken
      FROM medications
      WHERE user_id = ?
    `;
    db.get(sql, [userId], (err, row) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      const adherence = row.total > 0 ? Math.round((row.taken / row.total) * 100) : 0;
      res.json({ adherence });
    });
  };
  