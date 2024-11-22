const mongoose = require('mongoose')

const Categories = mongoose.model('Categories', {
    
    category_name: {
        type: String,
        required: true, 
    },
    picture_url: {
        type: String,
        require: true
   },
})

module.exports = Categories