const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const r_familia = require("./routes/r_familia");
const r_precio = require("./routes/r_precio");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");

//Instancias
dotenv.config({
  path: "./config/config.env",
});

connectDB();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
//Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/Catalogo/Familias", r_familia);
app.use("/api/v1/Catalogo/ListaPrecios", r_precio);

app.use(errorHandler);

const server = app.listen(PORT, console.log(`We're on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
