
document.addEventListener("DOMContentLoaded", () => {
  const chatList = document.getElementById("chatList");
  fetch("/users").then(res => res.json()).then(users => {
    users.forEach(u => {
      const el = document.createElement("div");
      el.innerHTML = u.name + " (" + u.number + ")";
      el.onclick = () => {
        localStorage.setItem("chatWith", u.number);
        window.location.href = "chat.html";
      };
      chatList.appendChild(el);
    });
  });
});
