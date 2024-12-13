const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ 
    },
    name: {
        type: String,
        default: null
    },
    birthday: {
        type: Date,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['admin', 'buyer'], 
        default: 'buyer'
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: null
    },
    profile_picture_url: {
        type: String,
        default: null
    },
   
    address: {
        detail_address: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        province: {
            type: String,
            default: null
        },
        postal_code: {
            type: String,
            default: null
        }
    },
    isVerified: { 
        type: Boolean,
        default: false },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // 1
    const salt = await bcrypt.genSalt(10); // 2
    this.password = await bcrypt.hash(this.password, salt); // 3
    next();
});

userSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
