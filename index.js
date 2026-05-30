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

// Conexión inmediata y forzamos el error a aparecer en logs
mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 15000
})
  .then(() => {
    console.log("✅ CONECTADO A MONGODB ATLAS");
    return Espacio.countDocuments();
  })
  .then(count => {
    console.log(`📊 Espacios existentes: ${count}`);
    if (count === 0) {
      const espacios = Array.from({ length: 20 }, (_, i) => ({ numero: i + 1, estado: "libre" }));
      return Espacio.insertMany(espacios);
    }
  })
  .then(() => {
    console.log("🚀 Base de datos lista");
  })
  .catch(err => {
    console.error("❌ ERROR DE CONEXIÓN A MONGODB:");
    console.error(err.message);
    console.error(err.stack);
    // No hacemos process.exit para que el servidor igual arranque (pero sin DB)
  });

app.listen(port, () => {
  console.log(`🚀 Servidor HTTP escuchando en puerto ${port}`);
});
