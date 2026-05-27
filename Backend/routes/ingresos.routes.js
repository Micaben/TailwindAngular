const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/ingresos', async (req, res) => {
  try {
    const result = await pool.query(`SELECT serie, ultimo FROM series where comprobante='21'`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error ingresos' });
  }
});

router.get('/tipo-operacion', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM almacen_tipo_operacion order by codigo asc`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error ingresos' });
  }
});

router.post('/ingresos', async (req, res) => {
  const { codigo, descripcion, direccion, telefono, encargado } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO ingresos (codigo, descripcion, direccion, telefono, encargado) VALUES ($1, $2, $3, $4, $5)  RETURNING * `,
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

router.put('/ingresos/:id', async (req, res) => {
  const { id } = req.params;
  const { descripcion, direccion, telefono, encargado } = req.body;

  try {
    await pool.query(
      `
      UPDATE ingresos
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