const express = require("express");
const router = express.Router();
const {
  createFamilia,
  updateFamilia,
  deleteFamilia,
  getFamilia,
  getFamilias,
} = require("../controller/c_Familia");

router.route("/").get().post(createFamilia);

router.route("/:id").put(updateFamilia).get(getFamilia).delete(deleteFamilia);

module.exports = router;
