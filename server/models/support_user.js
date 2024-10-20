const mongoose = require('mongoose')

const Support_User = mongoose.model('Products', {
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    support_type: String,
    message: String,
    status: String,
    create_at: {
        type: Date, 
        default: Date.now
   },
   update_at: {
        type: Date, 
        default: Date.now
   }
   
})

module.exports = Support_User