const ProductDAOFile = require("./productsDAOFile");
const ProductsDAOMongo = require("./productsDAOMongo");
const config = require("../../config.js");

class ProductsDAOFactory {
  static get() {
    const DAOpersistence = {
      mongodb: ProductsDAOMongo,
      file: ProductDAOFile,
    };
    const mongoArgs = config.PERSISTENCE === "mongodb" ? "products" : null;
    return new DAOpersistence[config.PERSISTENCE](mongoArgs && mongoArgs);
  }
}

module.exports = ProductsDAOFactory;
