const dns = require('dns');
const mongoose = require('mongoose');

// حل مشكلة DNS SRV مع مزودي الإنترنت المحليين
dns.setServers(['8.8.8.8', '8.8.4.4']);

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database Error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = dbConnection;
