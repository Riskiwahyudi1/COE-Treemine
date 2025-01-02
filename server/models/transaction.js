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
                    ref: 'Products',
                    required: false,
                },
                quantity: {
                    type: Number,
                    required: false,
                },
            }],
            costom_prototype: [{
                id_request_costom: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'RequestCustomPrototype',
                    required: false,
                },
                quantity: {
                    type: Number,
                    required: false,
                },
            }],
            costom_assembly: [{
                id_request_costom: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'RequestCustomAssembly',
                    required: false,
                },
                quantity: {
                    type: Number,
                    required: false,
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
            delivery_receipt: {
                type: String,
                required: false,
            },
        },
    ],
    total_payment: {
        type: Number,
        required: true,
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
