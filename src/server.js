const express = require("express");
const productsRouter = require("./router/products.js");
const blogRouter = require("./router/blog.js");
const config = require("../config.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/blog", blogRouter);
app.use("/api/cart", cartRouter);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto ${PORT}: Environment: ${config.NODE_ENV}`
  );
});
