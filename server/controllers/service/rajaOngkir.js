const User = require('../../models/users');
const RequestCustomPrototype = require('../../models/request-costom-prototype');
const RequestCustomAssembly = require('../../models/request-costom-assembly');
const Product = require('../../models/product');

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

        const courier = req.query.couriers;
        const product = req.query.product; // Data produk dari request


        // Menentukan semua jenis produk yang ingin diperiksa
        const productTypes = ['standart', 'costom_prototype', 'costom_assembly'];

        const productQuantities = {};
        productTypes.forEach(type => {
            product.forEach(item => {
                item[type]?.forEach(entry => {
                    const id = entry.id_product || entry.id_request_costom;
                    const quantity = entry.quantity || 1;
                    if (id) {
                        productQuantities[id] = (productQuantities[id] || 0) + quantity; // Simpan jumlah kuantitas per ID
                    }
                });
            });
        });


        const validIds = Object.keys(productQuantities);
        // Mengambil data dari database berdasarkan ID yang valid
        const requestCustomAssemblies = await RequestCustomAssembly.find({
            _id: { $in: validIds } // MongoDB query untuk mencari beberapa ID
        });
        const requestPrototypes = await RequestCustomPrototype.find({
            _id: { $in: validIds } // MongoDB query untuk mencari beberapa ID
        });
        const standartProduct = await Product.find({
            _id: { $in: validIds } // MongoDB query untuk mencari beberapa ID
        });


        // Menghitung total berat untuk setiap kategori
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


        console.log('Total Weight Standart Product:', totalWeightStandartProduct);
        console.log('Total Weight Prototype:', weigthPrototype);
        console.log('Total Weight Assembly:', weigthAssembly);

        if (!courier) {
            return res.status(400).json({ message: 'Courier is required' });
        }

        const origin = 48; // ID kota Batam
        const destination = userData.address.city;;

        const weights = [totalWeightStandartProduct, weigthPrototype, weigthAssembly];
        const shippingWeight = weights.find(weight => weight > 0) ?? 1200;


        const shippingCost = await calculateShippingCost(origin, destination, shippingWeight, courier);

        res.json(shippingCost);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




module.exports = { fetchProvinces, fetchCitiesByProvince, checkShippingCost, getAvailableCouriers };