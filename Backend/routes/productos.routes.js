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


module.exports = router;