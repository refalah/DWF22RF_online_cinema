const express = require('express');
const router = express.Router();

//Middlewares
const { authToken } = require('../middlewares/authMiddleware');
//const { uploadFile } = require('../middlewares/uploadFile');
//Auth
const { register, login } = require('../controllers/auth');
router.post('/register', register);
router.post('/login', login);

module.exports = router;