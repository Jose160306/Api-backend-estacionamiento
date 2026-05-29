const Usuario = require("../models/usuario.model");
const { messageGeneral } = require("../utils/message");

class UsuarioController {
  static registrar = async (req, res) => {
    try {
      const { noControl, nombre, contrasena } = req.body;
      const existe = await Usuario.findOne({ noControl });
      if (existe) return messageGeneral(res, 400, false, "Ese número de control ya está registrado");
      const nuevoUsuario = await Usuario.create({ noControl, nombre, contrasena });
      return messageGeneral(res, 201, nuevoUsuario, "Usuario registrado correctamente");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };

  static login = async (req, res) => {
    try {
      const { noControl, contrasena } = req.body;
      const usuario = await Usuario.findOne({ noControl, contrasena });
      if (!usuario) return messageGeneral(res, 401, false, "Número de control o contraseña incorrectos");
      return messageGeneral(res, 200, usuario, "Login exitoso");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };

  static cambiarContrasena = async (req, res) => {
    try {
      const { noControl } = req.params;
      const { nuevaContrasena } = req.body;
      const actualizado = await Usuario.findOneAndUpdate({ noControl }, { contrasena: nuevaContrasena }, { new: true });
      if (!actualizado) return messageGeneral(res, 404, false, "Usuario no encontrado");
      return messageGeneral(res, 200, actualizado, "Contraseña actualizada correctamente");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };
}
module.exports = UsuarioController;
