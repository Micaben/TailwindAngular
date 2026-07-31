const bcrypt = require('bcryptjs');
const pool = require('./db');

async function resetPassword() {
//para actualizar contraña de un usuario en la base de datos, se debe cambiar el email y
//  la nueva contraseña en las variables email y nuevaPassword respectivamente.
//borrar en produccion
  const email = 'admin@gmail.com';

  const nuevaPassword = 'Admin123';

  const hash = await bcrypt.hash(nuevaPassword, 10);

  await pool.query(
    `UPDATE users
     SET password = $1
     WHERE email = $2`,
    [hash, email]
  );

  console.log('Contraseña actualizada');

  process.exit();
}

resetPassword();