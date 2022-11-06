const { registerUser, loginUser } = require('../controllers/userControllers');
const router = require('express').Router();

//POST register 
router.post('/register', registerUser);

//POST login 
router.post('/login', loginUser);

module.exports = router;