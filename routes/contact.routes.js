const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../utils/db.utils");

// Tambah kontak
router.post("/", (req, res) => {
    const { userId, contactName, contactNumber } = req.body;
    const db = readDB();

    const contactUser = db.users.find(u => u.number === contactNumber);
    if (!contactUser) return res.status(404).json({ error: "Kontak tidak ditemukan" });

    if (!db.contacts[userId]) db.contacts[userId] = [];
    db.contacts[userId].push({
        id: contactUser.id,
        name: contactName,
        number: contactNumber
    });

    writeDB(db);
    res.json(contactUser);
});

// Dapatkan daftar kontak
router.get("/:userId", (req, res) => {
    const { userId } = req.params;
    const db = readDB();
    const contacts = db.contacts[userId] || [];
    res.json(contacts);
});

module.exports = router;
