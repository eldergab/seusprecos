class LocalDataStore {
  constructor() {
    this.productsPath = 'data/products.json';
    this.merchantsPath = 'data/merchants.json';
  }

  async _fetchLocalFile(path) {
    try {
      const response = await fetch(path);
      return await response.json();
    } catch (error) {
      console.error('Erro ao ler arquivo local:', error);
      return null;
    }
  }

  async _saveLocalFile(path, data) {
    // Em ambiente real, isso seria substituído por chamada a API backend
    console.log('Simulando salvamento local em:', path, data);
    return { status: 'success' };
  }

  async getProducts() {
    return this._fetchLocalFile(this.productsPath);
  }

  async updateProducts(products) {
    return this._saveLocalFile(this.productsPath, products);
  }

  async getMerchants() {
    return this._fetchLocalFile(this.merchantsPath);
  }

  async addMerchant(merchant) {
    const merchantsData = await this.getMerchants();
    merchant.id = `merc${++merchantsData.last_id}`;
    merchantsData.merchants.push(merchant);
    return this._saveLocalFile(this.merchantsPath, merchantsData);
  }
}

// Exemplo de uso:
// const store = new GitHubDataStore({ token: 'SEU_TOKEN_GITHUB' });
// store.getProducts().then(products => console.log(products));