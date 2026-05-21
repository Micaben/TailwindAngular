const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/tipo_persona', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tipo_persona order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});

router.get('/tipo_documento', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tipo_documento order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});

router.get('/moneda', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM moneda order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});
module.exports = router;

router.get('/documentos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM documentos order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});
module.exports = router;

router.get('/tipo_operacion', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tabla_tipo_operacion order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});
module.exports = router;

router.get('/tipo_factura', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tabla_tipo_factura order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});
module.exports = router;

router.get('/tipo_afectacion', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tabla_tipo_afectacion_igv order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});
module.exports = router;

router.get('/tipo_nc', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tabla_tipo_nc order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});
module.exports = router;

router.get('/tipo_nd', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tabla_tipo_nd order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en consulta' });
  }
});
module.exports = router;