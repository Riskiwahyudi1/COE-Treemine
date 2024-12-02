const RequestCustomPrototype = require('../../models/request-costom-prototype')


const showRequestPrototype = async (req, res) => {
    try {
        const products = await RequestCustomPrototype.find({status: 'Review'})

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Request not found!" });
        }
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
}
const showWaitingPaymentPrototype = async (req, res) => {
    try {
        const products = await RequestCustomPrototype.find({status: 'Waiting Payment'})

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Request not found!" });
        }
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
}
const showPrototypeByProcess = async (req, res) => {
    try {
        const products = await RequestCustomPrototype.find({status: 'Process'})

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Request not found!" });
        }
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
}
const showPrototypeHistory = async (req, res) => {
    try {
        const products = await RequestCustomPrototype.find({
            $or: [{ status: 'Finish' }, { status: 'Reject' }]
        });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Request not found!" });
        }
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
}

const approvedPrototype = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updateProduct = await RequestCustomPrototype.findByIdAndUpdate(id, {
            status            
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
        const { status } = req.body;

        const updateProduct = await RequestCustomPrototype.findByIdAndUpdate(id, {
            status            
        }, { new: true });

        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: 'Product Update successfully', data: updateProduct, });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete productt' });
    }
};


module.exports ={
    showRequestPrototype, 
    showWaitingPaymentPrototype,
    showPrototypeByProcess,
    approvedPrototype,
    showPrototypeHistory,
    rejectPrototype
}