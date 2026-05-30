const mongoose = require("mongoose");
const app = require("./app");
const Espacio = require("./models/espacio.model");

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI;

console.log("=== INICIANDO SERVIDOR ===");
console.log("MONGODB_URI existe?", !!mongoURI);
if (mongoURI) console.log("Primeros 20 chars:", mongoURI.substring(0, 20));

if (!mongoURI) {
  console.error("❌ FALTA MONGODB_URI");
  process.exit(1);
}

async function startServer() {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("✅ CONECTADO A MONGODB ATLAS");

    const count = await Espacio.countDocuments();
    console.log(`📊 Espacios existentes: ${count}`);

    if (count === 0) {
      const espacios = Array.from({ length: 20 }, (_, i) => ({ numero: i + 1, estado: "libre" }));
      await Espacio.insertMany(espacios);
      console.log("✅ 20 espacios creados");
    }

    app.listen(port, () => {
      console.log(`🚀 Servidor HTTP escuchando en puerto ${port}`);
    });
  } catch (error) {
    console.error("❌ ERROR DE CONEXIÓN A MONGODB:");
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

startServer();
