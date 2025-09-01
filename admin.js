const initialData = {
  categories: [
    "Restaurantes",
    "Bares",
    "Lanchonetes",
    "Padarias",
    "Pizzarias",
    "Sorveterias",
    "Supermercados"
  ],
  submenus: {
    "Restaurantes": [
      "Restaurante A",
      "Restaurante B",
      "Restaurante C"
    ],
    "Bares": [
      "Bar X",
      "Bar Y"
    ],
    "Lanchonetes": [
      "Lanchonete 1",
      "Lanchonete 2"
    ],
    "Padarias": [],
    "Pizzarias": [],
    "Sorveterias": [],
    "Supermercados": []
  },
  items: {
    "Restaurante A": {
      name: "X-Bacon",
      description: "Alface, tomate, batata palha, milho, hambúrguer, presunto, muçarela e bacon",
      price: 22.00,
      image: "https://i.imgur.com/1bX5QH6.jpg"
    },
    "Restaurante B": {
      name: "X-Frango Especial",
      description: "Alface, tomate, batata palha, milho, filé de frango, presunto, muçarela, bacon, salsicha e ovo",
      price: 22.00,
      image: "https://i.imgur.com/2nCt3Sbl.jpg"
    },
    "Bar X": {
      name: "Batata Frita",
      description: "Porção de batata frita crocante",
      price: 15.00,
      image: "https://i.imgur.com/3ZQ3Z3Z.jpg"
    }
  }
};

let categories = [];
let submenus = {};
let items = {};

const adminViewEl = document.getElementById("admin-view");

// Modais
const categoryModal = document.getElementById("category-modal");
const categoryForm = document.getElementById("category-form");
const categoryCancelBtn = document.getElementById("category-cancel-btn");

const submenuModal = document.getElementById("submenu-modal");
const submenuForm = document.getElementById("submenu-form");
const submenuCancelBtn = document.getElementById("submenu-cancel-btn");
const submenuCategorySelect = document.getElementById("submenu-category");

const itemModal = document.getElementById("item-modal");
const itemForm = document.getElementById("item-form");
const itemCancelBtn = document.getElementById("item-cancel-btn");
const itemCategorySelect = document.getElementById("item-category");
const itemSubmenuSelect = document.getElementById("item-submenu");

// Botões do menu lateral
const manageCategoriesBtn = document.getElementById("manage-categories-btn");
const manageSubmenusBtn = document.getElementById("manage-submenus-btn");
const manageItemsBtn = document.getElementById("manage-items-btn");
const viewDataBtn = document.getElementById("view-data-btn");

// Senha do admin para acesso ao painel
const ADMIN_PASSWORD = "admin123";

// Elementos da tela de login
const loginScreen = document.getElementById("login-screen");
const adminPanel = document.getElementById("admin-panel");
const passwordInput = document.getElementById("admin-password-input");
const loginBtn = document.getElementById("login-btn");
const backBtn = document.getElementById("back-btn");

// Inicializa o sistema
function init() {
  // Verifica se já está logado (sessionStorage para sessão atual)
  const isLoggedIn = sessionStorage.getItem("adminLoggedIn");

  if (isLoggedIn === "true") {
    showAdminPanel();
  } else {
    showLoginScreen();
  }

  // Event listeners para login
  loginBtn.addEventListener("click", handleLogin);
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Enter key no campo de senha
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  });
}

// Função para mostrar tela de login
function showLoginScreen() {
  loginScreen.classList.remove("hidden");
  adminPanel.classList.add("hidden");
  passwordInput.focus();
}

// Função para mostrar painel admin
function showAdminPanel() {
  loginScreen.classList.add("hidden");
  adminPanel.classList.remove("hidden");

  // Carrega dados do admin
  const savedCategories = localStorage.getItem("categories");
  const savedSubmenus = localStorage.getItem("submenus");
  const savedItems = localStorage.getItem("items");

  categories = savedCategories ? JSON.parse(savedCategories) : initialData.categories;
  submenus = savedSubmenus ? JSON.parse(savedSubmenus) : initialData.submenus;
  items = savedItems ? JSON.parse(savedItems) : initialData.items;

  showWelcome();
}

