const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/ubigeo', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ubigeo order by id asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar ubigeos' });
  }
});

module.exports = router;