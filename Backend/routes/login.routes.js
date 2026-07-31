const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const loginController = require('../controllers/login.controller');

router.post('/login', asyncHandler(loginController.login));

module.exports = router;