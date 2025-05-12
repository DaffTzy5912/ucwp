
const chatBox = document.getElementById("chatBox");
const msgInput = document.getElementById("msgInput");
const socket = new WebSocket("ws://" + location.host);
const number = localStorage.getItem("number");
const chatWith = localStorage.getItem("chatWith");

socket.onmessage = e => {
  const msg = JSON.parse(e.data);
  if (msg.from === chatWith || msg.to === chatWith) {
    const div = document.createElement("div");
    div.textContent = msg.from + ": " + msg.text;
    chatBox.appendChild(div);
  }
};
function sendMessage() {
  const text = msgInput.value;
  socket.send(JSON.stringify({ from: number, to: chatWith, text }));
  msgInput.value = "";
}
