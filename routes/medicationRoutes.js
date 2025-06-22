const express = require('express');
const router = express.Router();
const { getMedications, addMedication, markTaken,getAdherence,updateMedication,deleteMedication } = require('../controllers/medicationController');
const authenticateToken = require('../middleware/authMiddleware');
const { uploadPhoto } = require('../controllers/medicationController');

router.get('/', authenticateToken, getMedications);
router.post('/', authenticateToken, addMedication);
router.patch('/:id/taken', authenticateToken, markTaken);


router.put('/:id', authenticateToken, updateMedication);
router.delete('/:id', authenticateToken, deleteMedication);



router.post('/:id/upload', authenticateToken, uploadPhoto);

router.get('/adherence', authenticateToken, getAdherence);

module.exports = router;
