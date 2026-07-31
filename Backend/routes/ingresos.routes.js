const express = require('express');
const router = express.Router();
const ingresosController = require('../controllers/ingresos.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/ingresos/serie', asyncHandler(ingresosController.obtenerSerie));
router.get('/ingresos', asyncHandler(ingresosController.listar));
router.get('/ingresos/:id', asyncHandler(ingresosController.obtenerPorId));
router.get('/tipo-operacion', asyncHandler(ingresosController.listarTipoOperacion));
router.post('/ingresos', authMiddleware, asyncHandler(ingresosController.create));
router.put('/ingresos/:id', authMiddleware, asyncHandler(ingresosController.update));

module.exports = router;