// Função para lidar com login
function handleLogin() {
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === ADMIN_PASSWORD) {
    sessionStorage.setItem("adminLoggedIn", "true");
    showAdminPanel();
  } else {
    alert("❌ Senha incorreta! Tente novamente.");
    passwordInput.value = "";
    passwordInput.focus();
  }
}

// Função para mostrar tela de boas-vindas
function showWelcome() {
  adminViewEl.innerHTML = `
    <h2>Bem-vindo ao Painel Administrativo</h2>
    <p>Selecione uma opção no menu lateral para começar a gerenciar o cardápio.</p>
    <div class="stats">
      <div class="stat-card">
        <h3>${categories.length}</h3>
        <p>Categorias</p>
      </div>
      <div class="stat-card">
        <h3>${Object.keys(submenus).reduce((total, cat) => total + submenus[cat].length, 0)}</h3>
        <p>Submenus</p>
      </div>
      <div class="stat-card">
        <h3>${Object.keys(items).length}</h3>
        <p>Itens</p>
      </div>
    </div>
  `;
}

// Gerenciar Categorias
function showCategories() {
  adminViewEl.innerHTML = `
    <h2>Gerenciar Categorias</h2>
    <button id="add-category-btn" class="admin-btn" style="margin-bottom: 20px;">Adicionar Categoria</button>
    <div class="data-list">
      ${categories.map((cat, index) => `
        <div class="data-item">
          <span>${cat}</span>
          <div class="actions">
            <button class="edit-btn" onclick="editCategory(${index})">Editar</button>
            <button class="delete-btn" onclick="deleteCategory(${index})">Excluir</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById("add-category-btn").addEventListener("click", () => openCategoryModal());
}

function openCategoryModal(categoryIndex = null) {
  const modalTitle = document.getElementById("category-modal-title");
  const categoryInput = document.getElementById("category-name");

  if (categoryIndex !== null) {
    modalTitle.textContent = "Editar Categoria";
    categoryInput.value = categories[categoryIndex];
    categoryForm.dataset.editIndex = categoryIndex;
  } else {
    modalTitle.textContent = "Adicionar Categoria";
    categoryInput.value = "";
    delete categoryForm.dataset.editIndex;
  }

  categoryModal.classList.remove("hidden");
}

function editCategory(index) {
  openCategoryModal(index);
}

function deleteCategory(index) {
  if (confirm(`Tem certeza que deseja excluir a categoria "${categories[index]}"?`)) {
    const categoryName = categories[index];
    categories.splice(index, 1);
    delete submenus[categoryName];

    // Remove items relacionados
    Object.keys(items).forEach(submenu => {
      if (submenus[categoryName] && submenus[categoryName].includes(submenu)) {
        delete items[submenu];
      }
    });

    saveData();
    showCategories();
  }
}

