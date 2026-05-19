const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/condicion', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM condicion_venta order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error condicion' });
  }
});

router.post('/condicion', async (req, res) => {
  const { codigo, descripcion, plazo } = req.body;
  try {
    await pool.query(
      `INSERT INTO condicion_venta (codigo, descripcion, plazo) VALUES ($1, $2, $3) `,
      [codigo, descripcion, plazo]
    );
    res.json({
      message: 'condicion creada'
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

router.put('/condicion/:id', async (req, res) => {
  const { id } = req.params;
  const { descripcion, plazo } = req.body;

  try {
    await pool.query(
      `
      UPDATE condicion_venta
      SET descripcion = $1, plazo=$2
      WHERE id = $3
      `,
      [descripcion, plazo, id]
    );

    res.json({
      message: 'Condicion actualizado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error actualizando'
    });
  }

});
module.exports = router;