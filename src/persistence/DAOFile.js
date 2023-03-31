const fs = require("fs");

class DAOFile {
  constructor(fileName) {
    this.path = `./src/data/${fileName}.json`;
  }

  async getItems() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getItemById(id) {
    const allItems = await this.getItems();
    const item = allItems.find((item) => item.id === id);
    return item;
  }

  async getItemId() {
    let id;
    const allItems = await this.getItems();
    if (!allItems.length) {
      id = 1;
    } else {
      const ids = allItems.map((item) => item.id);
      id = Math.max(...ids) + 1;
    }
    return id;
  }

  async saveItem(item) {
    if (item) {
      const id = await this.getItemId();
      const itemToUpload = {
        ...item,
        id,
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
          console.log(`el item no se ha podido guardar, ${err}`);
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
        .catch((error) =>
          console.log("no se ha podido actualizar el item", error)
        );
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
          console.log(`el item no se ha podido eliminar, ${error}`);
        });
    }
  }
}

module.exports = DAOFile;