
const User = require("../../../models/users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const transporter = require('../../../config/nodemailer');
const JWT_SECRET = process.env.JWT_SECRET;

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

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

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email tidak terdaftar' });
        }

     
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        const resetPasswordUrl = `http://localhost:3000/reset-password/${token}`;

        await transporter.sendMail({
            from: '"COE Treemine" riskiwahyudi@gmail.com',
            to: user.email,
            subject: 'Permintaan Reset Password',
            html: `
          <p>Yth. ${user.username},</p>
          <p>Kami menerima permintaan untuk mereset password Anda. Untuk melanjutkan, silakan klik link di bawah ini:</p>
          <p><a href="${resetPasswordUrl}" style="color: #1a73e8;">Klik di sini untuk mereset password Anda</a></p>
          <p>Link ini akan kedaluwarsa dalam 1 jam.</p>
          <p>Jika Anda tidak merasa melakukan permintaan reset password, harap abaikan email ini.</p>
          <br>
          <p>Salam hormat,</p>
          <p>COE Treemine</p>
        `,
        });

        res.status(200).json({ message: 'Link reset password telah dikirim ke email Anda.' });
    } catch (error) {
        console.error('Gagal mengirim email:', error.message);
        res.status(500).json({ message: 'Gagal mengirim email', error: error.message });
    }
}

const resetPassword = async (req, res) => {

    const { token } = req.params;
  
    const { password } = req.body;
  
    try {
      
      const decoded = jwt.verify(token, JWT_SECRET);
  
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }
    
      user.password = password;
      await user.save();
  
      res.status(200).json({ message: 'Password berhasil direset' });
    } catch (error) {
      console.error('Gagal mereset password:', error.message);
      res.status(500).json({ message: 'Gagal mereset password', error: error.message });
    }
}

module.exports = {
    changePassword,
    forgotPassword,
    resetPassword
}