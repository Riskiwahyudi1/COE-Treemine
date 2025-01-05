const Payment = require('../../models/payment');
const Transaksi = require('../../models/transaction');
const RequestCustomPrototype = require('../../models/request-costom-prototype')
const RequestCustomAssembly = require('../../models/request-costom-assembly')


const showPayment = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate({
                path: 'transaction_id',
                select: 'id_user status total_payment payment_method',
                populate: {
                    path: 'id_user',
                    select: 'name email phone',
                },
            });

        if (!payments || payments.length === 0) {
            return res.status(401).json({ message: "payments not found!" });
        }
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    };
}
const showTransaksi = async (req, res) => {
    try {
        const transaction = await Transaksi.find()
            .populate({
                path: 'id_user',
                select: 'name email phone',
            })
            .populate({
                path: 'product.standart.id_product',
                select: 'name',
            })
            .populate({
                path: 'product.costom_prototype.id_request_costom',
                select: 'name',
            })
            .populate({
                path: 'product.costom_assembly.id_request_costom',
                select: 'name',
            });

        if (!transaction || transaction.length === 0) {
            return res.status(401).json({ message: "Transaction not found!" });
        }

        const totalPayment = transaction
            .filter((item) => item.status === 'sudah-bayar') 
            .reduce((total, item) => {
                return total + (item.total_payment || 0);
            }, 0);

        res.json({
            transactions: transaction,
            totalPayment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};


const getTotalDataCount = async (req, res) => {
    try {
      
        const countPrototype = await RequestCustomPrototype.countDocuments({ status: { $ne: 'menunggu-pengajuan' } });

        
        const countAssembly = await RequestCustomAssembly.countDocuments({ status: { $ne: 'menunggu-pengajuan' } });

        // Gabungkan jumlah data
        const totalCount = countPrototype + countAssembly;

        
        return res.json({ totalDataCount: totalCount });
    } catch (error) {
        console.error('Error calculating total data count:', error);
        return res.status(500).json({ message: 'Failed to calculate total data count' });
    }
};

module.exports = {
    getTotalDataCount,
};


module.exports = {
    showPayment,
    showTransaksi,
    getTotalDataCount
}