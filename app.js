const API_URL = "https://minhalista-backend.onrender.com"; // seu backend

let currentUserId = null;
let currentWishlistId = null;

// Criar usuário
async function createUser() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;

  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  const data = await res.json();
  document.getElementById("userResult").innerText = JSON.stringify(data, null, 2);
  currentUserId = data.id;
}

// Criar lista
async function createWishlist() {
  const title = document.getElementById("wishlistTitle").value;
  const description = document.getElementById("wishlistDesc").value;
  const event_date = document.getElementById("wishlistDate").value;

  const res = await fetch(`${API_URL}/wishlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: currentUserId, title, description, event_date })
  });

  const data = await res.json();
  document.getElementById("wishlistResult").innerText = JSON.stringify(data, null, 2);
  currentWishlistId = data.id;
}

// Adicionar item
async function addItem() {
  const name = document.getElementById("itemName").value;
  const url = document.getElementById("itemUrl").value;

  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wishlist_id: currentWishlistId, name, url })
  });

  const data = await res.json();
  document.getElementById("itemResult").innerText = JSON.stringify(data, null, 2);
}

// Ver lista completa
async function getWishlist() {
  const res = await fetch(`${API_URL}/wishlists/${currentWishlistId}`);
  const data = await res.json();
  document.getElementById("listResult").innerText = JSON.stringify(data, null, 2);
}
