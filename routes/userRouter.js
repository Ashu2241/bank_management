const express = require('express');

const user = require('../controller/userController');
const { userImageUpload } = require('../middleware/userImageUpload');
const { tokenAuthentication } = require('../middleware/authToken');

const router = express.Router();

router.post('/create/:id', userImageUpload.single('userImage'), user.createUser);
router.post('/login', user.userLogin);
router.get('/transactionDetails', tokenAuthentication, user.transactionDetails);

module.exports = router;
