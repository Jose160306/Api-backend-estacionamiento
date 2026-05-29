const express    = require("express");
const cors       = require("cors");
const bodyParser = require("body-parser");
const UsuarioRouter  = require("./routes/usuario.router");
const EspacioRouter  = require("./routes/espacio.router");
const TicketRouter   = require("./routes/ticket.router");
const VehiculoRouter = require("./routes/vehiculo.router");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/usuarios",  UsuarioRouter);
app.use("/api/espacios",  EspacioRouter);
app.use("/api/tickets",   TicketRouter);
app.use("/api/vehiculos", VehiculoRouter);

module.exports = app;
