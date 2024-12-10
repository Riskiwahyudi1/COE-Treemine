const axios = require('axios');
const config = require("../config/rajaOngkir");

const getProvinces = async () => {
    try {
        const url = `${config.baseUrl}/province`;
        const headers = { key: config.apiKey };

        const response = await axios.get(url, { headers });
        return response.data.rajaongkir.results; 
    } catch (error) {
        throw new Error(
            `Error fetching provinces: ${
                error.response?.data?.rajaongkir?.status?.description || error.message
            }`
        );
    }
};

const getCities = async (province_id) => {
    try {
        const url = `${config.baseUrl}/city?province=${province_id}`;
        const headers = { key: config.apiKey };

        const response = await axios.get(url, { headers });
        return response.data.rajaongkir.results;
    } catch (error) {
        throw new Error(`Error fetching cities: ${error.response?.data?.rajaongkir?.status?.description || error.message}`);
    }
};

const getSubdistricts = async (cityId) => {
    try {
        const url = `${config.baseUrl}/subdistrict?city=${cityId}`;
        const headers = { key: config.apiKey };
    
        const response = await axios.get(url, { headers });
        return response.data.rajaongkir.results;
    } catch (error) {
        throw new Error(`Error fetching Subdistrict: ${error.response?.data?.rajaongkir?.status?.description || error.message}`);
    }
};


module.exports = { getProvinces, getCities, getSubdistricts };
