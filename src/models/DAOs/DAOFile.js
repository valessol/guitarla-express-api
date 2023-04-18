const fs = require("fs");

class DAOFile {
  constructor(collection, schema) {
    this.path = `./src/data/${collection}.json`;
  }

  async getItems() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const allItems = await this.getItems();
    const item = allItems.find((item) => item.id === id);
    if (!item) return {};
    return item;
  }

  generateId = () => {
    try {
      const id = crypto.randomUUID();
      return id;
    } catch (err) {
      throw new Error(err);
    }
  };

  async saveItem(product) {
    if (product) {
      const id = await this.generateId();
      const itemToUpload = {
        ...product,
        id,
        _id: id,
        timestamp: Date.now(),
      };
      const allItems = await this.getItems();
      const allUpdatedItems = [...allItems, itemToUpload];
      await fs.promises
        .writeFile(this.path, JSON.stringify(allUpdatedItems))
        .then((res) => {
          return itemToUpload;
        })
        .catch((err) => {
          console.log(`el producto no se ha podido guardar, ${err}`);
        });
    }
  }

  async updateItem(id, item) {
    const allItems = await this.getItems();
    const itemToUpdate = allItems.find((item) => item.id === id);

    if (itemToUpdate) {
      const filteredItems = allItems.filter((item) => item.id !== id);
      const newItems = [...filteredItems, { ...itemToUpdate, ...item }];
      await fs.promises
        .writeFile(this.path, JSON.stringify(newItems))
        .then((res) => {
          return { ...itemToUpdate, ...item };
        })
        .catch((error) => console.log("no se ha podido actualizar", error));
    }
  }

  async deleteItem(id) {
    const allItems = await this.getItems();
    const itemToDelete = allItems.find((item) => item.id === id);

    if (itemToDelete) {
      const updatedItems = allItems.filter((item) => item.id !== id);
      await fs.promises
        .writeFile(this.path, JSON.stringify(updatedItems))
        .then((res) => {
          return itemToDelete;
        })
        .catch((error) => {
          console.log(`no se ha podido eliminar, ${error}`);
        });
    }
  }
}

module.exports = DAOFile;
