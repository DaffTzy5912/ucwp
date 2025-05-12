const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
const fs = require("fs");

let users = {}; // Simpan data user
let sockets = {}; // Simpan WebSocket aktif

app.use(express.static("public"));
app.use(express.json());

// Endpoint cek user
app.get("/api/user/:number", (req, res) => {
  const number = req.params.number;
  if (users[number]) {
    res.json(users[number]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// Endpoint simpan kontak
app.post("/api/user", (req, res) => {
  const { number, name } = req.body;
  users[number] = users[number] || {};
  users[number].name = name;
  res.json({ success: true });
});

wss.on("connection", (ws, req) => {
  let userId = null;

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "login") {
      userId = data.number;
      users[userId] = users[userId] || { name: "User " + userId };
      users[userId].online = true;
      sockets[userId] = ws;
    }

    if (data.type === "chat") {
      const to = data.to;
      if (sockets[to]) {
        sockets[to].send(JSON.stringify({
          from: userId,
          message: data.message
        }));
      }
    }
  });

  ws.on("close", () => {
    if (userId && users[userId]) {
      users[userId].online = false;
      delete sockets[userId];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
