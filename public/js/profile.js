
document.addEventListener("DOMContentLoaded", () => {
  fetch("/me?number=" + localStorage.getItem("number")).then(res => res.json()).then(user => {
    document.getElementById("name").value = user.name || "";
    document.getElementById("bio").value = user.bio || "";
    document.getElementById("photo").value = user.photo || "";
  });
});
function saveProfile() {
  const data = {
    number: localStorage.getItem("number"),
    name: document.getElementById("name").value,
    bio: document.getElementById("bio").value,
    photo: document.getElementById("photo").value
  };
  fetch("/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  alert("Disimpan!");
}
