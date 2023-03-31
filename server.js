const express = require("express");
const productsRouter = require("./src/router/products.js");
const blogRouter = require("./src/router/blog.js");
const config = require("./config.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/blog", blogRouter);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto ${PORT}: Environment: ${config.NODE_ENV}`
  );
});
