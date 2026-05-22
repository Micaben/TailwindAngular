const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/empresa_transporte', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empresa_transporte order by ruc asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en obtener datos' });
  }
});

router.post('/empresa_transporte', async (req, res) => {
  const { ruc, razon_social } = req.body;
  try {
    await pool.query(
      `INSERT INTO empresa_transporte (ruc, razon_social) VALUES ($1, $2) RETURNING * `,
      [ruc, razon_social]
    );
    res.json({
      message: 'empresa creado',
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

router.put('/empresa_transporte/:id', async (req, res) => {
  const { id } = req.params;
  const { razon_social} = req.body;

  try {
    await pool.query(
      `
      UPDATE empresa_transporte
      SET razon_social = $1
      WHERE id = $5
      `,
      [razon_social, id ]
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