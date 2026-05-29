const Espacio = require("../models/espacio.model");
const { messageGeneral } = require("../utils/message");

class EspacioController {
  static obtenerEspacios = async (req, res) => {
    try {
      const espacios = await Espacio.find().sort({ numero: 1 });
      return messageGeneral(res, 200, espacios, "Espacios obtenidos");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };

  static cambiarEstado = async (req, res) => {
    try {
      const { numero } = req.params;
      const { estado } = req.body;
      const actualizado = await Espacio.findOneAndUpdate({ numero }, { estado }, { new: true });
      if (!actualizado) return messageGeneral(res, 404, false, "Espacio no encontrado");
      return messageGeneral(res, 200, actualizado, "Estado actualizado");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };
}
module.exports = EspacioController;
