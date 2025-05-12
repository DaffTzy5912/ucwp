
const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http").Server(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: http });

app.use(express.json());
app.use(express.static("public"));

let users = {};
let messages = [];

if (fs.existsSync("server/db.json")) {
  const data = JSON.parse(fs.readFileSync("server/db.json"));
  users = data.users;
  messages = data.messages;
}

app.get("/users", (req, res) => {
  res.json(Object.values(users));
});

app.get("/me", (req, res) => {
  const user = users[req.query.number];
  res.json(user || {});
});

app.post("/update", (req, res) => {
  users[req.body.number] = req.body;
  saveDB();
  res.sendStatus(200);
});

function saveDB() {
  fs.writeFileSync("server/db.json", JSON.stringify({ users, messages }));
}

wss.on("connection", ws => {
  ws.on("message", msg => {
    const data = JSON.parse(msg);
    messages.push(data);
    users[data.from] = users[data.from] || { number: data.from };
    users[data.to] = users[data.to] || { number: data.to };
    saveDB();
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
});

http.listen(3000, () => console.log("Server jalan di http://localhost:3000"));
