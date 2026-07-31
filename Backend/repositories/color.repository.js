const pool = require('../db');
const nextCodeRepository = require('./helpers/next-code.repository');

class ColorRepository {

  async getAll() {
    const result = await pool.query(
      `SELECT * FROM color ORDER BY codigo ASC `
    );
    return result.rows;
  }

  async create(color) {
    const codigo = await nextCodeRepository.getNextCode('color');
    const result = await pool.query(
      ` INSERT INTO color ( codigo, descripcion ) VALUES ($1, $2 ) RETURNING * `,
      [
        codigo,
        color.descripcion
      ]
    );
    return result.rows[0];
  }


  async update(id, color) {
    const { descripcion } = color;
    await pool.query(
      `UPDATE color SET descripcion=$1 WHERE id=$2`,
      [descripcion, id]
    );
  }

}

module.exports = new ColorRepository();