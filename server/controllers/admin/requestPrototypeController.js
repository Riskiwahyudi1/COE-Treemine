const RequestCustomPrototype = require('../../models/request-costom-prototype')


const approvedPrototype = async (req, res) => {
    try {
        const { id } = req.params;
        const updateProduct = await RequestCustomPrototype.findByIdAndUpdate(id, {
            status : 'disetujui'           
        }, { new: true });

        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: 'Product Update successfully', data: updateProduct, });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete productt' });
    }
};

const rejectPrototype = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body
        const updateProduct = await RequestCustomPrototype.findByIdAndUpdate(id, {
            status : "ditolak-admin",
            reject_reason: reason             
        }, { new: true });

        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: 'Product Update successfully', data: updateProduct, });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete productt' });
    }
};

const showRequestPrototypeByParams = async (req, res) => {

    try {
        const status = req.query.status;
        const requestCustom = await RequestCustomPrototype.find({status: { $in: status }}).populate('id_user', 'username')

        if (!requestCustom || requestCustom.length === 0) {
            return res.status(200).json({ requestCustom: [], message: "No requestCustom found" });
        }
        res.json(requestCustom);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};


module.exports ={
    approvedPrototype,
    rejectPrototype,
    showRequestPrototypeByParams
}