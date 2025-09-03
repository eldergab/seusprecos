class GitHubDataStore {
  constructor(options) {
    this.token = options.token;
    this.owner = options.owner || 'seu_usuario';
    this.repo = options.repo || 'seusprecos-data';
    this.branch = options.branch || 'main';
    this.baseUrl = `https://api.github.com/repos/${this.owner}/${this.repo}/contents`;
  }

  async _getFileSha(path) {
    const response = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        'Authorization': `token ${this.token}`
      }
    });
    const data = await response.json();
    return data.sha;
  }

  async readData(path) {
    try {
      const response = await fetch(`${this.baseUrl}/${path}`, {
        headers: {
          'Authorization': `token ${this.token}`
        }
      });
      const data = await response.json();
      return JSON.parse(atob(data.content));
    } catch (error) {
      console.error('Erro ao ler dados:', error);
      return null;
    }
  }

  async writeData(path, content, commitMessage) {
    try {
      let sha;
      try {
        sha = await this._getFileSha(path);
      } catch (e) {
        sha = ''; // Arquivo não existe ainda
      }

      const response = await fetch(`${this.baseUrl}/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: commitMessage,
          content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))),
          sha: sha,
          branch: this.branch
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error;
    }
  }

  // Métodos específicos para o Seus Preços
  async getProducts() {
    return this.readData('data/products.json');
  }

  async updateProducts(products) {
    return this.writeData('data/products.json', products, 'Atualização de produtos');
  }

  async getMerchants() {
    return this.readData('data/merchants.json');
  }

  async addMerchant(merchant) {
    const merchantsData = await this.getMerchants();
    merchant.id = `merc${++merchantsData.last_id}`;
    merchantsData.merchants.push(merchant);
    return this.writeData('data/merchants.json', merchantsData, 'Novo comerciante cadastrado');
  }
}

// Exemplo de uso:
// const store = new GitHubDataStore({ token: 'SEU_TOKEN_GITHUB' });
// store.getProducts().then(products => console.log(products));