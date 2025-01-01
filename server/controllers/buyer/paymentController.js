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
                'product.costom_prototype.id_request_costom',
                'name x_out notes route_process design_in_panel width length quantity layer copper_layer solder_mask_position silkscreen_position material thickness min_track min_hole solder_mask silkscreen uv_printing surface_finish finish_copper remove_product_no design_file status shiping_cost total_cost'
            )
            .populate('product.costom_assembly.id_request_costom',
                'name flexible_option board_type assembly_side quantity pay_attention notes number_unik_part number_SMD_part number_BGA_QFP throught_hole board_to_delivery function_test cable_wire_harness_assembly detail_information status total_cost design_file reject_reason')
            .populate('product.standart.id_product', 'product_name harga picture_url');;
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const totalPayment = transaction.total_payment;

        let itemDetails = [];
        const productData = transaction.product?.[0] || {}; 

        if (productData.standart?.length > 0) {
            itemDetails = productData.standart.map((product) => ({
                id: product.id_product._id.toString(),
                name: product.id_product.product_name || 'Produk Standar',
                price: Number(product.id_product.harga) || 0,
                quantity: Number(product.quantity),
                url: product.id_product.picture_url || 'https://default.url/product',
            }));
        } else if (productData.costom_prototype?.length > 0) {
            itemDetails = productData.costom_prototype.map((product) => ({
                id: product.id_request_costom._id.toString(),
                name: product.id_request_costom.name || 'Produk Custom Prototype',
                price: Number(product.id_request_costom.total_cost ) || 0,
                quantity: Number(product.quantity),
                url: product.id_request_costom.design_file || 'https://default.url/custom-product',
            }));
        } else if (productData.costom_assembly?.length > 0) {
            itemDetails = productData.costom_assembly.map((product) => ({
                id: product.id_request_costom._id.toString(),
                name: product.id_request_costom.name || 'Produk Custom Assembly',
                price: Number(product.id_request_costom.total_cost ) || 0,
                quantity: Number(product.quantity),
                url: product.id_request_costom.design_file || 'https://default.url/custom-product',
            }));
        } else {
            throw new Error('Produk tidak ditemukan dalam transaksi');
        }

        // menambah ongkir
        if (transaction.expedition?.[0]?.shipping_cost) {
            itemDetails.push({
                id: "SHIPPING_COST", 
                name: "Ongkos Kirim",
                price: Number(transaction.expedition[0].shipping_cost) || 0,
                quantity: 1, 
            });
        }


        
        // Periksa pembayaran untuk transaksi ini
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
                    first_name: transaction.id_user.username.split(' ')[0],
                    last_name: transaction.id_user.username.split(' ')[1] || '',
                    email: transaction.id_user.email,
                    phone: transaction.id_user.phone,
                    address: `${transaction.id_user.address.detail_address}, ${transaction.id_user.address.city_name}, ${transaction.id_user.address.province_name}, ${transaction.id_user.address.postal_code}`,
                    city: transaction.id_user.address.city,
                    postal_code: transaction.id_user.address.postal_code,
                    country_code: 'IDN',
                },
                shipping_address: {
                    first_name: transaction.id_user.username.split(' ')[0],
                    last_name: transaction.id_user.username.split(' ')[1] || '',
                    email: transaction.id_user.email,
                    phone: transaction.id_user.phone,
                    address: `${transaction.id_user.address.detail_address}, ${transaction.id_user.address.city_name}, ${transaction.id_user.address.province_name}, ${transaction.id_user.address.postal_code}`,
                    country_code: 'IDN',
                }
            },
            item_details: itemDetails,

        };

        // Buat transaksi di Midtrans
        const midtransResponse = await createTransaction(paymentPayload);

        //Buat data pembayaran
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

        // update status transaksi
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            payment.transaction_id,
            { status: 'pembayaran-tertunda' },
            { new: true }
        );

        // Kirim respons ke client
        res.status(201).json({
            message: 'Payment created successfully',
            token: midtransResponse.token,
            status: updatedTransaction.status
        });


    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
};




const handleMidtransNotification = async (req, res) => {
    try {
        const notification = req.body;

        // Cari data pembayaran 
        const payment = await Payment.findOne({ order_id: notification.order_id });

        if (!payment) {
            return res.status(404).json({ error: 'Pembayran tidak ditemukan' });
        }

        // Perbarui status pembayaran
        payment.status = notification.transaction_status;
        payment.payment_method = notification.payment_type;
        payment.updated_at = new Date();

        await payment.save();

        // cek notif dari midtrans
        if (notification.transaction_status === 'success' || notification.transaction_status === 'capture' || notification.transaction_status === 'settlement') {
            if (notification.transaction_status === 'capture' && notification.fraud_status !== 'accept') {
                return res.status(200).json({ message: 'Pembayaran memerlukan verifikasi lebih lanjut' });
            }
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'sudah-bayar' },
                { new: true }
            );
        } else if (notification.transaction_status === 'pending') {
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'pembayaran-tertunda' },
                { new: true }
            );
        } else if (notification.transaction_status === 'deny') {
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'gagal' },
                { new: true }
            );
        } else if (notification.transaction_status === 'cancel') {
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'dibatalkan-admin' },
                { new: true }
            );
        } else if (notification.transaction_status === 'expire') {
            await Transaction.findByIdAndUpdate(
                payment.transaction_id,
                { status: 'pembayaran-kadarluarsa' },
                { new: true }
            );
        }
        else {
            console.warn('Terjadi kesalahan saat pembayaran');
        }

        res.status(200).json({ message: 'Payment status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process notification' });
    }
}

// fungsi lanjut bayar
const continuePayment = async (req, res) => {
    try {
        const { transactionId } = req.body;

        // Cari Snap token dari database
        const payment = await Payment.findOne({ transaction_id: transactionId });
        if (!payment) {
            return res.status(404).json({ error: 'Data pembayaran tidak ditemukan' });
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