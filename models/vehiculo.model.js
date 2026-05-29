const mongoose = require("mongoose");
const vehiculoSchema = mongoose.Schema({
  placa:     { type: String, required: true, unique: true, uppercase: true },
  marca:     { type: String, required: true },
  modelo:    { type: String, required: true },
  noControl: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model("vehiculo", vehiculoSchema);
