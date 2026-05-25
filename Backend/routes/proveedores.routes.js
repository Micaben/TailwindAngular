const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/proveedor', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proveedores order by ruc asc');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error proveedores' });
  }
});

router.post('/proveedor', async (req, res) => {
  const { tipo_documento, ruc, tipo_persona, nombres, apellido_paterno, apellido_materno, nombre_comercial, razon_social, direccion, nombre_contacto, telefono, pais, estado } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO proveedores (tipo_documento, ruc, tipo_persona, nombres, apellido_paterno, apellido_materno,
       nombre_comercial, razon_social, direccion, nombre_contacto, telefono, pais, estado ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING * `,
      [tipo_documento, ruc, tipo_persona, nombres, apellido_paterno, apellido_materno, nombre_comercial, razon_social, direccion, nombre_contacto, telefono, pais, estado]
    );
    res.json({
      message: 'proveedores creado',
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

router.put('/proveedor/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo_documento, tipo_persona, nombres, apellido_paterno, apellido_materno, nombre_comercial, razon_social, direccion, nombre_contacto, telefono, pais, estado  } = req.body;

  try {
    await pool.query(
      `
      UPDATE proveedores
      SET tipo_documento=$1, tipo_persona=$2, nombres=$3, apellido_paterno=$4, apellido_materno=$5, nombre_comercial=$6,
      razon_social=$7, direccion=$8 , nombre_contacto=$9 , telefono= $10, pais=$11, estado=$12
      WHERE id = $13
      `,
      [tipo_documento, tipo_persona, nombres, apellido_paterno, apellido_materno, nombre_comercial, razon_social, direccion, nombre_contacto, telefono, pais, estado, id]
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