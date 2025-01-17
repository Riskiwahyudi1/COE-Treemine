const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true, 
    },
    transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true,
    },
    payment_method: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true, 
    },
    amount: {
        type: Number,
        required: true,
    },
    transaction_time: {
        type: Date,
        required: true,
    },
    payment_url: {
        type: String, // URL untuk redirect ke halaman pembayaran
        required: false,
    },
    snap_token: {
        type: String, 
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
