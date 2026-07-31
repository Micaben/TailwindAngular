const pool = require('../db');
const nextCodeRepository = require('./helpers/next-code.repository');

class VendedorRepository {

  async getAll() {
    const result = await pool.query(
      `SELECT * FROM vendedor ORDER BY codigo ASC `
    );
    return result.rows;
  }

  async create(vendedor) {
    const codigo = await nextCodeRepository.getNextCode('vendedor');
    const result = await pool.query(
      ` INSERT INTO vendedor (codigo, nombres, direccion, telefono, correo, estado, dni, empresa) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * `,
      [
        codigo,
        vendedor.nombres, vendedor.direccion, vendedor.telefono, vendedor.correo, vendedor.estado, vendedor.dni,
         vendedor.empresa
      ]
    );
    return result.rows[0];
  }


  async update(id, vendedor) {
    const { nombres, direccion, telefono, correo, estado, dni } = vendedor;
    await pool.query(
      `UPDATE vendedor SET nombres = $1, direccion = $2, telefono = $3, correo = $4, estado=$5, dni=$6 WHERE id = $7`,
       [nombres, direccion, telefono, correo, estado, dni, id]
    );
  }

}

module.exports = new VendedorRepository();