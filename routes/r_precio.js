const express = require("express");
const router = express.Router();
const {
  deletePrecio,
  getPrecio,
  getPrecios,
  savePrecio,
  updatePrecio,
} = require("../controller/c_Precios");

router.route("/").get(getPrecios).post(savePrecio);
router.route("/:id").get(getPrecio).delete(deletePrecio).put(updatePrecio);

module.exports = router;
