const User = require('../../models/users');
const { getProvinces, getCities, calculateShippingCost } = require('../../services/rajaOngkirService');

const fetchProvinces = async (req, res) => {
    try {
        const provinces = await getProvinces();
        res.status(200).json({ success: true, data: provinces });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const fetchCitiesByProvince = async (req, res) => {
    try {
        const { province_id } = req.query;
        if (!province_id) {
            return res.status(400).json({ success: false, message: 'province_id is required' });
        }
        const cities = await getCities(province_id);
        res.status(200).json({ success: true, data: cities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAvailableCouriers = async (req, res) => {
    const { couriers } = req.body;

    try {
        return await checkShippingCost(req, res, couriers || 'jne');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const checkShippingCost = async (req, res) => {
    const user = req.user;
    const id_user = user.id;

    try {
        const userData = await User.findById(id_user);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mengambil parameter couriers dari query string
        const courier = req.query.couriers;  // Mengambil parameter dari query string

        console.log('Courier received in checkShippingCost:', courier);  // Debugging

        if (!courier) {
            return res.status(400).json({ message: 'Courier is required' });
        }

        const origin = 48; // ID kota Batam
        const destination = userData.address.city;

        // Kalkulasi ongkos kirim
        const shippingCost = await calculateShippingCost(origin, destination, 1200, courier);

        res.json(shippingCost);  // Mengirim hasil ongkos kirim ke frontend

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



  
module.exports = { fetchProvinces, fetchCitiesByProvince, checkShippingCost, getAvailableCouriers };