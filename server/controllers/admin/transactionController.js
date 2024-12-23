const Transaction = require('../../models/transaction');

const showTransactionAdmin = async (req, res) => {
    
    try {
        const status = req.query.status;

        const products = await Transaction.find({status: status})
        .populate('id_user', 'username address')
        .populate(
            'product.costom_prototype.id_request_prototype',
             'name x_out notes route_process design_in_panel width length quantity layer copper_layer solder_mask_position silkscreen_position material thickness min_track min_hole solder_mask silkscreen uv_printing surface_finish finish_copper remove_product_no design_file status shiping_cost total_cost'
            )
        .populate('product.standart.id_product', 'product_name harga picture_url');

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Request not found!" });
        }
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

const approveTransaction = async (req, res) => {
    const { id } = req.body;
    try {
        const transaction = await Transaction.findOne({ _id: id });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found or user unauthorized' });
        }

        if (transaction.status !== 'menunggu-pembayaran') {
            return res.status(400).json({ message: 'Only transactions with "menunggu-pembayaran" status can be canceled' });
        }

        transaction.status = 'diproses';
        await transaction.save();

        return res.status(200).json({ message: 'Transaction has been canceled' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to cancel the transaction' });
    }
};

const rejectTransaction = async (req, res) => {
    const { id } = req.body;
    try {
        const transaction = await Transaction.findOne({ _id: id });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found or user unauthorized' });
        }

        if (transaction.status !== 'menunggu-pembayaran') {
            return res.status(400).json({ message: 'Only transactions with "menunggu-pembayaran" status can be canceled' });
        }

        transaction.status = 'ditolak-admin';
        await transaction.save();

        return res.status(200).json({ message: 'Transaction has been canceled' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to cancel the transaction' });
    }
};

const sendTransaction = async (req, res) => {
    const { id } = req.body;
    try {
        const transaction = await Transaction.findOne({ _id: id });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found or user unauthorized' });
        }

        if (transaction.status !== 'diproses') {
            return res.status(400).json({ message: 'Only transactions with "menunggu-pembayaran" status can be canceled' });
        }

        transaction.status = 'dikirim';
        await transaction.save();

        return res.status(200).json({ message: 'Transaction has been canceled' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to cancel the transaction' });
    }
};
module.exports = {
    showTransactionAdmin,
    approveTransaction,
    rejectTransaction,
    sendTransaction
}