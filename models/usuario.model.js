const mongoose = require("mongoose");
const usuarioSchema = mongoose.Schema({
  noControl:  { type: String, required: true, unique: true, trim: true },
  nombre:     { type: String, required: true, uppercase: true },
  contrasena: { type: String, required: true },
  esAdmin:    { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model("usuario", usuarioSchema);
