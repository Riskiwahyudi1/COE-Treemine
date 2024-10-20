const mongoose = require('mongoose')

const Payment = mongoose.model('Payment', {
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    id_transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction' 
    },
    payment_method: String,
    payment_amount: Number,
    payment_status: String,
    payment_Date:{
        type: Date, 
        default: Date.now
    },
    create_at: {
        type: Date, 
        default: Date.now
   },
   update_at: {
        type: Date, 
        default: Date.now
   }
})

module.exports = Payment