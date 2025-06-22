# Medication Management System Backend

This is the **backend** for the Medication Management System built using **Node.js** and **SQLite**. It supports authentication, medication tracking, file uploads, and serves as the API layer for the React frontend.

---

## ✅ Features Implemented

### Phase 1 - Core Features

* User signup/login with JWT authentication
* Role-based access (patient, caretaker)
* CRUD operations for medications
* Mark medications as taken
* SQLite data storage

### Phase 2 - Optional Features

* Basic adherence tracking: Calculate percentage of medications taken
* Real-time updates (experimental): Notify caretakers when patients take medications

### Phase 3 - Bonus Features

* File upload (medication proof photo) using Multer
* Deployment ready structure

### Additional

* Error handling
* Basic test coverage using **Vitest** and **Supertest**

---

## 🛠️ Setup Instructions

### Prerequisites

* Node.js v16+
* npm

### Installation

```bash
git clone <your-repo-url>
cd backend
npm install
```

### Run the Server

```bash
npm start
```

> Runs on `http://localhost:5000`

### DB Setup (Auto-created)

* SQLite DB file `database.db` will be auto-generated
* Schema includes `users` and `medications` tables

---

## 🧪 Testing

Tests use **Vitest** with **Supertest** for HTTP integration.

### Run Tests

```bash
npm run test
```

### Example Test File Structure

```bash
__tests__/
├── auth.test.js
├── medication.test.js
```

---

## 📫 API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Medication

* `POST /api/medications/` — Add medication
* `GET /api/medications/` — List medications
* `PATCH /api/medications/:id/take` — Mark as taken
* `GET /api/medications/adherence` — Get adherence %

### Upload

* `POST /api/medications/:id/photo` — Upload photo proof (file key: `photo`)

---

## 🔁 Real-Time Updates (Experimental)

Using Socket.IO to emit events when:

* Patient marks a medication as taken
* Caretaker receives event with patientId and timestamp

Enable in `server.js`:

```js
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
```

---

## 📁 Folder Structure

```
backend/
├── controllers/
├── db/
├── middleware/
├── routes/
├── uploads/
├── __tests__/
├── server.js
```

---

## 📌 Notes

* For testing uploads, use Postman with `form-data` type
* Ensure the `uploads/` folder exists or is created dynamically

---

## 📄 License

MIT

---

## 👨‍💻 Author

Your Name — \[[your-email@example.com](mailto:your-email@example.com)]
