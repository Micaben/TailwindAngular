require('dotenv').config();
const pool = require('./db');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const SECRET = 'mi_clave_secreta';
app.use(cors());
app.use(express.json());

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no existe' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        direccion: user.direccion,
        telefono: user.telefono
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

//PRODUCTOS
const productosRoutes = require('./routes/productos.routes');
app.use(productosRoutes);

//NATURALEZA 
const naturalezaRoutes = require('./routes/naturaleza.routes');
app.use(naturalezaRoutes);

//LINEA
const lineaRoutes = require('./routes/linea.routes');
app.use(lineaRoutes);

//SUBLINEA
const sublineaRoutes = require('./routes/sublinea.routes');
app.use(sublineaRoutes);

//UNIDAD DE MEDIDA
const unidadmedidaRoutes = require('./routes/unidadmedida.routes');
app.use(unidadmedidaRoutes);

//COLOR
const colorRoutes = require('./routes/color.routes');
app.use(colorRoutes);

//PROVEEDORES
const proveedoresRoutes = require('./routes/proveedores.routes');
app.use(proveedoresRoutes);

//CLIENTES
const clientesRoutes = require('./routes/clientes.routes');
app.use(clientesRoutes);

//TIPO PERSONA
const tipopersonaRoutes = require('./routes/tablas.routes');
app.use(tipopersonaRoutes);

//TIPO PERSONA
const tipodocumentoRoutes = require('./routes/tablas.routes');
app.use(tipodocumentoRoutes);

//TIPO MONEDA
const monedaRoutes = require('./routes/tablas.routes');
app.use(monedaRoutes);

//CONDICION DE VENTA
const condicionRoutes = require('./routes/condicion.routes');
app.use(condicionRoutes);

//VENDEDOR
const vendedorRoutes = require('./routes/vendedor.routes');
app.use(vendedorRoutes);

//CONCEPTO
const conceptoRoutes = require('./routes/concepto.routes');
app.use(conceptoRoutes);

//ALMACENES
const almacenesRoutes = require('./routes/almacenes.routes');
app.use(almacenesRoutes);

//EMPRESA DE TRANSPORTE
const empresa_transporteRoutes = require('./routes/empresa_transporte.routes');
app.use(empresa_transporteRoutes);

//TRANSPORTISTA
const transportistaRoutes = require('./routes/transportista.routes');
app.use(transportistaRoutes);

// SERVIDOR FUNCIONANDO CORRECTAMENTE DEBE MOSTRAR EL MENSAJE API FUNCIONANDO
app.listen(3000, () => {
  console.log('Backend corriendo en http://localhost:3000');
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