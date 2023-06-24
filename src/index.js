import express from 'express';
import connectDB from './db';

import User from './controladores/User';
import HelloRoute from './controladores/HelloRoute';
import Empresa from './controladores/Empresa';
import Oficio from './controladores/Oficio'
import corsMiddleware from './middleware';

const app = express();
const PORT = 3000;

// Conectar a la base de datos
connectDB();

// Middleware para analizar las solicitudes entrantes como JSON
app.use(express.json());

// Middleware CORS exportado desde el archivo separado
app.use(corsMiddleware);

// Rutas
app.use('/api', User);
app.use('/api', HelloRoute);
app.use('/api', Empresa)
app.use('/api', Oficio)


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});