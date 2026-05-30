const mongoose = require("mongoose");
const app = require("./app");
const Espacio = require("./models/espacio.model");

const port = process.env.PORT || 4000;

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("❌ FALTA la variable de entorno MONGODB_URI");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    return Espacio.countDocuments();
  })
  .then(async (count) => {
    if (count === 0) {
      const espacios = Array.from({ length: 20 }, (_, i) => ({ numero: i + 1, estado: "libre" }));
      await Espacio.insertMany(espacios);
      console.log("✅ 20 espacios creados en la base de datos");
    }
  })
  .catch(error => console.error("❌ Error de conexión a MongoDB:", error));

app.listen(port, () => {
  console.log(`🚀 API Estacionamiento ejecutándose en puerto ${port}`);
});
