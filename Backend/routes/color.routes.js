const express = require('express');
const router = express.Router();
const colorController = require('../controllers/color.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/color', asyncHandler(colorController.getAll));
router.post('/color', authMiddleware, asyncHandler(colorController.create));
router.put('/color/:id', authMiddleware, asyncHandler(colorController.update));

module.exports = router;