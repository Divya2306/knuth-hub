const express = require('express');
const { registerUser, loginUser , profileUser} = require('../controllers/userController');
const router = express.Router();
const {auth}= require('../middleware/auth');

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// User profile
router.get('/profile', auth, profileUser);

module.exports = router;
