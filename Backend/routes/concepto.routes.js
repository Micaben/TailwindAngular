const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/concepto', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM concepto_venta order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error concepto' });
  }
});

router.post('/concepto', async (req, res) => {
  const { codigo, descripcion } = req.body;
  try {
    await pool.query(
      `INSERT INTO concepto (codigo, descripcion) VALUES ($1, $2) `,
      [codigo, descripcion]
    );
    res.json({
      message: 'concepto creada'
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

router.put('/concepto/:id', async (req, res) => {
  const { id } = req.params;
  const {
    descripcion
  } = req.body;

  try {
    await pool.query(
      `
      UPDATE concepto
      SET descripcion = $1
      WHERE id = $2
      `,
      [descripcion, id]
    );

    res.json({
      message: 'Datos actualizado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error actualizando'
    });
  }

});
module.exports = router;