const FamiliaSchema = require("../models/Familia");

/*
@Description  Crear una familia
@Route   DELETE / /apiCatalogo/v0.0.1/
@Access     Private
*/
exports.createFamilia = async (req, res, next) => {
  try {
    const familia = await FamiliaSchema.create(req.body);
    res.status(200).json({ success: true, data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, data: {} });
  }
};

/*
@Description  Obtiene  familias
@Route   Get / /apiCatalogo/v0.0.1/
@Access     Public
*/
exports.getFamilias = async (req, res, next) => {
  try {
    const familia = await FamiliaSchema.find();
    res.status(200).json({
      success: true,
      data: familia,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

/*
@Description  Obtiene una familia
@Route   GET / /apiCatalogo/v0.0.1/:id
@Access     Private
*/
exports.getFamilia = async (req, res, next) => {
  try {
    const familia = await FamiliaSchema.findById(req.params.id);
    if (!familia) {
      res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: familia });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/*
@Description  Edita una familia
@Route   PUT / /apiCatalogo/v0.0.1/:id
@Access     Private
*/
exports.updateFamilia = async (req, res, next) => {
  try {
    const familia = FamiliaSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //retorna el nuevo objeto en vez del viejo
      runValidators: true, //usa las validaciones al editar
    });
    if (!familia) {
      res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: familia });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

/*
@Description  Elimina una familia
@Route   DELETE / /apiCatalogo/v0.0.1/:id
@Access     Private
*/
exports.deleteFamilia = async (req, res, next) => {
  try {
    const familia = await FamiliaSchema.findByIdAndDelete(req.params.id);
    if (!familia) {
      res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
