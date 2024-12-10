const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs')
const mongoose = require('mongoose');
const Products = require('./models/product');
const registerRoutes = require('./routes/buyer/auth/register');
const verifyRoutes = require('./routes/buyer/auth/verify');
const loginRoute = require('./routes/buyer/auth/login');
const dashbord = require('./routes/buyer/dashbord');


// memanggil routes admin 
const productCategories = require('./routes/admin/categories');
const products = require('./routes/admin/product');
const costomPrototype = require('./routes/admin/costomPrototype');
const admReqCostomPrptptype = require('./routes/admin/requestCostomPrototype');

// memanggil routes buyer
const account = require('./routes/buyer/auth/accountSetting')
const cart = require('./routes/buyer/cart');
const costomPrototypeBuyer = require('./routes/buyer/costomPrototype');


// service
const rajaOngkirService = require('./routes/services/rajaOngkir')


const app = express();
const port = 5000;


mongoose.connect('mongodb://localhost:27017/COE_Treemine', {

    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err.message));

// Konfigurasi CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/product-picture', express.static(path.join(__dirname, 'storage/product-picture')));
app.use('/category-picture', express.static(path.join(__dirname, 'storage/category-picture')));


const productPictureStorage = path.join(__dirname, 'storage/product-picture');
const categoryPictureStorage = path.join(__dirname, 'storage/category-picture');

// Membuat folder untuk gambar produk 
if (!fs.existsSync(productPictureStorage)) {
    fs.mkdirSync(productPictureStorage, { recursive: true });
}

// Membuat folder untuk gambar kategori 
if (!fs.existsSync(categoryPictureStorage)) {
    fs.mkdirSync(categoryPictureStorage, { recursive: true });
}


app.get('/api/products', async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




app.use('/register/buyer', registerRoutes);
app.use('/verify', verifyRoutes);
app.use('/login/buyer', loginRoute);
app.use('/dashbord', dashbord);

// admin
app.use('/admin/product/categories', productCategories);
app.use('/admin/product', products);
app.use('/admin/costom-prototype', costomPrototype);
app.use('/admin/request-costom-prototype', admReqCostomPrptptype);

// buyer
app.use('/account', account)
app.use('/cart', cart);
app.use('/costom-prototype', costomPrototypeBuyer);

// service
app.use('/raja-ongkir', rajaOngkirService);


app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

