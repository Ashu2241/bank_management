const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const bankSchema = require('../model/bankSchema');

module.exports = {
    bankCreate: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const bankData = new bankSchema(req.body);
        try {
            const isBankExist = await bankSchema.findOne({
                bankEmail: req.body.bankEmail,
            });
            if (isBankExist) {
                res.status(409).json ({
                    success: false,
                    message: 'Bank is already registered.'
                });
            }
            else {
                const filePath = `/upload/bankLogos/${req.file.filename}`;
                bankData.bankLogo = filePath;
                const encryptPassword = await bcrypt.hash(req.body.bankPassword, salt);
                bankData.bankPassword = encryptPassword;
                await bankData.save();
                res.status(201).json ({
                    success: true,
                    message: 'Bank registered successfully.',
                    createdBank: bankData
                })
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }, 

    bankLogin: async (req, res) => {
        try {
            const bankData = await bankSchema.findOne({
                bankEmail: req.body.bankEmail,
            });
            const hashPassword = await bcrypt.compare(
                req.body.bankPassword,
                bankData.bankPassword
            );
            if (bankData && hashPassword) {
                const token = await jwt.sign(
                    { bankId: bankData._id }, 
                    process.env.SECRET_KEY,  
                    { expiresIn: '4h' }
                );
                res.status(200).json ({
                    success: true,
                    message: 'Bank login successfully.',
                    accessToken: token
                });
            }
            else {
                res.status(401).json ({
                    success: false,
                    message: 'Email or Password are invalid.'
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

    getAllCustomer: async (req, res) => {
        try {
            const bankData = await bankSchema.aggregate([
                {
                    $lookup: {
                        from: 'users', 
                        localField: '_id', 
                        foreignField: 'bankId', 
                        as: 'customerDetails',
                    },
                },
                {
                    $project: {
                        _id: 0, 
                        bankName: 1, 
                        bankEmail: 1,
                        customerDetails: {
                            userFullName: 1, 
                            userEmail: 1, 
                            userPhone: 1, 
                        }, 
                    }, 
                }, 
            ]);
            res.status(200).json({
                success: true, 
                message: 'Customer data fetch successfully.', 
                customerData: bankData
            });
        }
        catch (error) {
            res.status(500).json ({
                success: false,
                message: error.message
            });
        }
    }
}
