const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../../models/users');
const transporter = require('../../../config/nodemailer');
const router = express.Router();
const Joi = require('joi');


const JWT_SECRET = process.env.JWT_SECRET;

const registrationSchema = Joi.object({
  username: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).allow(null, ''),
  role: Joi.string().valid('admin', 'buyer').default('buyer'),
  address: Joi.object({
    jalan: Joi.string().allow(null, ''),
    subdistrict: Joi.string().allow(null, ''),
    city: Joi.string().allow(null, ''),
    province: Joi.string().allow(null, ''),
    postal_code: Joi.string().length(5).allow(null, ''),
  }).optional(), 
});

router.post('/', async (req, res) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    };
    const { username, email, password } = req.body;

    try {
      // cek username/email
      const existingUser = await User.findOne({ 
        $or: [{ email: req.body.email }, { username: req.body.username }] 
      });
      if (existingUser) {
        return res.status(409).json({ message: 'Email or username already exists' });
      }

      // Simpan user ke MongoDB
      const newUser = await User.create({ username, email, password });

      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
      const verificationUrl = `http://localhost:5000/verify/${token}`;

      await transporter.sendMail({
            from: '"COE Treemine" riskiwahyudi@gmail.com',
            to: newUser.email,                         
            subject: 'Verify Your Email Address',      
            html: `
                <p>Dear ${newUser.username},</p>
                <p>Thank you for registering with <strong>COE Treemine </strong>. Please verify your email address to activate your account:</p>
                <p><a href="${verificationUrl}" style="color: #1a73e8;">Click here to verify your email</a></p>
                <p>This link will expire in 1 hour.</p>
                <p>If you did not create this account, please ignore this email.</p>
                <br>
                <p>Best regards,</p>
                <p>COE Treemine</p>
            `,
            });

      res.status(201).json({ message: 'User berhasil disimpan', user: newUser });
  
    } catch (error) {
      console.error('Gagal menyimpan data:', error.message);
      res.status(500).json({ message: 'Gagal menyimpan data', error: error.message });
    }
  });

  module.exports = router;
  