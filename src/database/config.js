import mongoose from "mongoose";

export const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected DB Mongo");
  } catch (error) {
    console.log("Falló la conexión a la base de datos", error);
  }
};
