const Product = require('../../models/product')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// add new product

// foto poduct
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/product-picture'); // Folder untuk menyimpan foto
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
        const products = await Product.find().populate('id_category', 'category_name')
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "products not found!" });
        }
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

// Fungsi menghapus gambar
const deleteImage = (imagePath) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
};

// delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if(!deletedProduct){
            return res.status(404).json({message : 'Product id not found!'})
        }

        // hapus foto
        const imagePath = path.join(__dirname, '../../storage/product-picture', path.basename(deletedProduct.picture_url));
        await deleteImage(imagePath);
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete producttt' });
    };
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, id_category, harga, stock, description } = req.body;
        const image = req.file;

        // kelolah foto
         const existingProduct = await Product.findById(id);
         if (!existingProduct) {
             return res.status(404).json({ message: "Product not found" });
         }
         const imagePath = path.join(__dirname, '../../storage/product-picture', path.basename(existingProduct.picture_url));
         let pictureUrl = existingProduct.picture_url;
         if (image) {
            // calback delete image
            await deleteImage(imagePath);

            pictureUrl = `/product-picture/${image.filename}`;
         }

        const updateProduct = await Product.findByIdAndUpdate(id, {
            product_name,
            id_category,
            harga,
            stock,
            description,
            picture_url: pictureUrl,
        }, { new: true });

        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: 'Product Update successfully', data: updateProduct, });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete productt' });
    }
};

// endpoin update data product
const getProductById = async (req, res) => {
    const { id } = req.params; 
    try {
        const product = await Product.findById(id).populate('id_category', 'nama'); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    addProduct,
    showProduct, 
    deleteProduct, 
    updateProduct,
    getProductById,
    upload
};