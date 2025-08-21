const API_URL = "https://minhalista-backend.onrender.com/"; // ajuste aqui

document.getElementById("testApi").addEventListener("click", async () => {
  try {
    const res = await fetch(`${API_URL}/wishlists/0abe4259-603b-4ff2-9d35-c491aa7018a8`);
    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("output").textContent = "Erro: " + err.message;
  }
});
