const express = require('express');
const router = express.Router();
const recetasController = require('../controllers/recetas.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/recetas/serie', (req, res) => {
    console.log('>>> RUTA RECETAS/SERIE EJECUTADA');
    res.json({
        ok: true,
        mensaje: 'La ruta funciona'
    });
});
module.exports = router;