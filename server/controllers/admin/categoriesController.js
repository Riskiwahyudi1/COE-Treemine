const Categories = require('../../models/categories');

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

module.exports = {
    showCategories
};
