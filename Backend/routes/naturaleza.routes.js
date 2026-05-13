const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/naturaleza', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM naturaleza');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error naturaleza' });
  }
});

router.post('/naturaleza', async (req, res) => {
  const { codigo, descripcion } = req.body;
  try {
    await pool.query(
      `
      INSERT INTO naturaleza
      (codigo, descripcion)
      VALUES ($1, $2)
      `,
      [codigo, descripcion]
    );
    res.json({
      message: 'naturaleza creada'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creando producto'
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