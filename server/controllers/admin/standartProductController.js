const Product = require('../../models/product')
const multer = require('multer');

// add new product

// foto poduct
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/product-picture'); // Folder untuk menyimpan file
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { product_name, id_category, harga, stock, description } = req.body;
        const image = req.file;

        console.log('Request Body:', req.body);
        console.log('Uploaded File:', image);

        // Data produk yang akan disimpan ke database
        const newProduct = {
            product_name,
            id_category,
            harga,
            stock,
            description,
            picture_url: `/product-picture/${image.filename}`,
        };

        // Simpan data produk ke MongoDB
        const savedProduct = await Product.create(newProduct);

        res.status(201).json({
            message: 'Product added successfully',
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// show Product
const showProduct = async (req, res) => {
    try {
        const products = await Product.find().populate('id_category', 'nama')
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "products not found!" });
        }
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

// delete product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            return res.status(404).json({message : 'Product id not found!'})
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete producttt' });
    }
}

module.exports = {
    addProduct,
    showProduct, 
    deleteProduct, 
    upload
};