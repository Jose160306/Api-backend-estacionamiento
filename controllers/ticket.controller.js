const Ticket = require("../models/ticket.model");
const Espacio = require("../models/espacio.model");
const { messageGeneral } = require("../utils/message");

class TicketController {
  static obtenerTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find().sort({ createdAt: -1 });
      return messageGeneral(res, 200, tickets, "Tickets obtenidos");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };

  static crearTicket = async (req, res) => {
    try {
      const { espacio, usuario, noControl, fecha } = req.body;
      const espacioDoc = await Espacio.findOne({ numero: espacio });
      if (!espacioDoc || espacioDoc.estado === "ocupado") return messageGeneral(res, 400, false, "Ese espacio ya está ocupado");
      await Espacio.findOneAndUpdate({ numero: espacio }, { estado: "ocupado" });
      const nuevoTicket = await Ticket.create({ espacio, usuario, noControl, fecha });
      return messageGeneral(res, 201, nuevoTicket, "Ticket creado correctamente");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };

  static cancelarTicket = async (req, res) => {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findByIdAndUpdate(id, { cancelado: true }, { new: true });
      if (!ticket) return messageGeneral(res, 404, false, "Ticket no encontrado");
      await Espacio.findOneAndUpdate({ numero: ticket.espacio }, { estado: "libre" });
      return messageGeneral(res, 200, ticket, "Ticket cancelado correctamente");
    } catch (error) {
      return messageGeneral(res, 500, false, null, error.message);
    }
  };
}
module.exports = TicketController;
