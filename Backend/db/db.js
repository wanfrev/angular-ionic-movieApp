const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/dev";
    await mongoose.connect(mongoURI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    throw new Error("Fallo la conexión a MongoDB");
  }
};

module.exports = connectDB;
