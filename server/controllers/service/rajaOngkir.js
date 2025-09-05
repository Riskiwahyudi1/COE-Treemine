const User = require('../../models/users');
const RequestCustomPrototype = require('../../models/request-costom-prototype');
const RequestCustomAssembly = require('../../models/request-costom-assembly');
const Product = require('../../models/product');

const { getProvinces, getDistrict, getCities, getSubDistrict, calculateShippingCost } = require('../../services/rajaOngkirService');

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
            return res.status(400).json({ success: false, message: 'province id is required' });
        }
        const cities = await getCities(province_id);
        res.status(200).json({ success: true, data: cities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const fetchDistrictByCity = async (req, res) => {
    try {
        const { city_id } = req.query;
        if (!city_id) {
            return res.status(400).json({ success: false, message: 'city id is required' });
        }
        const district = await getDistrict(city_id);
        res.status(200).json({ success: true, data: district });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const fetchSubDistrictByDistrict = async (req, res) => {
    try {
        const { district_id } = req.query;
        if (!district_id) {
            return res.status(400).json({ success: false, message: 'District id is required' });
        }
        const subDistrict = await getSubDistrict(district_id);
        res.status(200).json({ success: true, data: subDistrict });
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

        // ambil couriers & product dari query (sementara)
        const couriers = req.query.couriers;  
        const product = req.query.product; 

        if (!couriers) {
            return res.status(400).json({ message: 'Couriers is required' });
        }

        // hitung berat produk (kode kamu sebelumnya sudah oke)
        const productTypes = ['standart', 'costom_prototype', 'costom_assembly'];
        const productQuantities = {};

        productTypes.forEach(type => {
            product.forEach(item => {
                item[type]?.forEach(entry => {
                    const id = entry.id_product || entry.id_request_costom;
                    const quantity = entry.quantity || 1;
                    if (id) {
                        productQuantities[id] = (productQuantities[id] || 0) + quantity;
                    }
                });
            });
        });

        
        const validIds = Object.keys(productQuantities);
        const requestCustomAssemblies = await RequestCustomAssembly.find({ _id: { $in: validIds } });
        const requestPrototypes = await RequestCustomPrototype.find({ _id: { $in: validIds } });
        const standartProduct = await Product.find({ _id: { $in: validIds } });

        const totalWeightStandartProduct = standartProduct.reduce((total, product) => {
            const quantity = productQuantities[product._id] || 1;
            const weight = parseInt(product.weight) || 0;
            return total + (quantity * weight);
        }, 0);

        const weigthPrototype = requestPrototypes.reduce((total, product) => {
            const quantity = productQuantities[product._id] || 1;
            const weight = parseInt(product.weight) || 0;
            return total + (quantity * weight);
        }, 0);

        const weigthAssembly = requestCustomAssemblies.reduce((total, product) => {
            const quantity = productQuantities[product._id] || 1;
            const weight = parseInt(product.weight) || 0;
            return total + (quantity * weight);
        }, 0);

        const weights = [totalWeightStandartProduct, weigthPrototype, weigthAssembly];
        const shippingWeight = weights.find(weight => weight > 0) ?? 1200;

        // --- pakai district_id static
        const origin = 1391;       // contoh: kecamatan Batam
        const destination = 1376;   // contoh: kecamatan tujuan

        // hitung ongkir via RajaOngkir
        const shippingCost = await calculateShippingCost(origin, destination, shippingWeight, couriers);
        res.json(shippingCost);

    } catch (error) {
        console.error("Shipping error:", error.response?.data || error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = { fetchProvinces, fetchCitiesByProvince, fetchDistrictByCity, fetchSubDistrictByDistrict, checkShippingCost, getAvailableCouriers };