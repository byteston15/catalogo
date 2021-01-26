const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: [true, "El código es un campo obligatorio"],
      min: [4, "El código debe tener al menos 4 caracteres"],
      max: [30, "El código no puede tener más de 30 caracteres"],
      unique: [true, "El código no puede repetirse"],
    },
    foto: {
      type: String,
      default: "default.jpg",
    },
    codigoBarra: {
      type: String,
      required: [true, "El código de barras es un campo obligatorio"],
      min: [4, "El código de barras debe tener minimo 4 caracteres"],
      max: [30, "El código de barras no puede tener más de 30 caracteres"],
    },
    descripcion: {
      type: String,
      default: "Sin descripción",
      max: [200, "El largo máximo es de 200 "],
      min: [5, "El largo debe ser al menos de 5"],
    },
    costo: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    precios: {
      type: Array,
      min: [1, "El producto debe tener al menos un precio"], // {idListaPrecio : '3123', precio : 20.500}
    },
    familia: {
      type: String,
      required: [true, "La familia es requerida"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producto", ProductoSchema);
