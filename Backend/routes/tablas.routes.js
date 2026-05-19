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