const mongoose = require('mongoose')

const Products = mongoose.model('Products', {

    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    product_name: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    
    picture_url: {
        type: String,
        require: true
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

module.exports = Products