const Vehiculo = require("../models/vehiculo.model");
const { messageGeneral } = require("../utils/message");

class VehiculoController {
  static obtenerVehiculos = async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find().sort({ createdAt: -1 });
      return messageGeneral(res, 200, vehiculos, "Vehículos obtenidos");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };

  static registrarVehiculo = async (req, res) => {
    try {
      const { placa, marca, modelo, noControl } = req.body;
      const existe = await Vehiculo.findOne({ placa });
      if (existe) return messageGeneral(res, 400, false, "Esa placa ya está registrada");
      const nuevoVehiculo = await Vehiculo.create({ placa, marca, modelo, noControl });
      return messageGeneral(res, 201, nuevoVehiculo, "Vehículo registrado correctamente");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };

  static eliminarVehiculo = async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Vehiculo.findByIdAndDelete(id);
      if (!eliminado) return messageGeneral(res, 404, false, "Vehículo no encontrado");
      return messageGeneral(res, 200, eliminado, "Vehículo eliminado correctamente");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };
}
module.exports = VehiculoController;
