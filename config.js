const { config } = require("dotenv");
const path = require("path");

const envFileName = `${
  process.env.NODE_ENV ? process.env.NODE_ENV : "development"
}.env`;

if (envFileName === "development.env")
  config({
    path: path.resolve(process.cwd(), envFileName),
  });
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
  MONGO_DATA_BASE_URL: process.env.MONGO_DATA_BASE_URL,
  PERSISTENCE: process.env.PERSISTENCE || "file",
  CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
