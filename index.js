const mongoose = require("mongoose");
const app = require("./app");
const Espacio = require("./models/espacio.model");

const port = process.env.PORT || 4000;

//se usa la variable MONGODB_URI si existe, si no, pos usa la conexión local xd
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/estacionamiento";

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Conectado a MongoDB en:", mongoURI.includes("mongodb.net") ? "Atlas" : "Local");
    return Espacio.countDocuments();
  })
  .then(async (count) => {
    if (count === 0) {
      const espacios = Array.from({ length: 20 }, (_, i) => ({ numero: i + 1, estado: "libre" }));
      await Espacio.insertMany(espacios);
      console.log("20 espacios creados");
    }
  })
  .catch(error => console.log("Error de conexión a MongoDB:", error));

app.listen(port, () => {
  console.log(`API Estacionamiento en puerto ${port}`);
});