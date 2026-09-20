const express = require('express');
const router = express.Router();
const pool = require('../db');

// OBTENER PRODUCTOS
router.get('/productos', async (req, res) => {

  try {
    const result = await pool.query(
      `SELECT p.codigo, p.descripcion, l.descripcion as linea, s.descripcion as sublinea, p.unidad_medida
       FROM productos p left join linea l on l.codigo=p.linea left join sublinea s on s.codigo=p.sublinea`
    );
    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error productos'
    });
  }

});

router.get('/productos/consultastock', async (req, res) => {

  try {
    const result = await pool.query(
      `SELECT p.codigo, p.descripcion, p.unidad_medida, c.descripcion as color, p.peso, s.stock_disponible
       FROM productos p left join stock_productos s on p.codigo=s.producto
       left join color c on c.codigo=p.color`
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

  const {
    naturaleza,
    linea,
    sublinea,
    descripcion,
    unidad_medida,
    color,
    peso,
    codigo_barras,
    numero_serie,
    numero_lote,
    codigo_sunat,
    codigo_gtin,
    principio,
    marca,
    procedencia,
    fecha_vencimiento,
    proveedor,
    estado
  } = req.body;

  const client = await pool.connect();

  try {

    // ==========================================
    // VALIDACIONES
    // ==========================================

    if (!naturaleza || !linea || !sublinea) {
      return res.status(400).json({
        message: 'Naturaleza, línea y sublínea son obligatorias'
      });
    }

    // Deben tener exactamente 2 dígitos
    const codigoDosDigitos = /^\d{2}$/;

    if (
      !codigoDosDigitos.test(naturaleza) ||
      !codigoDosDigitos.test(linea) ||
      !codigoDosDigitos.test(sublinea)
    ) {
      return res.status(400).json({
        message: 'Naturaleza, línea y sublínea deben tener 2 dígitos'
      });
    }

    // ==========================================
    // INICIAR TRANSACCIÓN
    // ==========================================

    await client.query('BEGIN');

    // ==========================================
    // PREFIJO
    // ==========================================

    // Ejemplo:
    // naturaleza = 01
    // linea      = 03
    // sublinea   = 07
    //
    // prefijo = 010307

    const prefijo = `${naturaleza}${linea}${sublinea}`;

    // ==========================================
    // BLOQUEO PARA EVITAR DUPLICADOS
    // ==========================================
    //
    // Si dos usuarios crean al mismo tiempo un producto
    // con la misma naturaleza/línea/sublínea, este bloqueo
    // hace que se genere un correlativo diferente para cada uno.
    //

    await client.query(
      `SELECT pg_advisory_xact_lock(hashtext($1))`,
      [prefijo]
    );

    // ==========================================
    // OBTENER ÚLTIMO CORRELATIVO
    // DIRECTAMENTE DESDE productos
    // ==========================================

    const correlativoResult = await client.query(
      `
      SELECT COALESCE(
        MAX(CAST(RIGHT(codigo, 4) AS INTEGER)),
        0
      ) AS ultimo

      FROM productos

      WHERE naturaleza = $1
        AND linea = $2
        AND sublinea = $3

        -- Solo considerar códigos nuevos de 10 dígitos
        AND codigo ~ '^[0-9]{10}$'

        -- Verificar que los primeros 6 dígitos
        -- correspondan a naturaleza + linea + sublinea
        AND LEFT(codigo, 6) = $1 || $2 || $3
      `,
      [naturaleza, linea, sublinea]
    );

    const ultimo = Number(correlativoResult.rows[0].ultimo);

    console.log(
      `Último correlativo para ${prefijo}:`,
      ultimo
    );

    // ==========================================
    // SIGUIENTE CORRELATIVO
    // ==========================================

    const correlativo = ultimo + 1;

    // ==========================================
    // VALIDAR LÍMITE
    // ==========================================

    if (correlativo > 9999) {

      await client.query('ROLLBACK');

      return res.status(400).json({
        message:
          `Se alcanzó el límite de 9999 productos para ${prefijo}`
      });
    }

    // ==========================================
    // GENERAR CÓDIGO
    // ==========================================

    const codigo =
      `${prefijo}${String(correlativo).padStart(4, '0')}`;

    console.log('Código generado:', codigo);

    // ==========================================
    // INSERTAR PRODUCTO
    // ==========================================

    const result = await client.query(
      `
      INSERT INTO productos (
        naturaleza,
        linea,
        sublinea,
        codigo,
        descripcion,
        unidad_medida,
        color,
        peso,
        codigo_barras,
        numero_serie,
        numero_lote,
        codigo_sunat,
        codigo_gtin,
        principio,
        marca,
        procedencia,
        fecha_vencimiento,
        proveedor,
        estado
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19
      )
      RETURNING *
      `,
      [
        naturaleza,
        linea,
        sublinea,
        codigo,
        descripcion,
        unidad_medida,
        color,
        peso,
        codigo_barras,
        numero_serie,
        numero_lote,
        codigo_sunat,
        codigo_gtin,
        principio,
        marca,
        procedencia,
        fecha_vencimiento,
        proveedor,
        estado
      ]
    );

    // ==========================================
    // CONFIRMAR TRANSACCIÓN
    // ==========================================

    await client.query('COMMIT');

    // ==========================================
    // RESPUESTA
    // ==========================================

    res.json({
      message: 'Producto creado',
      data: result.rows[0]
    });

  } catch (error) {

    // ==========================================
    // ROLLBACK
    // ==========================================

    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Error en rollback:', rollbackError);
    }

    console.error(error);

    // ==========================================
    // UNIQUE
    // ==========================================

    if (error.code === '23505') {
      return res.status(400).json({
        message: 'El código generado ya existe'
      });
    }

    // ==========================================
    // CHECK
    // ==========================================

    if (error.code === '23514') {
      return res.status(400).json({
        message: 'El código no cumple con las restricciones'
      });
    }

    res.status(500).json({
      message: 'Error interno del servidor'
    });

  } finally {

    client.release();

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
  const id = Number(req.params.id);
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