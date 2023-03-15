import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectedDB } from "./database/config.js";
import authRoutes from "./routes/auth.routes.js";
import linkRoutes from "./routes/link.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";

config();
const app = express();
const PORT = process.env.PORT || 5001;
//conexión a la base de datos
connectedDB();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];
// middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback(`Error de CORS origin: ${origin} no autorizado`);
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
// ejemplo back redirect (opcional)
app.use("/", redirectRoutes);

// carpeta publica
// app.use(express.static("./src/public"));

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}...😎🚀🚀🚀`);
});
