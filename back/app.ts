import express, { Request, Response } from "express";
import dotenv from "dotenv";

import setupRoutes from "./src/routes/index";
import path from "path";

const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

const corsOptions = {
  origin: 'https://spotify-search-alpha.vercel.app', // Cambia esto por tu origen permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions));


app.use(express.json()); // Parsear cuerpos de solicitud en formato JSON

// Configurar rutas
setupRoutes(app);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});