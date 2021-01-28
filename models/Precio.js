const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const PrecioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "La lista de precios debe tener un nombre"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

PrecioSchema.pre("save", function (next) {
  this.nombre = slugify(this.nombre, { lower: true });
  next();
});

module.exports = mongoose.model("Precio", PrecioSchema);
