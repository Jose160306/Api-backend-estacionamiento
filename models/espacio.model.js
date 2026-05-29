const mongoose = require("mongoose");
const espacioSchema = mongoose.Schema({
  numero: { type: Number, required: true, unique: true },
  estado: { type: String, enum: ["libre", "ocupado"], default: "libre" }
}, { timestamps: true });
module.exports = mongoose.model("espacio", espacioSchema);
