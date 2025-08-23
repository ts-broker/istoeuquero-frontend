const API_URL = "https://minhalista-backend.onrender.com"; // URL do backend no Render

let currentUserId = null;
let currentWishlistId = null;

// Helper para requisições com tratamento de erro
async function doFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch {}
  if (!res.ok) {
    throw new Error((data && (data.error || data.message)) || text || "Erro de rede");
  }
  return data;
}

// Criar usuário
async function createUser() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  if (!name) return alert("Informe o nome");

  try {
    const data = await doFetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ name, email })
    });
    document.getElementById("userResult").innerText = JSON.stringify(data, null, 2);
    currentUserId = data.id;
    await loadUsers(); // recarrega combo de usuários
  } catch (err) {
    alert(`Erro: ${err.message}`);
  }
}

// Criar lista
async function createWishlist() {
  if (!currentUserId) return alert("Selecione ou crie um usuário primeiro");
  const title = document.getElementById("wishlistTitle").value;
  const description = document.getElementById("wishlistDesc").value;
  const event_date = document.getElementById("wishlistDate").value;
  if (!title) return alert("Informe o título da lista");

  try {
    const data = await doFetch(`${API_URL}/wishlists`, {
      method: "POST",
      body: JSON.stringify({ user_id: currentUserId, title, description, event_date })
    });
    document.getElementById("wishlistResult").innerText = JSON.stringify(data, null, 2);
    currentWishlistId = data.id;
    await loadWishlists(); // recarrega combo de listas
  } catch (err) {
    alert(`Erro: ${err.message}`);
  }
}

// Adicionar item
async function addItem() {
  if (!currentWishlistId) return alert("Selecione uma lista primeiro");
  const name = document.getElementById("itemName").value;
  const url = document.getElementById("itemUrl").value;
  if (!name) return alert("Informe o nome do item");

  try {
    const data = await doFetch(`${API_URL}/wishlists/${currentWishlistId}/items`, {
      method: "POST",
      body: JSON.stringify({ name, url })
    });
    document.getElementById("itemResult").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    alert(`Erro: ${err.message}`);
  }
}

// Ver lista completa
async function getWishlist() {
  if (!currentWishlistId) return alert("Selecione uma lista primeiro");
  try {
    const data = await doFetch(`${API_URL}/wishlists/${currentWishlistId}`);
    document.getElementById("listResult").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    alert(`Erro: ${err.message}`);
  }
}

// Carregar todos os usuários no combo
async function loadUsers() {
  try {
    const users = await doFetch(`${API_URL}/users`);
    const userSelect = document.getElementById("userSelect");
    userSelect.innerHTML = '<option value="">-- Selecione um usuário --</option>';
    users.forEach(u => {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = u.name;
      userSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Erro ao carregar usuários:", err.message);
  }
}

// Carregar listas do usuário selecionado
async function loadWishlists() {
  const userId = document.getElementById("userSelect").value;
  if (!userId) return;
  currentUserId = userId;
  try {
    const wishlists = await doFetch(`${API_URL}/users/${userId}/wishlists`);
    const wishlistSelect = document.getElementById("wishlistSelect");
    wishlistSelect.innerHTML = '<option value="">-- Selecione uma lista --</option>';
    wishlists.forEach(w => {
      const opt = document.createElement("option");
      opt.value = w.id;
      opt.textContent = w.title;
      wishlistSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Erro ao carregar listas:", err.message);
  }
}

// Definir lista atual ao selecionar no combo
function setCurrentWishlist() {
  const wishlistId = document.getElementById("wishlistSelect").value;
  currentWishlistId = wishlistId || null;
}

// Inicialização
window.onload = () => {
  loadUsers();
};
