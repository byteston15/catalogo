const productoSchema = require("../models/Producto");
const asyncHandler = require("../middlewares/async");
const errorResponse = require("../utils/errorResponse");

const createProducto = asyncHandler(async (req, res, next) => {
  const producto = await productoSchema.create(req.body);
  res.status(200).json({
    success: true,
    data: producto,
  });
});

const updateProducto = asyncHandler(async (req, res, next) => {
  const producto = await productoSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!producto) {
    return next(
      new errorResponse(
        `No se encuentra el producto con el id ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: producto });
});

const deleteProducto = asyncHandler(async (req, res, next) => {
  const producto = await productoSchema.findByIdAndDelete(req.params.id);
  if (!producto) {
    return next(
      new errorResponse(`No existe producto con el id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

const getProductos = asynchandler(async (req, res, next) => {
  const producto = await productoSchema.find();
  res.status(200).json({ success: true, data: producto });
});

const getProducto = asyncHandler(async (req, res, next) => {
  const producto = await productoSchema.findById(req.params.id);
  if (!producto) {
    return next(
      new errorResponse(
        `No se encontró producto con el id ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: producto });
});
