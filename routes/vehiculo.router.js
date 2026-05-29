const express = require("express");
const VehiculoController = require("../controllers/vehiculo.controller");
const api = express.Router();
api.get("/",           VehiculoController.obtenerVehiculos);
api.post("/registrar", VehiculoController.registrarVehiculo);
api.delete("/eliminar/:id", VehiculoController.eliminarVehiculo);
module.exports = api;
