const Transaction = require('../../models/transaction');

const createTransactions = async (req, res) => {
    try {
        // Ambil data dari request body
        const {
            id_user,
            product,
            expedition,
            total_payment,
            user_notes,
            estimated_delivery,
        } = req.body;

        // Validasi data wajib
        if (!id_user || !product || !expedition || !total_payment) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Buat transaksi baru
        const newTransaction = new Transaction({
            id_user,
            product,
            status: 'menunggu-pembayaran', 
            expedition,
            total_payment,
            user_notes,
            estimated_delivery,
        });

        // Simpan transaksi ke database
        const savedTransaction = await newTransaction.save();

        // Kirim respon sukses
        res.status(201).json({
            message: 'Transaction created successfully',
            data: savedTransaction,
        });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const showTransactionBuyer = async (req, res) => {
    const user = req.user;
    try {
        const status = req.query.status;

        const products = await Transaction.find({status: status, id_user: user.id})
        .populate('id_user', 'username')
        .populate('product.costom_prototype.id_request_prototype', 'name');

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Request not found!" });
        }
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

const cancelTransactionBuyer = async (req, res) => {
    const user = req.user;
    const { id } = req.body;
    try {
        const transaction = await Transaction.findOne({ _id: id, id_user: user.id });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found or user unauthorized' });
        }

        if (transaction.status !== 'menunggu-pembayaran') {
            return res.status(400).json({ message: 'Only transactions with "menunggu-pembayaran" status can be canceled' });
        }

        transaction.status = 'dibatalkan';
        await transaction.save();

        return res.status(200).json({ message: 'Transaction has been canceled' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to cancel the transaction' });
    }
};
const doneTransactionBuyer = async (req, res) => {
    const user = req.user;
    const { id } = req.body;
    try {
        const transaction = await Transaction.findOne({ _id: id, id_user: user.id });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found or user unauthorized' });
        }

        transaction.status = 'selesai';
        await transaction.save();

        return res.status(200).json({ message: 'Transaction has been done' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to done the transaction' });
    }
};



module.exports = {
    createTransactions,
    showTransactionBuyer,
    cancelTransactionBuyer,
    doneTransactionBuyer
}