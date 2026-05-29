const express = require("express");
const TicketController = require("../controllers/ticket.controller");
const api = express.Router();
api.get("/",             TicketController.obtenerTickets);
api.post("/crear",       TicketController.crearTicket);
api.put("/cancelar/:id", TicketController.cancelarTicket);
module.exports = api;
