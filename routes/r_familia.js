const express = require("express");
const {
  createFamilia,
  updateFamilia,
  deleteFamilia,
  getFamilia,
  getFamilias,
} = require("../controller/c_Familia");

const router = express.Router();

router.route("/").get().post(createFamilia).get(getFamilias);

router.route("/:id").put(updateFamilia).get(getFamilia).delete(deleteFamilia);

module.exports = router;
