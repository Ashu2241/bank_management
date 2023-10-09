const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
    bankLogo: {
        type: String,
    },
    bankName: {
        type: String,
        unique: true,
        require: true
    },
    bankEmail: {
        type: String,
        unique: true,
        require: true
    },
    bankPassword: {
        type: String,
        require: true
    },
    bankPhone: {
        type: Number,
        unique: true,
        require: true
    },
    bankCity: {
        type: String,
        require: true
    },
    bankState: {
        type: String,
        require: true
    },
    bankFullAddress: {
        type: String,
        require: true
    },
    bankCountry: {
        type: String,
        require: true
    },
    bankPostalCode: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

bankSchema.set('timestamps', true);
module.exports = mongoose.model('bank', bankSchema);
