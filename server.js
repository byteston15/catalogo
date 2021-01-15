const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const r_familia = require("./routes/r_familia");
const dotenv = require("dotenv");

//Instancias
dotenv.config({
  path: "./config/config.env",
});

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//Middlewares

app.use("apiCatalogoWeb/v0.0.1", r_familia);

const server = app.listen(PORT, console.log(`We're on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
