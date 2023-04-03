const mongoose = require("mongoose");

const schema = {
  title: String,
  description: String,
  price: String,
  url: String,
  timestamp: String,
};

const productsSchema = new mongoose.Schema({ ...schema });

module.exports = productsSchema;
