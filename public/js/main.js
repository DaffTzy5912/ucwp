const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const list = document.getElementById("contactList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const num = input.value.trim();
  if (num.length < 3) return alert("Minimal 3 digit!");

  const res = await fetch(`/api/user/${num}`);
  if (res.status === 200) {
    location.href = `/chat.html?to=${num}`;
  } else {
    alert("Nomor tidak ditemukan.");
  }
});
