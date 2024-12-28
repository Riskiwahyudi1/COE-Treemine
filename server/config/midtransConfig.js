require('dotenv').config();

const midtransConfig = {
  isProduction: false, 
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
};

module.exports = midtransConfig;
