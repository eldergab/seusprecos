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
let selectedCategory = null;
let selectedSubmenu = null;

const categoryListEl = document.getElementById("category-list");
const submenuListEl = document.getElementById("submenu-list");
const detailViewEl = document.getElementById("detail-view");

// Inicializa o sistema carregando dados do localStorage ou dados iniciais
function init() {
  const savedCategories = localStorage.getItem("categories");
  const savedSubmenus = localStorage.getItem("submenus");
  const savedItems = localStorage.getItem("items");

  categories = savedCategories ? JSON.parse(savedCategories) : initialData.categories;
  submenus = savedSubmenus ? JSON.parse(savedSubmenus) : initialData.submenus;
  items = savedItems ? JSON.parse(savedItems) : initialData.items;

  selectedCategory = categories.length > 0 ? categories[0] : null;
  selectedSubmenu = null;

  renderCategories();
  renderSubmenu();
  renderDetail();
}

// Renderiza a lista de categorias na sidebar
function renderCategories() {
  categoryListEl.innerHTML = "";
  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.classList.toggle("active", cat === selectedCategory);
    li.addEventListener("click", () => {
      selectedCategory = cat;
      selectedSubmenu = null;
      renderCategories();
      renderSubmenu();
      renderDetail();
    });
    categoryListEl.appendChild(li);
  });
}

// Renderiza a lista do submenu
function renderSubmenu() {
  submenuListEl.innerHTML = "";
  if (!selectedCategory || !submenus[selectedCategory]) {
    submenuListEl.innerHTML = "<li>Nenhum submenu disponível.</li>";
    return;
  }
  submenus[selectedCategory].forEach((sub) => {
    const li = document.createElement("li");
    li.textContent = sub;
    li.classList.toggle("active", sub === selectedSubmenu);
    li.addEventListener("click", () => {
      selectedSubmenu = sub;
      renderSubmenu();
      renderDetail();
    });
    submenuListEl.appendChild(li);
  });
}

// Renderiza os detalhes do item selecionado
function renderDetail() {
  detailViewEl.innerHTML = "";
  if (!selectedSubmenu || !items[selectedSubmenu]) {
    detailViewEl.innerHTML = "<p>Selecione um item do submenu para ver os detalhes.</p>";
    return;
  }
  const item = items[selectedSubmenu];
  const detailDiv = document.createElement("div");
  detailDiv.classList.add("detail-item");

  // Remover imagem conforme pedido - apenas texto
  const nameEl = document.createElement("h3");
  nameEl.textContent = item.name;

  const descEl = document.createElement("p");
  descEl.textContent = item.description;

  const priceEl = document.createElement("div");
  priceEl.classList.add("price");
  priceEl.textContent = `R$ ${item.price.toFixed(2)}`;

  detailDiv.appendChild(nameEl);
  detailDiv.appendChild(descEl);
  detailDiv.appendChild(priceEl);

  detailViewEl.appendChild(detailDiv);
}

init();
