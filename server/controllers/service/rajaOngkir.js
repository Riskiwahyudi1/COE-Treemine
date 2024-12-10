const { getProvinces, getCities, getSubdistricts } = require('../../services/rajaOngkirService');

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

const fetchSubdistrictsByCity = async (req, res) => {
    try {
      const { city_id } = req.query;
      if(!city_id){
        return res.status(400).json({ success: false, message: 'city_id is required' });
      }
      const subdistricts = await getSubdistricts(city_id);
      res.status(200).json({success: true, data: subdistricts });
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { fetchProvinces, fetchCitiesByProvince, fetchSubdistrictsByCity };