const express = require('express');

const bank = require('./bankRouter');
const user = require('./userRouter');
const transaction = require('./transactionRouter');

const mainRouter = express.Router();

mainRouter.use('/bank', bank);
mainRouter.use('/user', user);
mainRouter.use('/transaction', transaction);

module.exports = mainRouter;
