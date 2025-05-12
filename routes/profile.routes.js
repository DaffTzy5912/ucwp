const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../utils/db.utils");

// Update profil
router.put("/:userId", (req, res) => {
    const { userId } = req.params;
    const { name, bio, image } = req.body;
    const db = readDB();

    const user = db.users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: "Pengguna tidak ditemukan" });

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.image = image || user.image;

    db.users = db.users.map(u => u.id === userId ? user : u);
    writeDB(db);

    res.json(user);
});

// Dapatkan profil
router.get("/:userId", (req, res) => {
    const { userId } = req.params;
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    res.json(user);
});

module.exports = router;
