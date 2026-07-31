const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado'
    });

  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }

  try {

    const payload = jwt.verify( token, SECRET );
    req.user = payload;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token expirado o inválido'
    });
  }

}

module.exports = authMiddleware;