const express = require("express");
const router = express.Router();
const {
  savePrecio,
  deletePrecio,
  getPrecios,
  getPrecio,
  updatePrecio,
} = require("../controller/c_Precios");

router.route("/").get(getPrecios).post(savePrecio);

router.route("/:id").put(updatePrecio).delete(deletePrecio).get(getPrecio);

module.exports = router;
