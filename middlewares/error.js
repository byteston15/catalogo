const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //console para el developr
  console.log(err);

  //Id error
  if (err.name === "CastError") {
    const message = `No se encuentra familia con el id ${err.value}`;
    error = new errorResponse(message, 404);
  }

  //pk duplicada
  if (err.code === 11000) {
    const message = `El valor ${err.keyValue.nombre.toUpperCase()} ya esta registrado en las familias`;
    error = new errorResponse(message, 500);
  }

  if (err.name === "ValidationError") {
    //Object.values nos devuelve los valores del objeto entregado
    //y con .map sacamos solamente los mensajes del valor
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    data: error.message || "Server Error",
  });
};

module.exports = errorHandler;
