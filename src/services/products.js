const ProductsDAOFactory = require("../persistence/productsDAOFactory");

class ProductsServices {
  constructor() {
    this.services = ProductsDAOFactory.get();
  }

  getProducts = async () => {
    try {
      const products = await this.services.getProducts();
      return products;
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = async (_id) => {
    try {
      const product = await this.services.getProductById(_id);
      return product;
    } catch (err) {
      console.log(err);
    }
  };

  saveProduct = async (product) => {
    try {
      const savedProduct = await this.services.saveProduct(product);
      return savedProduct;
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async (_id, product) => {
    try {
      const updatedProduct = await this.services.updateProduct(_id, product);
      return updatedProduct;
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async (_id) => {
    try {
      const product = await this.services.deleteProduct(_id);
      return product;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ProductsServices;
