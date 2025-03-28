// Dados mockados (em produção, substituir por chamadas a API)
const productsData = {
  "products": [
    {
      "id": "prod1",
      "name": "Arroz 5kg",
      "category": "Alimentos",
      "price": 25.90,
      "merchant": "merc1"
    },
    {
      "id": "prod2",
      "name": "Feijão 1kg", 
      "category": "Alimentos",
      "price": 8.50,
      "merchant": "merc1"
    },
    {
      "id": "prod3",
      "name": "Óleo de Soja 900ml",
      "category": "Alimentos",
      "price": 7.80,
      "merchant": "merc2"
    }
  ]
};

const merchantsData = {
  "merchants": [
    {
      "id": "merc1",
      "name": "Mercado do João",
      "location": "Centro",
      "rating": 4.5
    },
    {
      "id": "merc2",
      "name": "Supermercado Bom Preço",
      "location": "Vila Nova",
      "rating": 4.2
    }
  ],
  "last_id": 2
};

class LocalDataStore {
  constructor() {
    this.products = productsData;
    this.merchants = merchantsData;
  }

  async getProducts() {
    console.log('Carregando produtos:', this.products);
    return this.products;
  }

  async updateProducts(products) {
    this.products = products;
    return { status: 'success' };
  }

  async getMerchants() {
    return this.merchants;
  }

  async addMerchant(merchant) {
    merchant.id = `merc${++this.merchants.last_id}`;
    this.merchants.merchants.push(merchant);
    return { status: 'success' };
  }
}

// Exemplo de uso:
// const store = new GitHubDataStore({ token: 'SEU_TOKEN_GITHUB' });
// store.getProducts().then(products => console.log(products));