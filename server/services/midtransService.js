const midtransClient = require('midtrans-client');
const midtransConfig = require('../config/midtransConfig');

//  Midtrans Snap 
const snap = new midtransClient.Snap({
  isProduction: midtransConfig.isProduction,
  serverKey: midtransConfig.serverKey,
});

// Fungsi untuk membuat transaksi
const createTransaction = async (parameter) => {
  try {
    const transaction = await snap.createTransaction(parameter);

    return {
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: parameter.transaction_details.order_id, 
      payment_type: parameter.payment_type, 
    };
  } catch (error) {
    console.error('Midtrans Transaction Error:', error);
    throw error;
  }
};


// Fungsi untuk memverifikasi webhook
const verifyWebhook = (signatureKey, body) => {
  const crypto = require('crypto');

  const hashed = crypto
    .createHmac('sha512', midtransConfig.serverKey)
    .update(JSON.stringify(body))
    .digest('hex');

  return hashed === signatureKey;
};

module.exports = { createTransaction, verifyWebhook };
