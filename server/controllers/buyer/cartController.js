const Cart = require('../../models/cart');
const Products = require('../../models/product');


// menambahkan product ke keranjang
const addProductToCart = async (req, res) => {
    const user = req.user;
    
    if (!user) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    const id_user = user.id;
    const { id_product } = req.body;
    
    try {
        // cek product di keranjang
        const checkProductInCart = await Cart.findOne({ id_user: id_user, id_product: id_product });
        if (checkProductInCart) {
            return res.status(409).json({ message: 'Product already in cart!' });
        }
        const newProductCart = {
            id_user, 
            id_product,
        };

        const savedProductToCart = await Cart.create(newProductCart);

        res.status(201).json({
            message: 'Product added successfully',
            data: savedProductToCart,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// tampilkan keranjang

const showCart = async (req, res) => {
    const user = req.user;
    try {
        
        const cartByUser = await Cart.find({id_user: user.id}).populate('id_product', 'product_name stock harga picture_url')
        if(!cartByUser || cartByUser.length === 0) {
            return res.status(404).json({message: 'keranjang masih kosong!'})
        }
        res.json(cartByUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
}

module.exports = {
    addProductToCart,
    showCart
};
