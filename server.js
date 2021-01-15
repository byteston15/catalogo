const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const r_familia = require("./routes/r_familia");

//Instancias
connectDB();
const app = express();

app.use(express.json());

//Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("api/v1/catalogoWeb", r_familia);

const server = app.listen(5000, console.log(`We're on port 5000`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
