const mongoose = require('mongoose')

const Transaction = mongoose.model('transaction', {
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    item: {
        id_Product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' 
        },
        quantity: Number,
        isCostom: Boolean,
        request_costom_product_Id: null
    },
    status: String,
    quantity: Number,
    shiping_cost: Number,
    transaction_cost: Number,
    create_at: {
        type: Date, 
        default: Date.now
   },
   update_at: {
        type: Date, 
        default: Date.now
   }
   
})

module.exports = Transaction