const express = require('express');

const transaction = require('../controller/transactionController');
const { tokenAuthentication } = require('../middleware/authToken');

const router = express.Router();

router.post('/transaction/:id', transaction.userTransaction);

module.exports = router;
