import express, { Request, Response } from "express";
import dotenv from "dotenv";

import setupRoutes from "./routes/index";
import path from "path";

const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log(`CORS request from origin: ${origin}`); // Mensaje de depuración
    if (!origin || /^http:\/\/localhost(:[0-9]+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si necesitas enviar cookies o tokens en la cabecera Authorization
  optionsSuccessStatus: 204
};

app.use(cors());// Habilitar CORS


app.use(express.json()); // Parsear cuerpos de solicitud en formato JSON
app.use(express.static(path.join(__dirname, "dist"))); // Servir archivos estáticos

// Configurar rutas
setupRoutes(app);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});