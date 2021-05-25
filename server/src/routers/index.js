const express = require('express');
const router = express.Router();

//Middlewares
const { authToken } = require('../middlewares/authMiddleware');
const { uploadFile } = require('../middlewares/uploadFile');
//Auth
const { register, login } = require('../controllers/auth');
router.post('/register', register);
router.post('/login', login);

const { profile } = require('../controllers/user');

// router.post("/user", createUser);
// router.delete("/user/:id", deleteUser);
// router.get("/users", authToken, getUsers);
router.get("/profile", authToken, profile);

const { createFilm, getFilms, filmDetails } = require('../controllers/film');
router.post("/film", uploadFile("imageFile"), createFilm);
router.get("/films", getFilms);
router.get("/film/:id", filmDetails);

module.exports = router;