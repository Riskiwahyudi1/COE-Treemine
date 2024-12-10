const User = require('../../models/users')

const getUserData = async (req, res) => {
    const user = req.user;
    const id_user = user.id;

    try {
        const userData = await User.findById(id_user); 
        if (!userData) {
            return res.status(404).json({ message: 'userData not found' });
        }
        res.json(userData); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const id_user = user.id;
        const {  } = req.body;

        console.log(id_user)

        const dataProfile = await User.findByIdAndUpdate(id, {
            
        }, { new: true });

        if (!dataProfile) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: 'Product Update successfully', data: dataProfile, });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete productt' });
    }
};

module.exports = {
    updateProfile,
    getUserData
}