const pool = require('../db');

class LoginRepository {

  async buscarPorEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }
}

module.exports = new LoginRepository();