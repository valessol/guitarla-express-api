const express = require("express");
const productsRouter = require("./router/products.js");
const blogRouter = require("./router/blog.js");
const cartRouter = require("./router/cart.js");
const config = require("../config.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/blog", blogRouter);
app.use("/api/cart", cartRouter);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(`Something was wrong: ${err.message}`);
  }
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto ${PORT}: Environment: ${config.NODE_ENV}`
  );
});
