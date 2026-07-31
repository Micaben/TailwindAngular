const pool = require('../../db');

const tablasPermitidas = [
    'color',
    'linea',
    'sublinea',
    'marca',
    'categoria',
    'vendedor',
    'condicion',
    'unidad_medida'
];

async function getNextCode(tabla) {

    if (!tablasPermitidas.includes(tabla)) {
        throw new Error('Tabla no permitida');
    }

    const sql = `
        SELECT LPAD((COALESCE(MAX(codigo::INT),0)+1)::TEXT, 2, '0' ) codigo
        FROM ${tabla}
    `;

    const result = await pool.query(sql);
    return result.rows[0].codigo;
}

module.exports = { getNextCode };