// Gerenciar Submenus
function showSubmenus() {
  adminViewEl.innerHTML = `
    <h2>Gerenciar Submenus</h2>
    <button id="add-submenu-btn" class="admin-btn" style="margin-bottom: 20px;">Adicionar Submenu</button>
    <div class="data-list">
      ${categories.map(cat => `
        <div class="category-section">
          <h3>${cat}</h3>
          ${submenus[cat].map((sub, index) => `
            <div class="data-item">
              <span>${sub}</span>
              <div class="actions">
                <button class="edit-btn" onclick="editSubmenu('${cat}', ${index})">Editar</button>
                <button class="delete-btn" onclick="deleteSubmenu('${cat}', ${index})">Excluir</button>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById("add-submenu-btn").addEventListener("click", () => openSubmenuModal());
}

function openSubmenuModal(category = null, submenuIndex = null) {
  const modalTitle = document.getElementById("submenu-modal-title");
  const categorySelect = document.getElementById("submenu-category");
  const submenuInput = document.getElementById("submenu-name");

  // Preenche select de categorias
  categorySelect.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');

  if (category && submenuIndex !== null) {
    modalTitle.textContent = "Editar Submenu";
    categorySelect.value = category;
    submenuInput.value = submenus[category][submenuIndex];
    submenuForm.dataset.editCategory = category;
    submenuForm.dataset.editIndex = submenuIndex;
  } else {
    modalTitle.textContent = "Adicionar Submenu";
    categorySelect.value = category || categories[0];
    submenuInput.value = "";
    delete submenuForm.dataset.editCategory;
    delete submenuForm.dataset.editIndex;
  }

  submenuModal.classList.remove("hidden");
}

function editSubmenu(category, index) {
  openSubmenuModal(category, index);
}

function deleteSubmenu(category, index) {
  if (confirm(`Tem certeza que deseja excluir o submenu "${submenus[category][index]}"?`)) {
    const submenuName = submenus[category][index];
    submenus[category].splice(index, 1);
    delete items[submenuName];
    saveData();
    showSubmenus();
  }
}

// Gerenciar Itens
function showItems() {
  adminViewEl.innerHTML = `
    <h2>Gerenciar Itens</h2>
    <button id="add-item-btn" class="admin-btn" style="margin-bottom: 20px;">Adicionar Item</button>
    <div class="data-list">
      ${Object.keys(items).map(submenu => `
        <div class="submenu-section">
          <h3>${submenu}</h3>
          <div class="data-item">
            <div>
              <strong>${items[submenu].name}</strong><br>
              <small>${items[submenu].description}</small><br>
              <span>R$ ${items[submenu].price.toFixed(2)}</span>
            </div>
            <div class="actions">
              <button class="edit-btn" onclick="editItem('${submenu}')">Editar</button>
              <button class="delete-btn" onclick="deleteItem('${submenu}')">Excluir</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById("add-item-btn").addEventListener("click", () => openItemModal());
}

function openItemModal(submenu = null) {
  const modalTitle = document.getElementById("item-modal-title");
  const categorySelect = document.getElementById("item-category");
  const submenuSelect = document.getElementById("item-submenu");

  // Preenche select de categorias
  categorySelect.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');

  // Atualiza submenus quando categoria muda
  categorySelect.addEventListener("change", () => {
    const selectedCat = categorySelect.value;
    submenuSelect.innerHTML = submenus[selectedCat].map(sub => `<option value="${sub}">${sub}</option>`).join('');
  });

  if (submenu && items[submenu]) {
    modalTitle.textContent = "Editar Item";
    const item = items[submenu];

    // Encontra a categoria do submenu
    let itemCategory = "";
    for (const cat of categories) {
      if (submenus[cat].includes(submenu)) {
        itemCategory = cat;
        break;
      }
    }

    categorySelect.value = itemCategory;
    categorySelect.dispatchEvent(new Event("change"));
    submenuSelect.value = submenu;

    document.getElementById("item-name").value = item.name;
    document.getElementById("item-description").value = item.description;
    document.getElementById("item-price").value = item.price;
    document.getElementById("item-image").value = item.image || "";

    itemForm.dataset.editSubmenu = submenu;
  } else {
    modalTitle.textContent = "Adicionar Item";
    categorySelect.value = categories[0];
    categorySelect.dispatchEvent(new Event("change"));

    document.getElementById("item-name").value = "";
    document.getElementById("item-description").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("item-image").value = "";

    delete itemForm.dataset.editSubmenu;
  }

  itemModal.classList.remove("hidden");
}

function editItem(submenu) {
  openItemModal(submenu);
}

function deleteItem(submenu) {
  if (confirm(`Tem certeza que deseja excluir o item "${items[submenu].name}"?`)) {
    delete items[submenu];
    saveData();
    showItems();
  }
}

// Visualizar Dados
function showData() {
  adminViewEl.innerHTML = `
    <h2>Visualizar Dados</h2>
    <div class="data-section">
      <h3>Categorias (${categories.length})</h3>
      <pre>${JSON.stringify(categories, null, 2)}</pre>
    </div>
    <div class="data-section">
      <h3>Submenus (${Object.keys(submenus).length})</h3>
      <pre>${JSON.stringify(submenus, null, 2)}</pre>
    </div>
    <div class="data-section">
      <h3>Itens (${Object.keys(items).length})</h3>
      <pre>${JSON.stringify(items, null, 2)}</pre>
    </div>
  `;
}

// Salvar dados no localStorage
function saveData() {
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("submenus", JSON.stringify(submenus));
  localStorage.setItem("items", JSON.stringify(items));
}

// Event listeners para botões do menu lateral
manageCategoriesBtn.addEventListener("click", showCategories);
manageSubmenusBtn.addEventListener("click", showSubmenus);
manageItemsBtn.addEventListener("click", showItems);
viewDataBtn.addEventListener("click", showData);

// Event listeners para modais
categoryCancelBtn.addEventListener("click", () => {
  categoryModal.classList.add("hidden");
  categoryForm.reset();
});

submenuCancelBtn.addEventListener("click", () => {
  submenuModal.classList.add("hidden");
  submenuForm.reset();
});

itemCancelBtn.addEventListener("click", () => {
  itemModal.classList.add("hidden");
  itemForm.reset();
});

// Formulários
categoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const categoryName = document.getElementById("category-name").value.trim();

  if (document.getElementById("category-form").dataset.editIndex !== undefined) {
    // Editando
    const index = parseInt(categoryForm.dataset.editIndex);
    const oldName = categories[index];

    // Atualiza nome da categoria
    categories[index] = categoryName;

    // Atualiza submenus
    submenus[categoryName] = submenus[oldName];
    delete submenus[oldName];

    // Atualiza items relacionados
    Object.keys(items).forEach(submenu => {
      if (submenus[oldName] && submenus[oldName].includes(submenu)) {
        // Item pertence à categoria antiga, não precisa mover
      }
    });

  } else {
    // Adicionando
    if (categories.includes(categoryName)) {
      alert("Categoria já existe!");
      return;
    }
    categories.push(categoryName);
    submenus[categoryName] = [];
  }

  saveData();
  categoryModal.classList.add("hidden");
  categoryForm.reset();
  showCategories();
});

submenuForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("submenu-category").value;
  const submenuName = document.getElementById("submenu-name").value.trim();

  if (submenuForm.dataset.editCategory && submenuForm.dataset.editIndex !== undefined) {
    // Editando
    const oldCategory = submenuForm.dataset.editCategory;
    const index = parseInt(submenuForm.dataset.editIndex);
    const oldName = submenus[oldCategory][index];

    if (oldCategory !== category) {
      // Movendo para outra categoria
      submenus[oldCategory].splice(index, 1);
      if (!submenus[category]) submenus[category] = [];
      submenus[category].push(submenuName);

      // Move item também
      if (items[oldName]) {
        items[submenuName] = items[oldName];
        delete items[oldName];
      }
    } else {
      // Mesmo categoria, apenas renomeia
      submenus[category][index] = submenuName;
      if (items[oldName]) {
        items[submenuName] = items[oldName];
        delete items[oldName];
      }
    }
  } else {
    // Adicionando
    if (!submenus[category]) submenus[category] = [];
    if (submenus[category].includes(submenuName)) {
      alert("Submenu já existe nesta categoria!");
      return;
    }
    submenus[category].push(submenuName);
  }

  saveData();
  submenuModal.classList.add("hidden");
  submenuForm.reset();
  showSubmenus();
});

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("item-category").value;
  const submenu = document.getElementById("item-submenu").value;
  const itemName = document.getElementById("item-name").value.trim();
  const description = document.getElementById("item-description").value.trim();
  const price = parseFloat(document.getElementById("item-price").value);
  const image = document.getElementById("item-image").value.trim();

  const newItem = {
    name: itemName,
    description: description,
    price: price,
    image: image
  };

  if (itemForm.dataset.editSubmenu) {
    // Editando
    const oldSubmenu = itemForm.dataset.editSubmenu;
    if (oldSubmenu !== submenu) {
      delete items[oldSubmenu];
    }
    items[submenu] = newItem;
  } else {
    // Adicionando
    if (items[submenu]) {
      alert("Este submenu já possui um item!");
      return;
    }
    items[submenu] = newItem;
  }

  saveData();
  itemModal.classList.add("hidden");
  itemForm.reset();
  showItems();
});

init();
