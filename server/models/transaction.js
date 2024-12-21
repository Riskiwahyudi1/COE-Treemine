const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    product: [
        {
            standart :[{
                id_product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: false,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            }],
            costom_prototype: [{
                id_request_prototype: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'RequestCustomPrototype',
                    required: false,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            }],
            
        },
    ],
    status: {
        type: String,
        required: true,
    },
    expedition: [
        {
            courier: {
                type: String,
                required: true,
            },
            shipping_option: {
                type: String,
                required: true,
            },
            shipping_cost: {
                type: Number,
                required: true,
            },
        },
    ],
    total_payment: {
        type: Number,
        required: true,
    },
    user_notes: {
        type: String,
        required: false, 
    },
    estimated_delivery: {
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

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
