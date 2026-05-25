const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes order by ruc asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error clientes' });
  }
});

router.post('/clientes', async (req, res) => {
  const { tipo_documento, ruc, tipo_persona, nombres, apellido_paterno, apellido_materno, nombre_comercial, razon_social, direccion, nombre_contacto, telefono, vendedor, estado, condicion_venta, moneda,correo, direccion_entrega, ag_retencion,ubigeo } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO clientes (tipo_documento, ruc, tipo_persona, nombres, apellido_paterno, apellido_materno,
       nombre_comercial, razon_social, direccion, nombre_contacto, telefono, vendedor, estado, condicion_venta, moneda, correo, direccion_entrega, ag_retencion, ubigeo ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING * `,
      [tipo_documento, ruc, tipo_persona, nombres, apellido_paterno, apellido_materno, nombre_comercial, razon_social, direccion, nombre_contacto, telefono, vendedor, estado, condicion_venta, moneda,correo, direccion_entrega, ag_retencion,ubigeo]
    );
    res.json({
      message: 'clientes creado',
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

router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo_documento, ruc, tipo_persona, nombres, apellido_paterno, apellido_materno, nombre_comercial, razon_social, direccion, nombre_contacto, telefono, vendedor, estado, condicion_venta, moneda,correo, direccion_entrega, ag_retencion,ubigeo  } = req.body;

  try {
    await pool.query(
      `
      UPDATE clientes
      SET tipo_documento=$1, ruc=$2, tipo_persona=$3, nombres=$4, apellido_paterno=$5, apellido_materno=$6,
       nombre_comercial=$7, razon_social=$8, direccion=$9, nombre_contacto=$10, telefono=$11, vendedor=$12, estado=$13, condicion_venta=$14, moneda=$15, correo=$16, direccion_entrega=$17, ag_retencion=$18, ubigeo=$19
      WHERE id = $20
      `,
      [tipo_documento, ruc, tipo_persona, nombres, apellido_paterno, apellido_materno, nombre_comercial, razon_social, direccion, nombre_contacto, telefono, vendedor, estado, condicion_venta, moneda,correo, direccion_entrega, ag_retencion,ubigeo, id]
    );

    res.json({
      message: 'Cliente actualizado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error actualizando'
    });
  }

});
module.exports = router;