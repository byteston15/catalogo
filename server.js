const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const r_familia = require("./routes/r_familia");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");

//Instancias
dotenv.config({
  path: "./config/config.env",
});

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//Middlewares

app.use("/api/v1/Catalogo", r_familia);

app.use(errorHandler);

const server = app.listen(PORT, console.log(`We're on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
