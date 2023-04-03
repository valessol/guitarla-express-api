const mongoose = require("mongoose");

const schema = {
  products: [
    {
      _id: String,
      quantity: Number,
    },
  ],
  timestamp: String,
};

const cartsSchema = new mongoose.Schema({ ...schema });

module.exports = cartsSchema;
