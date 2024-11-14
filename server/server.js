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

// memanggil routes buyer
const cart = require('./routes/buyer/cart');


const app = express();
const port = 5000;

// Menghubungkan ke MongoDB
mongoose.connect('mongodb://localhost:27017/COE_Treemine-backup', {
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

// membuat folder simpan foto produk
const productPictureStorage = path.join(__dirname, 'storage/product-picture');

if (!fs.existsSync(productPictureStorage)) {
    fs.mkdirSync(productPictureStorage, { recursive: true });
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

// buyer
app.use('/add-to-cart', cart);



app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

