const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs')
const mongoose = require('mongoose');
const app = express();
const port = (process.env.PORT_SERVER || 5000)
const baseUrl = (process.env.BASE_URL_SERVER || `http://localhost:${port}`)

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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/product-picture', express.static(path.join(__dirname, 'storage/product-picture')));
app.use('/api/category-picture', express.static(path.join(__dirname, 'storage/category-picture')));
app.use('/api/profile-picture', express.static(path.join(__dirname, 'storage/profile-picture')));
app.use('/api/prototype-design', express.static(path.join(__dirname, 'storage/prototype-design')));
app.use('/api/assembly-design', express.static(path.join(__dirname, 'storage/assembly-design')));


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

app.use('/api',require('./routes/index'))

// donwload file
app.get('/api/download/assembly-design/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'storage/assembly-design', fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error while serving file:', err);
            res.status(404).send('File not found.');
        }
    });
});

app.get('/api/download/prototype-design/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'storage/prototype-design', fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error while serving file:', err);
            res.status(404).send('File not found.');
        }
    });
});

app.listen(port, () => {
    console.log(`App running at ${baseUrl}`);
});
