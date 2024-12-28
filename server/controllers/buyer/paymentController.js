const { verifyWebhook, createTransaction } = require('../../services/midtransService');
const Payment = require('../../models/payment')
const Transaction = require('../../models/transaction')

const createPayment = async (req, res) => {
    try {
        const { transactionId } = req.body;

        // Validasi input
        if (!transactionId) {
            return res.status(400).json({ error: 'Transaction ID is required' });
        }

        // Periksa apakah transaksi ada
        const transaction = await Transaction.findById(transactionId)
            .populate('id_user', 'username email phone address')
            .populate(
                'product.costom_prototype.id_request_prototype',
                'name x_out notes route_process design_in_panel width length quantity layer copper_layer solder_mask_position silkscreen_position material thickness min_track min_hole solder_mask silkscreen uv_printing surface_finish finish_copper remove_product_no design_file status shiping_cost total_cost'
            )
            .populate('product.standart.id_product', 'product_name harga picture_url');;
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const totalPayment = transaction.total_payment;

        // Periksa apakah pembayaran sudah ada untuk transaksi ini
        const existingPayment = await Payment.findOne({ transaction_id: transactionId });
        if (existingPayment) {
            return res.status(200).json({
                message: 'Transaction already exists',
                token: existingPayment.payment_url,
            });
        }

        // Payload untuk Midtrans
        const paymentPayload = {
            transaction_details: {
                order_id: `COE-${transactionId}`,
                gross_amount: totalPayment,
            },
            customer_details: {
                first_name: transaction.id_user.username.split(' ')[0], 
                last_name: transaction.id_user.username.split(' ')[1], 
                email: transaction.id_user.email,
                phone: transaction.id_user.phone,
                billing_address: {
                  address: transaction.id_user.address.detail_address,
                },
              },
              
        };

        // Debugging: cek isi payload sebelum dikirim
        console.log('Payload sent to Midtrans:', paymentPayload);
        // Buat transaksi di Midtrans
        const midtransResponse = await createTransaction(paymentPayload);

        console.log('Midtrans Response:', midtransResponse);

        // Simpan detail pembayaran baru di database
        const payment = new Payment({
            order_id: midtransResponse.order_id,
            transaction_id: transaction._id,
            payment_method: midtransResponse.payment_type,
            status: 'pending',
            amount: totalPayment,
            transaction_time: new Date(),
            payment_url: midtransResponse.redirect_url,
            snap_token: midtransResponse.token,
        });

        await payment.save();

        // Kirim respons ke client
        res.status(201).json({
            message: 'Payment created successfully',
            token: midtransResponse.token,
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
};




const handleMidtransNotification = async (req, res) => {
    try {
        const notification = req.body;

        // Cari data pembayaran berdasarkan order_id
        const payment = await Payment.findOne({ order_id: notification.order_id });

        if (!payment) {
            return res.status(404).json({ error: 'Pembayran tidak ditemukan' });
        }

        // Perbarui status pembayaran
        payment.status = notification.transaction_status;
        payment.payment_method = notification.payment_type;
        payment.updated_at = new Date();

        await payment.save();


        if (notification.transaction_status === 'success' || notification.transaction_status === 'capture' || notification.transaction_status === 'settlement') {
            // Untuk kartu kredit, pastikan fraud_status diterima
            if (notification.transaction_status === 'capture' && notification.fraud_status !== 'accept') {
                return res.status(200).json({ message: 'Pembayaran memerlukan verifikasi lebih lanjut' });
            }

            // Transaksi sukses
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'sudah-bayar' },
                { new: true }
            );
        } else if (notification.transaction_status === 'pending') {
            // Transaksi menunggu pembayaran
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'pembayaran-tertunda' },
                { new: true }
            );
        } else if (notification.transaction_status === 'deny') {
            // Transaksi gagal
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'gagal' },
                { new: true }
            );
        } else if (notification.transaction_status === 'cancel') {
            // Transaksi  dibatalkan
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'dibatalkan-admin' },
                { new: true }
            );
        } else if (notification.transaction_status === 'expire') {
            // Transaksi  kadaluwarsa
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'pembayaran-kadarluarsa' },
                { new: true }
            );
        }
        else {
            // Jika status tidak dikenali, log sebagai warning
            console.warn('Terjadi kesalahan saat pembayaran');
        }

        res.status(200).json({ message: 'Payment status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process notification' });
    }
}

const continuePayment = async (req, res) => {
    try {
        const { transactionId } = req.body;

        // Cari Snap token dari database
        const payment = await Payment.findOne({ transaction_id: transactionId });
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // Kembalikan Snap token ke client
        res.status(200).json({
            message: 'Continue payment',
            token: payment.snap_token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve payment token' });
    }
};


module.exports = {
    handleMidtransNotification,
    createPayment,
    continuePayment
}