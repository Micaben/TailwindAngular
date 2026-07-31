const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/tipocambio', async (req, res) => {
  try {

    const mes = req.query.mes || null;
    const anio = req.query.anio || null;
    const result = await pool.query(
      `SELECT * FROM tipocambio WHERE
        ($1::int IS NULL OR EXTRACT(MONTH FROM fecha) = $1::int)
        AND
        ($2::int IS NULL OR EXTRACT(YEAR FROM fecha) = $2::int)
      ORDER BY fecha asc`,
      [mes, anio]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error tipo de cambio'
    });
  }
});

router.post('/tipocambio', async (req, res) => {
  const { fecha, compra, venta } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tipocambio (fecha, compra, venta) VALUES ($1, $2, $3)  RETURNING * `,
      [fecha, compra, venta]
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

router.put('/tipocambio/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, compra, venta } = req.body;

  try {
    await pool.query(
      ` UPDATE tipocambio SET fecha = $1, compra= $2, venta= $3  WHERE id = $4`,
      [fecha, compra, venta, id]
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