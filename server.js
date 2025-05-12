const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper to read/write DB
const DB_PATH = path.join(__dirname, "db.json");

function readDB() {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chats", require("./routes/chat.routes"));
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/profile", require("./routes/profile.routes"));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
