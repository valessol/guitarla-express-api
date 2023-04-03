const crypto = require("crypto");
const mongoose = require("mongoose");
const config = require("../../../config.js");

class DAOMongo {
  constructor(collection, schema) {
    (async () => {
      console.log("Conectando a la base de datos de Mongo DB...");

      mongoose.connect(config.MONGO_DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.model = mongoose.model(collection, schema);

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

  getItems = async () => {
    try {
      const items = await this.model.find({});
      return items;
    } catch (err) {
      console.log(err);
    }
  };

  getById = async (_id) => {
    try {
      const item = await this.model.findById(_id);
      return item;
    } catch (err) {
      console.log(err);
    }
  };

  saveItem = async (item, options) => {
    try {
      await this.model.create({ ...item });
      const savedItem = await this.model.findOne({
        ...options,
      });
      return savedItem;
    } catch (err) {
      console.log(err);
    }
  };

  updateItem = async (_id, data) => {
    try {
      const item = await this.model.updateOne({ _id }, { $set: data });
      return item;
    } catch (err) {
      console.log(err);
    }
  };

  deleteItem = async (_id) => {
    try {
      const item = await this.getById(_id);
      await this.model.findOneAndDelete({ _id });
      return item;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = DAOMongo;
