const mongoose = require('mongoose');

const Cart = mongoose.model('Cart', {
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    id_product: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    create_at: {
        type: Date, 
        default: Date.now
   },
   update_at: {
        type: Date, 
        default: Date.now
   }
});


module.exports = Cart;
