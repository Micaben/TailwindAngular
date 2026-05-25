const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/almacenes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM almacenes order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error almacenes' });
  }
});

router.post('/almacenes', async (req, res) => {
  const { codigo, descripcion, direccion, telefono, encargado } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO almacenes (codigo, descripcion, direccion, telefono, encargado) VALUES ($1, $2, $3, $4, $5)  RETURNING * `,
      [codigo, descripcion, direccion, telefono, encargado]
    );
    res.json({
      message: 'almacen creado',
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

router.put('/almacenes/:id', async (req, res) => {
  const { id } = req.params;
  const { descripcion, direccion, telefono, encargado } = req.body;

  try {
    await pool.query(
      `
      UPDATE almacenes
      SET descripcion = $1, direccion= $2, telefono= $3, encargado= $4
      WHERE id = $5
      `,
      [descripcion, direccion, telefono, encargado, id]
    );

    res.json({
      message: 'Datos actualizados'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error actualizando'
    });
  }

});
module.exports = router;