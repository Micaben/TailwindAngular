const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/naturaleza', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM naturaleza order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error naturaleza' });
  }
});

router.post('/naturaleza', async (req, res) => {
  const { codigo, descripcion } = req.body;
  try {
    const result = await pool.query(
      ` INSERT INTO naturaleza (codigo, descripcion) VALUES ($1, $2) RETURNING * `,
      [codigo, descripcion]
    );

    res.json({
      message: 'Naturaleza creada',
      data: result.rows[0]
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

router.put('/naturaleza/:id', async (req, res) => {
  const { id } = req.params;
  const {
    descripcion
  } = req.body;

  try {
    await pool.query(
      `
      UPDATE naturaleza
      SET descripcion = $1
      WHERE id = $2
      `,
      [descripcion, id]
    );

    res.json({
      message: 'Producto actualizado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error actualizando'
    });
  }

});
module.exports = router;