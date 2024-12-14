const User = require('../../models/users')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/profile-picture'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

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

const updateProfile = async (req, res) => {
    try {
        const user = req.user;  
        const id_user = user.id; 
        const { name, phone, gender, birthday, address } = req.body;
        console.log(req.body)
        const profile_picture = req.file; 
        let addressData = {};

        if (address) {
            try {
                addressData = JSON.parse(address); 
            } catch (err) {
                return res.status(400).json({ error: 'Invalid address format' });
            }
        }

        const currentUser = await User.findById(id_user);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const oldImagePath = currentUser.profile_picture_url 
            ? path.join(__dirname, '../../storage/profile-picture', path.basename(currentUser.profile_picture_url))
            : null;

        const dataProfile = await User.findByIdAndUpdate(
            id_user,
            {
                name,
                phone,
                gender,
                birthday,
                address: addressData,
                profile_picture_url: profile_picture 
                    ? `/profile-picture/${profile_picture.filename}`  
                    : currentUser.profile_picture_url, 
            },
            { new: true } 
        );

        if (!dataProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        if (profile_picture && oldImagePath) {
            await deleteImage(oldImagePath);
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            data: dataProfile,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

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




module.exports = {
    updateProfile,
    getUserData,
    upload
}