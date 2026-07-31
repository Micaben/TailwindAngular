require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');//se declara solo para pruebas de conexion a la base de datos, no se utiliza en el resto del codigo, se puede borrar luego de verificar que la conexion a la base de datos funciona correctamente
const app = express();
const errorHandler = require('./middlewares/error.middleware');
const registerRoutes = require('./routes');
app.use(cors());
app.use(express.json());  

// Registrar todas las rutas
registerRoutes(app);

// Middleware de errores (siempre al final)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// PRUEBA PARA SABER SI EL SERVIDOR ESTA FUNCIONANDO CORRECTAMENTE, DEBE MOSTRAR EL MENSAJE API FUNCIONANDO
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);//COPIAR RUTA CON EL PUERTO 3000
});

app.get('/', (req, res) => {
  res.send('API funcionando');
});

//PRUEBA DE CONEXION EXITOSA A BD DEBE MOSTRAR LA FECHA ACTUAL
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});