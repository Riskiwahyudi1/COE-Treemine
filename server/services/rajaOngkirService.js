const axios = require('axios');
const qs = require('qs');
const config = require("../config/rajaOngkir");

const getProvinces = async () => {
    try {
        const url = `${config.baseUrl}/destination/province`;
        const headers = { key: config.apiKey };
        const response = await axios.get(url, { headers });
       
        return response.data.data; 
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
        const url = `${config.baseUrl}/destination/city/${province_id}`;
        const headers = { key: config.apiKey };

        const response = await axios.get(url, { headers });
         console.log(response)
        return response.data.data;
    } catch (error) {
        throw new Error(`Error fetching cities: ${error.response?.data?.rajaongkir?.status?.description || error.message}`);
    }
};

const calculateShippingCost = async (origin, destination, weight, couriers) => {
    try {
        const url = `${config.baseUrl}/calculate/district/domestic-cost`;
        const headers = { 
            key: config.apiKey,
            "Content-Type": "application/x-www-form-urlencoded"
        };

        const data = qs.stringify({
            origin:origin,
            destination:destination,
            weight:weight,
            courier:couriers
        });

        const response = await axios.post(url, data, { headers });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(
            `Error calculating shipping cost: ${
                error.response?.data?.status?.description || error.message
            }`
        );
    }
};

// const calculateShippingCost = async (origin, destination, weight, courier) => {
//     try {
//         const url = `${config.baseUrl}/calculate/district/domestic-cost`;
//         const headers = { key: config.apiKey };
//         const data = {
//             origin,
//             destination,
//             weight,
//             courier,
//         };
//         const response = await axios.post(url, data, { headers });
//         return response.data.rajaongkir.results;
//     } catch (error) {
//         throw new Error(
//             `Error calculating shipping cost: ${
//                 error.response?.data?.rajaongkir?.status?.description || error.message
//             }`
//         );
//     }
// };



module.exports = { getProvinces, getCities, calculateShippingCost };
