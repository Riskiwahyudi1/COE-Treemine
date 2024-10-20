const mongoose = require('mongoose')

const Cart = mongoose.model('Cart', {
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    id_Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
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

module.exports = Cart