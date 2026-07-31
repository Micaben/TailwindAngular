const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/vendedor.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/vendedor', asyncHandler(vendedorController.getAll));
router.post('/vendedor', authMiddleware, asyncHandler(vendedorController.create));
router.put('/vendedor/:id', authMiddleware, asyncHandler(vendedorController.update));

module.exports = router;