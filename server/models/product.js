const mongoose = require('mongoose')

const Products = mongoose.model('Products', {
    nama: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
   
})

module.exports = Products