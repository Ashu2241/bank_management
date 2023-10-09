const express = require('express');

const bank = require('../controller/bankController');
const { bankLogoImage } = require('../middleware/bankLogoUpload');
const { tokenAuthentication } = require('../middleware/authToken');

const router = express.Router();

router.post('/create', bankLogoImage.single('bankLogo'), bank.bankCreate);
router.post('/login', bank.bankLogin);
router.get('/customerDetails', tokenAuthentication, bank.getAllCustomer);

module.exports = router;
