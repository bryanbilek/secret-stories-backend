//bring in controllers
const router = require('express').Router();

//POST login 
router.post('/', registerUser);

//POST register 
router.post('/', loginUser);

module.exports = router;