const pool = require('../db');
const ESTADO = 'P';
const TIPO_INGRESO = 'I';
const PORC_IGV = '18';
const stockService = require('../services/stock.service');
const seriesService = require('../services/series.service');

class IngresosRepository {

  async create(documento) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // CABECERA
      const cabeceraResult = await client.query(
        ` INSERT INTO mov_almacen_cab
        (
          serie, numero, fecha_registro, concepto, ocompra, moneda, proveedor, fecha_compra, 
          guia_remision, doc_referencia, doc_referencia_numero, almacen, referencia, valor_total,
          estado, base_imp, igv, total, tipo
        )
        VALUES
        (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
        )
        RETURNING id
        `,
        [
          documento.serie,
          documento.numero,
          documento.fecha,
          documento.tipo_operacion,
          documento.ocompra,
          documento.moneda,
          documento.ruc,
          documento.fecha_compra,
          documento.guia_remision,
          documento.documento_referencia,
          documento.serie_numero,
          documento.almacen,
          documento.referencia,
          documento.subtotal,
          ESTADO,
          documento.subtotal,
          documento.igv,
          documento.total,
          TIPO_INGRESO
        ]
      );

      const ingresoId = cabeceraResult.rows[0].id;

      // DETALLES
      for (const item of documento.detalles) {

        await client.query(
          ` INSERT INTO mov_almacen_det
          (
            id_cabecera, tipo, item, producto, almacen, unidad, cantidad, precio, total_bruto, total_neto, porc_igv
          )
          VALUES
          (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
          )
          `,
          [
            ingresoId,
            TIPO_INGRESO,
            item.item,
            item.codigo,
            documento.almacen,
            item.unidad_medida,
            item.cantidad,
            item.precio,
            item.total,
            item.total_neto,
            PORC_IGV
          ]
        );
        await stockService.incrementarStock(
          client, item.codigo, documento.almacen, item.cantidad);
      }

      await seriesService.incrementarSerie(
        client, documento.serie, '21');
      await client.query('COMMIT');
      console.log('INGRESO ID', ingresoId);
      return {
        id: ingresoId
      };
    } catch (error) {
      console.error('ERROR REPOSITORY:', error);
      console.error(error.stack);

      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id, documento) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // CABECERA
      await client.query(
        `
      UPDATE mov_almacen_cab
      SET
        fecha_registro = $1,
        concepto = $2,
        ocompra = $3,
        moneda = $4,
        proveedor = $5,
        fecha_compra = $6,
        guia_remision = $7,
        doc_referencia = $8,
        doc_referencia_numero = $9,
        almacen = $10,
        referencia = $11,
        valor_total = $12,
        base_imp = $13,
        igv = $14,
        total = $15
      WHERE id = $16
      `,
        [
          documento.fecha,
          documento.tipo_operacion,
          documento.ocompra,
          documento.moneda,
          documento.ruc,
          documento.fecha_compra,
          documento.guia_remision,
          documento.documento_referencia,
          documento.serie_numero,
          documento.almacen,
          documento.referencia,
          documento.subtotal,
          documento.subtotal,
          documento.igv,
          documento.total,
          id
        ]
      );

      // ELIMINAR DETALLES
      await client.query(
        ` DELETE FROM mov_almacen_det WHERE id_cabecera = $1 AND tipo = $2 `,
        [
          id,
          TIPO_INGRESO
        ]
      );

      // INSERTAR NUEVOS DETALLES
      let itemNro = 1;
      for (const item of documento.detalles) {
        await client.query(
          `
        INSERT INTO mov_almacen_det
        (
          id_cabecera,
          tipo,
          item,
          producto,
          almacen,
          unidad,
          cantidad,
          precio,
          total_bruto,
          total_neto,
          porc_igv
        )
        VALUES
        (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
        )
        `,
          [
            id,
            TIPO_INGRESO,
            itemNro++,
            item.codigo,
            documento.almacen,
            item.unidad_medida,
            item.cantidad,
            item.precio,
            item.total,
            item.total,
            PORC_IGV
          ]
        );

      }

      await client.query('COMMIT');
      return {
        id
      };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async obtenerSerie() {
    const result = await pool.query(`
      SELECT serie, ultimo
      FROM series
      WHERE comprobante = '21'
    `);

    return result.rows;
  }

   async listar(mes, anio, texto) {
    const result = await pool.query(
      `
      SELECT m.id, m.serie || '-' || m.numero as documento, m.proveedor, p.razon_social, TO_CHAR(m.fecha_registro, 'DD/MM/YYYY') AS fecha,
      m.estado, TO_CHAR(m.total, 'FM999G999G990.00') AS total
      FROM mov_almacen_cab m inner join proveedores p on m.proveedor = p.ruc
       WHERE ($1::int IS NULL OR EXTRACT(MONTH FROM fecha_registro) = $1::int)
      AND
      ($2::int IS NULL OR EXTRACT(YEAR FROM fecha_registro) = $2::int)
      AND
      (
        $3::text IS NULL
        OR m.serie || '-' || m.numero::text ILIKE '%' || $3::text || '%'
        OR m.proveedor ILIKE '%' || $3::text || '%'
        OR p.razon_social ILIKE '%' || $3::text || '%'
       )
      ORDER BY fecha_registro DESC
      `,
      [
        mes || null,
        anio || null,
        texto || null
      ]
    );

    return result.rows;
  }

  async obtenerPorId(id) {
    // Cabecera
    const cabecera = await pool.query(
      `
      SELECT m.*, m.proveedor as ruc, TO_CHAR(m.fecha_registro,'YYYY-MM-DD') AS fecha,
      p.razon_social FROM mov_almacen_cab m
      LEFT JOIN proveedores p
      ON p.ruc = m.proveedor WHERE m.id = $1
      `,
      [id]
    );
    // Detalle
    const detalle = await pool.query(
      `
      SELECT m.producto as codigo, p.descripcion, m.unidad as unidad_medida, m.cantidad,
       TO_CHAR(m.precio, 'FM999G999G990.00') AS precio, TO_CHAR(m.total_bruto, 'FM999G999G990.00') AS total
      FROM mov_almacen_det m left join productos p on p.codigo = m.producto
      WHERE id_cabecera = $1
      ORDER BY item
      `,
      [id]
    );

    return {
      cabecera: cabecera.rows[0],
      detalle: detalle.rows
    };
  }

  async listarTipoOperacion() {
    const result = await pool.query(`
      SELECT *
      FROM almacen_tipo_operacion
      ORDER BY codigo ASC
    `);

    return result.rows;
  }

}

module.exports = new IngresosRepository();