const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/linea', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM linea order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error linea' });
  }
});

router.post('/linea', async (req, res) => {
  const { codigo, descripcion } = req.body;
  try {
    await pool.query(
      `
      INSERT INTO linea
      (codigo, descripcion)
      VALUES ($1, $2)
      `,
      [codigo, descripcion]
    );
    res.json({
      message: 'Linea creada'
    });

  } catch (error) {
    console.error(error);
    // UNIQUE
    if (error.code === '23505') {
      return res.status(400).json({
        message: `El código ${codigo} ya existe`
      });
    }

    // CHECK
    if (error.code === '23514') {
      return res.status(400).json({
        message: 'El código debe tener 2 dígitos'
      });
    }

    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

router.put('/linea/:id', async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;

  try {
    await pool.query(
      `
      UPDATE linea
      SET descripcion = $1
      WHERE id = $2
      `,
      [descripcion, id]
    );

    res.json({
      message: 'Linea actualizado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error actualizando'
    });
  }

});
module.exports = router;