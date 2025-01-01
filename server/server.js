const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');




const fs = require('fs')
const mongoose = require('mongoose');
const Products = require('./models/product');
const registerRoutes = require('./routes/buyer/auth/register');
const verifyRoutes = require('./routes/buyer/auth/verify');
const loginRoute = require('./routes/buyer/auth/login');
const dashbord = require('./routes/buyer/dashbord');

// admin
const loginAdmin = require('./routes/admin/auth/login');

// memanggil routes admin 
const productCategories = require('./routes/admin/categories');
const products = require('./routes/admin/product');
const costomAssembly = require('./routes/admin/costomAssembly');
const costomPrototype = require('./routes/admin/costomPrototype');
const admReqCostomPrptptype = require('./routes/admin/requestCostomPrototype');
const admReqCostomAssembly = require('./routes/admin/requestCostomAssembly');
const transactionAdmin = require('./routes/admin/transactions');

// memanggil routes buyer
const account = require('./routes/buyer/auth/accountSetting')
const cart = require('./routes/buyer/cart');
const costomPrototypeBuyer = require('./routes/buyer/costomPrototype');
const costomAssemblyBuyer = require('./routes/buyer/costomAssembly');
const Transactions = require('./routes/buyer/transactions');

// service
const rajaOngkirService = require('./routes/services/rajaOngkir')
const paymentService = require('./routes/services/payment')


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
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/product-picture', express.static(path.join(__dirname, 'storage/product-picture')));
app.use('/category-picture', express.static(path.join(__dirname, 'storage/category-picture')));
app.use('/profile-picture', express.static(path.join(__dirname, 'storage/profile-picture')));
app.use('/prototype-design', express.static(path.join(__dirname, 'storage/prototype-design')));
app.use('/assembly-design', express.static(path.join(__dirname, 'storage/assembly-design')));


const productPictureStorage = path.join(__dirname, 'storage/product-picture');
const categoryPictureStorage = path.join(__dirname, 'storage/category-picture');
const profilePictureStorage = path.join(__dirname, 'storage/profile-picture');
const prototypeDesignStorage = path.join(__dirname, 'storage/prototype-design');
const assemblyDesignStorage = path.join(__dirname, 'storage/assembly-design');

// Membuat folder untuk gambar produk 
if (!fs.existsSync(productPictureStorage)) {
    fs.mkdirSync(productPictureStorage, { recursive: true });
}

// Membuat folder untuk gambar kategori 
if (!fs.existsSync(categoryPictureStorage)) {
    fs.mkdirSync(categoryPictureStorage, { recursive: true });
}
// Membuat folder untuk gambar profil 
if (!fs.existsSync(profilePictureStorage)) {
    fs.mkdirSync(profilePictureStorage, { recursive: true });
}
// Membuat folder untuk prototype design 
if (!fs.existsSync(prototypeDesignStorage)) {
    fs.mkdirSync(prototypeDesignStorage, { recursive: true });
}
// Membuat folder untuk prototype design 
if (!fs.existsSync(assemblyDesignStorage)) {
    fs.mkdirSync(assemblyDesignStorage, { recursive: true });
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

app.use('/admin/login', loginAdmin);



// allUser
app.use('/transaction', Transactions);


// admin
app.use('/admin/product/categories', productCategories);
app.use('/admin/product', products);
app.use('/admin/costom-prototype', costomPrototype);
app.use('/admin/costom-assembly', costomAssembly);
app.use('/admin/request-custom-prototype', admReqCostomPrptptype);
app.use('/admin/request-custom-assembly', admReqCostomAssembly);
app.use('/admin/transaction', transactionAdmin);

// buyer
app.use('/account', account)
app.use('/cart', cart);
app.use('/costom-prototype', costomPrototypeBuyer);
app.use('/costom-assembly', costomAssemblyBuyer);

// service
app.use('/raja-ongkir', rajaOngkirService);
app.use('/payments', paymentService);


app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

