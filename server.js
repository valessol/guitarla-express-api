const express = require("express");
const router = require("./src/router/router.js");
const config = require("./config.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", router);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto ${PORT}: Environment: ${config.NODE_ENV}`
  );
});
