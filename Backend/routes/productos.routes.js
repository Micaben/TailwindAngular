const express = require('express');
const router = express.Router();
const pool = require('../db');

// OBTENER PRODUCTOS
router.get('/productos', async (req, res) => {

  try {
    const result = await pool.query(
      'SELECT * FROM productos'
    );
    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error productos'
    });
  }

});

router.post('/productos', async (req, res) => {
  const { naturaleza, linea, sublinea, codigo, descripcion, unidad_medida, color, peso, codigo_barras, numero_serie, numero_lote, codigo_sunat, codigo_gtin, principio, marca, procedencia, fecha_vencimiento, proveedor, estado } = req.body;
  try {
    await pool.query(
      `INSERT INTO productos (naturaleza, linea, sublinea, codigo, descripcion, unidad_medida, color, peso, codigo_barras, numero_serie, numero_lote, codigo_sunat, codigo_gtin, principio, marca, procedencia, 
      fecha_vencimiento, proveedor, estado ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING * `,
      [naturaleza, linea, sublinea, codigo, descripcion, unidad_medida, color, peso, codigo_barras, numero_serie, numero_lote, codigo_sunat, codigo_gtin, principio, marca, procedencia, fecha_vencimiento, proveedor, estado]
    );
    res.json({
      message: 'productos creado',
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

// CAMBIAR ESTADO
router.put('/productos/toggle-estado/:id', async (req, res) => {

  const { id } = req.params;
  try {
    // estado actual
    const result = await pool.query(
      'SELECT estado FROM productos WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Producto no existe'
      });
    }

    const actual = result.rows[0].estado;
    // invertir
    const nuevoEstado = !actual;
    // actualizar
    await pool.query(
      'UPDATE productos SET estado = $1 WHERE id = $2',
      [nuevoEstado, id]
    );

    res.json({
      message: 'Estado actualizado',
      estado: nuevoEstado
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al cambiar estado'
    });
  }
});

router.put('/productos/:id', async (req, res) => {
  const  id  = Number(req.params.id);
  const { naturaleza, linea, sublinea, codigo, descripcion, unidad_medida, color, peso, codigo_barras, numero_serie, numero_lote, codigo_sunat, codigo_gtin, principio, marca, procedencia, fecha_vencimiento, proveedor, estado } = req.body;
  try {
    await pool.query(
      `
      UPDATE productos
      SET naturaleza=$1, linea=$2, sublinea=$3, codigo=$4, descripcion=$5, unidad_medida=$6, color=$7, peso=$8, 
      codigo_barras=$9, numero_serie= $10, numero_lote=$11, codigo_sunat=$12, codigo_gtin=$13, principio=$14, marca=$15, procedencia=$16, fecha_vencimiento=$17, proveedor=$18, estado=$19 
      WHERE id = $20
      `,
      [naturaleza, linea, sublinea, codigo, descripcion, unidad_medida, color, peso, codigo_barras, numero_serie, numero_lote, codigo_sunat, codigo_gtin, principio, marca, procedencia, fecha_vencimiento, proveedor, estado, id]
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