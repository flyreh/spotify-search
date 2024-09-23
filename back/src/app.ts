import express, { Request, Response } from "express";
import dotenv from "dotenv";

import setupRoutes from "./routes/index";
import path from "path";

const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;


app.use(cors());// Habilitar CORS


app.use(express.json()); // Parsear cuerpos de solicitud en formato JSON

// Configurar rutas
setupRoutes(app);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});