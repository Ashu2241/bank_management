const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const userSchema = require('../model/userSchema');

module.exports = {
    createUser: async (req, res) => {
        try {
            const bankId = req.params.id;
            const salt = await bcrypt.genSalt(10);
            const userData = new userSchema(req.body);
            const isUserExist = await userSchema.findOne({
                userEmail: req.body.userEmail,
            });
            if (isUserExist) {
                res.status(409).json ({
                    success: false,
                    message: "User is already registered."
                });
            }
            else {
                userData.bankId = bankId;
                const filePath = `/upload/userImages/${req.file.filename}`;
                userData.userImage = filePath;
                const encryptedPassword = await bcrypt.hash(req.body.userPassword, salt);
                userData.userPassword = encryptedPassword;
                await userData.save();
                res.status(201).json ({
                    success: true,
                    message: "User's account created succcessfully.",
                    createdAccount: userData
                });
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }, 

    userLogin: async (req, res) => {
        try {
            const userData = await userSchema.findOne({
                userEmail: req.body.userEmail,
            });
            const hashPassword = await bcrypt.compare(
                req.body.userPassword,
                userData.userPassword
            );
            if (userData && hashPassword) {
                const token = await jwt.sign(
                    { userId: userData._id }, 
                    process.env.SECRET_KEY, 
                    { expiresIn: '4h' }
                );
                res.status(200).json ({
                    success: true,
                    message: 'User login successfully',
                    accessToken: token
                });
            }
            else {
                res.status(401).json ({
                    success: false,
                    message: 'Email or password is invalid.'
                });
            }
        }
        catch (error) {
            res.status(500).json ({
                success: false,
                message: error.message
            });
        }
    }, 

    transactionDetails: async (req, res) => {
        try {
            const transactionData = await userSchema.aggregate ([
                {
                    $lookup: {
                        from: 'transactions', 
                        localField: '_id', 
                        foreignField: 'senderId', 
                        as: 'transactionDetails'
                    }, 
                }, 
            ]);
            res.status(200).json ({
                success: true, 
                message: 'Transaction data fetch successfully.', 
                transactionData: transactionData
            });
        }
        catch (error) {
            res.status(500).json ({
                success: false, 
                message: error.message
            });
        }
    }, 
};
