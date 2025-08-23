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

//salvar o ID retornado pelo backend
async function getWishlist() {
  try {
    const data = await doFetch(`${API_URL}/wishlists/${currentWishlistId || prompt("Digite o ID da lista:")}`);
    document.getElementById("listResult").innerText = JSON.stringify(data, null, 2);
    
    // Salva o ID da lista no estado para permitir adicionar itens
    if (data.wishlist && data.wishlist.id) {
      currentWishlistId = data.wishlist.id;
    }
  } catch (err) {
    alert(`Erro: ${err.message}`);
  }
}

// Ver lista completa
async function getWishlist() {
  const res = await fetch(`${API_URL}/wishlists/${currentWishlistId}`);
  const data = await res.json();
  document.getElementById("listResult").innerText = JSON.stringify(data, null, 2);
}

// Carregar usuário e lista
async function loadUsers() {
  const users = await doFetch(`${API_URL}/users`);
  const userSelect = document.getElementById("userSelect");
  userSelect.innerHTML = '<option value="">-- Selecione um usuário --</option>';
  users.forEach(u => {
    const opt = document.createElement("option");
    opt.value = u.id;
    opt.textContent = u.name;
    userSelect.appendChild(opt);
  });
}

async function loadWishlists() {
  const userId = document.getElementById("userSelect").value;
  if (!userId) return;
  const wishlists = await doFetch(`${API_URL}/users/${userId}/wishlists`);
  const wishlistSelect = document.getElementById("wishlistSelect");
  wishlistSelect.innerHTML = '<option value="">-- Selecione uma lista --</option>';
  wishlists.forEach(w => {
    const opt = document.createElement("option");
    opt.value = w.id;
    opt.textContent = w.title;
    wishlistSelect.appendChild(opt);
  });
}

function setCurrentWishlist() {
  const wishlistId = document.getElementById("wishlistSelect").value;
  currentWishlistId = wishlistId || null;
}

async function loadUsers() {
  const users = await doFetch(`${API_URL}/users`);
  const userSelect = document.getElementById("userSelect");
  userSelect.innerHTML = '<option value="">-- Selecione um usuário --</option>';
  users.forEach(u => {
    const opt = document.createElement("option");
    opt.value = u.id;
    opt.textContent = u.name;
    userSelect.appendChild(opt);
  });
}

async function loadWishlists() {
  const userId = document.getElementById("userSelect").value;
  if (!userId) return;
  const wishlists = await doFetch(`${API_URL}/users/${userId}/wishlists`);
  const wishlistSelect = document.getElementById("wishlistSelect");
  wishlistSelect.innerHTML = '<option value="">-- Selecione uma lista --</option>';
  wishlists.forEach(w => {
    const opt = document.createElement("option");
    opt.value = w.id;
    opt.textContent = w.title;
    wishlistSelect.appendChild(opt);
  });
}

function setCurrentWishlist() {
  const wishlistId = document.getElementById("wishlistSelect").value;
  currentWishlistId = wishlistId || null;
}

// Carregar a página
window.onload = () => {
  loadUsers();
};
