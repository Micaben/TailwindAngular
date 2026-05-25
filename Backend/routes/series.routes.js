const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/series', async (req, res) => {
  try {
    const result = await pool.query('SELECT s.id, s.comprobante, d.descripcion as descripcion, serie, ultimo FROM series s inner join documentos d on d.codigo=s.comprobante order by s.comprobante asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error series' });
  }
});

router.post('/series', async (req, res) => {
  const { serie, ultimo, comprobante } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO series (serie, ultimo, comprobante) VALUES ($1, $2, $3)  RETURNING * `,
      [ serie, ultimo, comprobante]
    );
    res.json({
      message: 'series creada',
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

router.put('/series/:id', async (req, res) => {
  const { id } = req.params;
  const { serie, ultimo, comprobante } = req.body;

  try {
    await pool.query(
      `
      UPDATE series
      SET serie = $1, ultimo=$2, comprobante=$3
      WHERE id = $4
      `,
      [ serie, ultimo, comprobante, id]
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