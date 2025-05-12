const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../db.utils");

// Register
router.post("/register", (req, res) => {
    const { name, number } = req.body;
    const db = readDB();

    if (db.users.some((u) => u.number === number)) {
        return res.status(400).json({ error: "Nomor sudah terdaftar" });
    }

    const newUser = {
        id: Date.now().toString(),
        name,
        number,
        bio: "Online",
        image: null,
        status: "online"
    };

    db.users.push(newUser);
    db.contacts[newUser.id] = [];
    db.messages[newUser.id] = [];

    writeDB(db);
    res.json(newUser);
});

// Login
router.post("/login", (req, res) => {
    const { number } = req.body;
    const db = readDB();
    const user = db.users.find((u) => u.number === number);

    if (!user) {
        return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }

    user.status = "online";
    db.users = db.users.map(u => u.id === user.id ? user : u);
    writeDB(db);

    res.json(user);
});

// Logout
router.post("/logout", (req, res) => {
    const { id } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.id === id);

    if (!user) return res.status(404).json({ error: "Pengguna tidak ditemukan" });

    user.status = "offline";
    db.users = db.users.map(u => u.id === id ? user : u);
    writeDB(db);

    res.json({ message: "Logout berhasil" });
});

module.exports = router;
