const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/sublinea', async (req, res) => {
  const { codigo, descripcion, linea } = req.body;
  try {
    await pool.query(
      `
      INSERT INTO sublinea
      (codigo, descripcion, linea)
      VALUES ($1, $2, $3)
      `,
      [codigo, descripcion, linea]
    );
    res.json({
      message: 'sublinea creada'
    });

  } catch (error) {
    console.error(error);
     console.error('FULL ERROR:', error);

  return res
    .status(400)
    .setHeader('Content-Type', 'application/json')
    .json({
      message: error.detail || error.message
    });
    // UNIQUE
    if (error.code === '23505') {
        console.error(error);

  return res
    .status(400)
    .json({
      message: error.detail || error.message
    });
    }

    // CHECK
    if (error.code === '23514') {
        console.error(error);

  return res
    .status(400)
    .json({
      message: error.detail || error.message
    });
    }

    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

router.put('/sublinea/:id', async (req, res) => {
  const { id } = req.params;
  const { descripcion, linea } = req.body;

  try {
    await pool.query(
      `
      UPDATE sublinea
      SET descripcion = $1, linea = $2
      WHERE id = $3
      `,
      [descripcion, linea, id]
    );

    res.json({
      message: 'sublinea actualizado'
    });
    console.log(req.body)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error actualizando'
    });
  }

});

router.get('/sublinea', async (req, res) => {
  try {
    const lineaId = req.query.linea;
    let result;
    // SI VIENE FILTRO
    if (lineaId) {
      result = await pool.query(
        `SELECT s.id, s.codigo, s.descripcion, s.linea as codigolinea, l.descripcion AS lineadescripcion FROM sublinea s INNER JOIN linea l ON s.linea = l.codigo WHERE s.linea = $1 ORDER BY s.codigo ASC`,
        [lineaId]
      );
    } else {
      result = await pool.query(
        `SELECT s.id, s.codigo, s.descripcion, s.linea as codigolinea, l.descripcion AS lineadescripcion FROM sublinea s INNER JOIN linea l ON s.linea = l.codigo ORDER BY s.codigo ASC`
      );
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error sublinea',
      error: error.message
    });
  }
});

module.exports = router;