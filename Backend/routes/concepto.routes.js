const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/concepto', async (req, res) => {
  try {
    const result = await pool.query('SELECT c.codigo,c.descripcion, d.descripcion as documento, c.tipo_factura, c.tipo_operacion, c.tipo_afectacion, c.tipo_nc, c.tipo_nd FROM concepto_venta c inner join documentos d on c.comprobante=d.codigo order by c.codigo asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error concepto' });
  }
});

router.post('/concepto', async (req, res) => {
  const { codigo, descripcion, tipo_afectacion, tipo_operacion, comprobante, tipo_factura, tipo_nc, tipo_nd} = req.body;
  try {
    await pool.query(
      `INSERT INTO concepto_venta (codigo, descripcion, tipo_afectacion, tipo_operacion, comprobante, tipo_factura, tipo_nc, tipo_nd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) `,
      [codigo, descripcion, tipo_afectacion, tipo_operacion, comprobante, tipo_factura, tipo_nc, tipo_nd]
    );
    res.json({
      message: 'concepto creada'
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

router.put('/concepto/:id', async (req, res) => {
  const { id } = req.params;
  const {
    descripcion
  } = req.body;

  try {
    await pool.query(
      `
      UPDATE concepto_venta
      SET descripcion = $1
      WHERE id = $2
      `,
      [descripcion, id]
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