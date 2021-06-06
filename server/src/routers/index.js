const express = require('express');
const router = express.Router();

//Middlewares
const { authToken } = require('../middlewares/authMiddleware');
const { uploadFile } = require('../middlewares/uploadFile');
//Auth
const { register, login } = require('../controllers/auth');
router.post('/register', register);
router.post('/login', login);

const { profile, checkAuth, editProfile } = require('../controllers/user');

// router.post("/user", createUser);
// router.delete("/user/:id", deleteUser);
router.patch("/edit-profile", uploadFile("imageFile"), authToken, editProfile);
router.get("/profile", authToken, profile);
router.get("/check-auth", authToken, checkAuth);

const { createFilm, getFilms, filmDetails } = require('../controllers/film');

router.post("/film", uploadFile("imageFile"), createFilm);
router.get("/films", getFilms);
router.get("/film/:id", filmDetails);

const { createTransaction, getUserTransactions, getTransactions, approvePurchase, cancelPurchase, getMyFilms, getMySelectedFilm } = require('../controllers/transaction');
router.post("/buy/:id2", uploadFile("imageFile"),  authToken, createTransaction);
router.get("/user-purchase", authToken, getUserTransactions);
router.get("/my-films", authToken, getMyFilms);
router.get("/my-films/:id2", authToken, getMySelectedFilm);
router.get("/transactions", getTransactions);
router.patch("/approve/:id", approvePurchase);
router.patch("/cancel/:id", cancelPurchase);

const { createWishlist, toggleWishlist, getWishes, getMyWishes } = require('../controllers/wishlist');
router.post("/add-wishlist/:id2", authToken, createWishlist);
router.delete("/toggle-wishlist/:id", toggleWishlist);
router.get("/get-wishes/:id2", authToken, getWishes);
router.get("/my-wishlist/:id", authToken, getMyWishes);

module.exports = router;