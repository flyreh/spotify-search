import express, { Request, Response } from "express";
import dotenv from "dotenv";

import setupRoutes from "./src/routes/index";
import path from "path";

const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;


app.use(cors({
  origin: 'https://spotify-search-alpha.vercel.app', // Cambia esto al dominio correcto
  credentials: true
}));


app.use(express.json()); // Parsear cuerpos de solicitud en formato JSON

// Configurar rutas
setupRoutes(app);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});