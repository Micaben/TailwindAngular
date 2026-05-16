const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/proveedores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proveedores order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error proveedores' });
  }
});

router.post('/proveedores', async (req, res) => {
  const { codigo, descripcion } = req.body;
  try {
    await pool.query(
      `INSERT INTO proveedores (codigo, descripcion) VALUES ($1, $2) `,
      [codigo, descripcion]
    );
    res.json({
      message: 'proveedores creada'
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

router.put('/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const {
    descripcion
  } = req.body;

  try {
    await pool.query(
      `
      UPDATE proveedores
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