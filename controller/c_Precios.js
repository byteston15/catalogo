const asyncHandler = require("../middlewares/async");
const precioSchema = require("../models/Precio");
const asyncHandler = require("../middlewares/async");
const errorResponse = require("../utils/errorResponse");

exports.savePrecio = asyncHandler(async (req, res, next) => {
  const precio = await precioSchema.create(req.body);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});

exports.deletePrecio = asyncHandler(async (req, res, next) => {
  const precio = await precioSchema.findByIdAndDelete(req.params.id);
  if (!precio) {
    return new errorResponse(
      `No existe una lista de precios con el id ${req.params.id}`
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
