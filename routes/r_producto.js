const express = require("express");
const router = express.Router();
const {
  getProductos,
  getProducto,
  updateProducto,
  deleteProducto,
  saveProducto,
} = require("../controller/c_Productos");

router.route("/").get(getProductos).post(saveProducto);

router
  .route("/:id")
  .get(getProducto)
  .put(updateProducto)
  .delete(deleteProducto);

module.exports = router;
