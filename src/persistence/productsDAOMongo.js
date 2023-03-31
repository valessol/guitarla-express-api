const crypto = require("crypto");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const config = require("../../config.js");
const productsSchema = require("./schemas/products.js");

const { ObjectId } = mongodb;

class ProductsDAOMongo {
  constructor(collection) {
    (async () => {
      console.log("Conectando a la base de datos de Mongo DB...");

      mongoose.connect(config.MONGO_DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.model = mongoose.model(collection, productsSchema);

      console.log("Base de datos conectada");
    })();
  }

  generateId = () => {
    try {
      const id = crypto.randomUUID();
      return id;
    } catch (err) {
      throw new Error(err);
    }
  };

  getProducts = async () => {
    try {
      const products = await this.model.find({});
      return products;
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = async (_id) => {
    try {
      const product = await this.model.findOne({ _id: ObjectId(_id) });
      return product;
    } catch (err) {
      console.log(err);
    }
  };

  saveProduct = async (product) => {
    try {
      await this.model.create({ ...product });
      return product;
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async (_id) => {
    try {
      //   const product = await this.model.findOne({ _id: ObjectId(_id) });
      //   return product;
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async (_id) => {
    try {
      //   const product = await this.model.findOne({ _id: ObjectId(_id) });
      //   return product;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ProductsDAOMongo;
