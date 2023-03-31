const mongoose = require("mongoose");

const schema = {
  title: String,
  content: String,
  url: String,
};

const blogSchema = new mongoose.Schema({ ...schema });

module.exports = blogSchema;
