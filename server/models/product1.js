const mongoose = require('mongoose')

const Products = mongoose.model('Products', {

    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
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
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    spesification: {
        x_out: String,
        panel_requirement: String,
        length: Number,
        width: Number,
        board_type: String,
        solder_mask: String,
        material: String
    },
   picture: {
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