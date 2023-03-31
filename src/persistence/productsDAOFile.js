const fs = require("fs");

class ProductDAOFile {
  constructor() {}

  async getProducts() {
    const data = await fs.promises.readFile(
      "./src/data/products.json",
      "utf-8"
    );
    return JSON.parse(data);
  }

  async getProductById(id) {
    const allProducts = await this.getProducts();
    const product = allProducts.find((product) => product.id === id);
    return product;
  }

  async getProductId() {
    let id;
    const allProducts = await this.getProducts();
    if (!allProducts.length) {
      id = 1;
    } else {
      const ids = allProducts.map((product) => product.id);
      id = Math.max(...ids) + 1;
    }
    return id;
  }

  async saveProduct(product) {
    if (product) {
      const id = await this.getProductId();
      const productToUpload = {
        ...product,
        id,
        timestamp: Date.now(),
      };
      const allProducts = await this.getProducts();
      const allUpdatedProducts = [...allProducts, productToUpload];
      await fs.promises
        .writeFile(
          "./src/data/products.json",
          JSON.stringify(allUpdatedProducts)
        )
        .then((res) => {
          return productToUpload;
        })
        .catch((err) => {
          console.log(`el producto no se ha podido guardar, ${err}`);
        });
    }
  }

  async updateProduct(id, product) {
    const allProducts = await this.getProducts();
    const productToUpdate = allProducts.find((product) => product.id === id);

    if (productToUpdate) {
      const filteredProducts = allProducts.filter((item) => item.id !== id);
      const newProducts = [
        ...filteredProducts,
        { ...productToUpdate, ...product },
      ];
      await fs.promises
        .writeFile("./src/data/products.json", JSON.stringify(newProducts))
        .then((res) => {
          return { ...productToUpdate, ...product };
        })
        .catch((error) =>
          console.log("no se ha podido actualizar el producto", error)
        );
    }
  }

  async deleteProduct(id) {
    const allProducts = await this.getProducts();
    const productToDelete = allProducts.find((item) => item.id === id);

    if (productToDelete) {
      const updatedProducts = allProducts.filter(
        (product) => product.id !== id
      );
      await fs.promises
        .writeFile("./src/data/products.json", JSON.stringify(updatedProducts))
        .then((res) => {
          return productToDelete;
        })
        .catch((error) => {
          console.log(`el producto no se ha podido eliminar, ${error}`);
        });
    }
  }
}

module.exports = ProductDAOFile;
