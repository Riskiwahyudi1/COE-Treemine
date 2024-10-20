const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Products = require('./models/product');
const registerRoutes = require('./routes/buyer/register');
const verifyRoutes = require('./routes/buyer/verify');
const loginRoute = require('./routes/buyer/login');
const dashbord = require('./routes/buyer/dashbord');


const app = express();
const port = 5000;

const JWT_SECRET = 'your-secret-key';

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
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

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

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

