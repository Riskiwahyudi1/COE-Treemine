const Cart = require('../../models/cart');


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

module.exports = {
    addProductToCart,
};
