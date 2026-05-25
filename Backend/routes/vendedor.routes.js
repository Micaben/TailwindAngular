const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/vendedor', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vendedor order by codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error vendedor' });
  }
});

router.post('/vendedor', async (req, res) => {
  const { codigo, nombres, direccion, telefono, correo, estado } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO vendedor (codigo, nombres, direccion, telefono, correo, estado) VALUES ($1, $2, $3, $4, $5, %6) RETURNING * `,
      [codigo, nombres, direccion, telefono, correo, estado]
    );

    res.json({
      message: 'vendedor creado',
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

router.put('/vendedor/:id', async (req, res) => {
  const { id } = req.params;
  const { nombres, direccion, telefono, correo, estado
  } = req.body;

  try {
    await pool.query(
      `
      UPDATE vendedor
      SET nombres = $1, direccion = $2, telefono = $3, correo = $4, estado=$5
      WHERE id = $6
      `,
      [nombres, direccion, telefono, correo, estado, id]
    );

    res.json({
      message: 'Vendedor actualizado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error actualizando'
    });
  }

});
module.exports = router;