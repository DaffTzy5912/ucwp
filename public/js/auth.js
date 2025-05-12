
function generateNumber() {
  const num = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("userNumber").textContent = num;
  localStorage.setItem("number", num);
}
function login() {
  window.location.href = "home.html";
}
