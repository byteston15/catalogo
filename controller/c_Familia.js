const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const FamiliaSchema = require("../models/Familia");

/*
@Description  Crear una familia
@Route   DELETE / /apiCatalogo/v0.0.1/
@Access     Private
*/
exports.createFamilia = asyncHandler(async (req, res, next) => {
  const familia = await FamiliaSchema.create(req.body);
  res.status(200).json({ success: true, data: req.body });
});

/*
@Description  Obtiene  familias
@Route   Get / /apiCatalogo/v0.0.1/
@Access     Public
*/
exports.getFamilias = asyncHandler(async (req, res, next) => {
  const familia = await FamiliaSchema.find();
  res.status(200).json({
    success: true,
    data: familia,
  });
});

/*
@Description  Obtiene una familia
@Route   GET / /apiCatalogo/v0.0.1/:id
@Access     Private
*/
exports.getFamilia = asyncHandler(async (req, res, next) => {
  const familia = await FamiliaSchema.findById(req.params.id);
  if (!familia) {
    return next(
      new ErrorResponse(`No existe familia con el código ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: familia });
});

/*
@Description  Edita una familia
@Route   PUT / /apiCatalogo/v0.0.1/:id
@Access     Private
*/
exports.updateFamilia = asyncHandler(async (req, res, next) => {
  const familia = await FamiliaSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, //retorna el nuevo objeto en vez del viejo
      runValidators: true, //usa las validaciones al editar
    }
  );
  if (!familia) {
    return next(
      new ErrorResponse(`No existe familia con el código ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: familia });
});

/*
@Description  Elimina una familia
@Route   DELETE / /apiCatalogo/v0.0.1/:id
@Access     Private
*/
exports.deleteFamilia = asyncHandler(async (req, res, next) => {
  const familia = await FamiliaSchema.findByIdAndDelete(req.params.id);
  if (!familia) {
    return next(
      new ErrorResponse(`No existe familia con el código ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
