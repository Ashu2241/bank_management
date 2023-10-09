const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    userImage: {
        type: String
    },
    userFullName: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,
        unique: true,
        require: true
    },
    userPhone: {
        type: Number,
        unique: true,
        require: true
    },
    userCity: {
        type: String,
        require: true
    },
    userState: {
        type: String,
        require: true
    },
    userFullAddress: {
        type: String,
        require: true
    },
    userCountry: {
        type: String,
        require: true
    },
    userPostalCode: {
        type: Number,
        require: true
    },
    userPassword: {
        type: String,
        require: true
    },
    userBankAccountNo: {
        type: Number,
        unique: true,
        require: true
    },
    userBankWalletAddress: {
        type: Number,
        unique: true,
        require: true
    },
    userCurrentAmount: {
        type: Number,
        require: true
    },
    userTransactionLimit: {
        type: Number,
        require: true
    },
    bankId: {
        type: mongoose.Types.ObjectId,
        ref: 'bank'
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

userSchema.set('timestamps', true);
module.exports = mongoose.model('user', userSchema);
