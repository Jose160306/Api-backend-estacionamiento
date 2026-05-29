const mongoose = require("mongoose");
const app = require("./app");
const Espacio = require("./models/espacio.model");
const { DB_HOST, DB_NAME } = require("./constante");

const port = process.env.PORT || 4000;

// Conexión a MongoDB
mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`)
  .then(() => {
    console.log("Conectado a MongoDB");
    // Después de conectar, se verifica si hay espacios
    return Espacio.countDocuments();
  })
  .then(async (count) => {
    if (count === 0) {
      const espacios = Array.from({ length: 20 }, (_, i) => ({ numero: i + 1, estado: "libre" }));
      await Espacio.insertMany(espacios);
      console.log("20 espacios creados en la base de datos");
    }
  })
  .catch(error => console.log(error));

// El servidor Express escucha en el puerto definido
app.listen(port, () => {
  console.log("**********************************");
  console.log("****** API Estacionamiento *******");
  console.log("**********************************");
  console.log(`http://localhost:${port}/api/`);
});