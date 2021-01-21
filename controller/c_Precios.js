const asyncHandler = require("../middlewares/async");
const precioSchema = require("../models/Precio");
const asyncHandler = require("../middlewares/async");
const errorResponse = require("../utils/errorResponse");

/*
@Description  Elimina una familia
@Route   DELETE / /apiCatalogo/v0.0.1/:id
@Access     Private
*/
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

exports.getPrecios = asyncHandler(async (req, res, next) => {
  const precio = await precioSchema.find();
  res.status(200).json({ success: true, data: precio });
});

exports.getPrecio = asyncHandler(async (req, res, next) => {
  const precio = precioSchema.findById(req.params.id);
  if (!precio) {
    return new errorResponse(
      `No se encontró lista de precio con el id ${req.params.id}`
    );
  }
  res.status(200).json({
    success: true,
    data: precio,
  });
});

exports.updatePrecio = asyncHandler(async (req, res, next) => {
  const precio = precioSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!precio) {
    return new errorResponse(
      `No se encontró lista de precio con el id ${req.params.id}`
    );
  }
  res.status(200).json({
    success: true,
    data: precio,
  });
});
