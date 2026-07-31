const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRepository = require('../repositories/login.repository');
const SECRET = process.env.JWT_SECRET;

class LoginService {

    async login(email, password) {
        const user = await loginRepository.buscarPorEmail(email);
        const error = new Error('Usuario no existe');
        const error2 = new Error('Contraseña incorrecta');

        if (!user) {
            error.status = 401;
            throw error;
        }

        const valido = await bcrypt.compare( password, user.password );

        if (!valido) {
            error2.status = 401;
            throw error2;
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            SECRET,
            {
                expiresIn: '1h'
            }
        );

        return {
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                direccion: user.direccion,
                telefono: user.telefono
            }
        };
    }

}

module.exports = new LoginService();