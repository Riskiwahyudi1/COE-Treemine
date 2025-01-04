// controllers/passwordController.js
const User = require("../../../models/users");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    // Validasi input
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Password lama dan password baru wajib diisi." });
    }

    try {
        
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan." });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password lama salah." });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password berhasil diubah." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
};

module.exports = {
    changePassword
}