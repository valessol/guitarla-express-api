const DAOFile = require("./DAOFile.js");
const config = require("../../config.js");

class BlogDAOFactory {
  static get(collectionName) {
    const DAOpersistence = {
      // mongodb: DAOMongo,
      file: DAOFile,
    };
    console.log(collectionName);
    return new DAOpersistence[config.PERSISTENCE](collectionName);
  }
}

module.exports = BlogDAOFactory;
