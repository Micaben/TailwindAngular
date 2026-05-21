const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/transportista', async (req, res) => {
  try {
    const result = await pool.query('SELECT *, e.razon_social FROM transportista t inner join empresa_transporte e on t.empresa_transporte=e.ruc order by nombres asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error transportista' });
  }
});

router.post('/transportista', async (req, res) => {
  const { empresa_transporte, nombres, dni, licencia, unidad, placa, apellido_paterno, apellido_materno, tipo_documento, estado} = req.body;
  try {
    await pool.query(
      `
      INSERT INTO transportista
      (empresa_transporte,  nombres, dni, licencia, unidad, placa, apellido_paterno, apellido_materno, tipo_documento, estado)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [empresa_transporte, nombres, dni, licencia, unidad, placa, apellido_paterno, apellido_materno, tipo_documento, estado]
    );
    res.json({
      message: 'Transportista creada'
    });

  } catch (error) {
    console.error(error);
    // UNIQUE
    if (error.code === '23505') {
      return res.status(400).json({
        message: `Error al guardar`
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

router.put('/transportista/:id', async (req, res) => {
  const { id } = req.params;
  const { nombres, apellido_paterno, apellido_materno, tipo_documento, dni, licencia, unidad, placa, empresa_transporte, estado } = req.body;

  try {
    await pool.query(
      `
      UPDATE transportista
      SET nombres=$1, apellido_paterno=$2, apellido_materno=$3, tipo_documento=$4, dni=$5, licencia=$6, unidad=$7, placa=$8, empresa_transporte=$9, estado=$10
      WHERE id = $11
      `,
      [nombres, apellido_paterno, apellido_materno, tipo_documento, dni, licencia, unidad, placa, empresa_transporte, estado, id]
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