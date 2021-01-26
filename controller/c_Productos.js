const productoSchema = require("../models/Producto");
const asyncHandler = require("../middlewares/async");
const errorResponse = require("../utils/errorResponse");

exports.saveProducto = asyncHandler(async (req, res, next) => {
  const producto = await productoSchema.create(req.body);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});

exports.updateProducto = asyncHandler(async (req, res, next) => {
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

exports.deleteProducto = asyncHandler(async (req, res, next) => {
  const producto = await productoSchema.findByIdAndDelete(req.params.id);
  if (!producto) {
    return next(
      new errorResponse(`No existe producto con el id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

exports.getProductos = asyncHandler(async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ["select", "sort"];

  //Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]); //Lo remueve para de esta manera no tener problemas con la query en el url

  //convertimos el query a string con json.stringify
  let queryStr = JSON.stringify(reqQuery);
  //Reemplazamos lo que empiece con y termine con de las opciones en parentesis
  queryStr = queryStr.replace(
    /\b(lt|lte|gte|gt|in)\b/g,
    (match) => `$${match}` //Match es el valor el cual tomo la regex, al entregarle los backticks con $$match estamos concatenando el $ a la variable match
  );
  //finding resource
  query = productoSchema.find(JSON.parse(queryStr));

  //Select Fields
  if (req.query.select) {
    //Separa los campos con un espacio donde encuentre una coma
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields); //le dice a query que los campos seleccionados son los anteriormente manipulados, ya que deben ir con un espacio
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy); //Ordenara según el orden que le entreguemos los argumentos
  } else {
    query = query.sort("nombre"); //Ordenará por defecto con el nombre
  }

  //executing our query
  const producto = await query;
  res
    .status(200)
    .json({ success: true, count: producto.length, data: producto });
});

exports.getProducto = asyncHandler(async (req, res, next) => {
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
