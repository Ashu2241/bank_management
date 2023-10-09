const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    amountToBeSent: {
        type: Number,
        require: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

transactionSchema.set('timestamps', true);
module.exports = mongoose.model('transaction', transactionSchema);
