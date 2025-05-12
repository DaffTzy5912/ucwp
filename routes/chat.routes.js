const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../db.utils");

// Kirim pesan
router.post("/send", (req, res) => {
    const { senderId, receiverId, text, image } = req.body;
    const db = readDB();

    const conversationId = [senderId, receiverId].sort().join("-");
    if (!db.messages[conversationId]) db.messages[conversationId] = [];

    const newMessage = {
        sender: senderId,
        receiver: receiverId,
        text,
        image,
        timestamp: Date.now()
    };

    db.messages[conversationId].push(newMessage);
    writeDB(db);

    res.json(newMessage);
});

// Ambil riwayat chat
router.get("/:convId", (req, res) => {
    const { convId } = req.params;
    const db = readDB();
    const messages = db.messages[convId] || [];
    res.json(messages);
});

module.exports = router;
