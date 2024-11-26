const Categories = require('../../models/categories');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


// foto  lokasi kategori
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/category-picture');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const addCategories = async (req, res) => {
    try {
        const { category_name } = req.body;
        const image = req.file;

        const newProduct = {
            category_name,
            picture_url: `/category-picture/${image.filename}`,
        };

        const savedProduct = await Categories.create(newProduct);

        res.status(201).json({
            message: 'categori added successfully',
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error adding categori:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// / Fungsi menghapus gambar
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
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Categories.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product id not found!' })
        }

        // hapus foto
        const imagePath = path.join(__dirname, '../../storage/category-picture', path.basename(deletedProduct.picture_url));
        await deleteImage(imagePath);
        res.status(200).json({ message: 'Category deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete producttt' });
    };
};

const showCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        if (!categories || categories.length === 0) {
            return res.status(401).json({ message: "Categories not found!" });
        }
        res.json(categories);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    };
};

// Update Product
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name } = req.body;
        const image = req.file;

        // kelolah foto
        const existingProduct = await Categories.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Caategory not found" });
        }
        const imagePath = path.join(__dirname, '../../storage/category-picture', path.basename(existingProduct.picture_url));
        let pictureUrl = existingProduct.picture_url;
        if (image) {
            // calback delete image
            await deleteImage(imagePath);

            pictureUrl = `/category-picture/${image.filename}`;
        }

        const updateProduct = await Categories.findByIdAndUpdate(id, {
            category_name,
            picture_url: pictureUrl,
        }, { new: true });

        if (!updateProduct) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: 'Product Update successfully', data: updateProduct, });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete productt' });
    }
};

// endpoin update data product
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Categories.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    showCategories,
    addCategories,
    deleteCategory,
    getCategoryById,
    updateCategory,
    upload
};
