const mongoose = require("mongoose");
const ticketSchema = mongoose.Schema({
  espacio:   { type: Number, required: true },
  usuario:   { type: String, required: true },
  noControl: { type: String, required: true },
  fecha:     { type: String, required: true },
  cancelado: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model("ticket", ticketSchema);
