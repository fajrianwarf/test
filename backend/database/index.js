const mongoose = require('mongoose');

const url =
  'mongodb+srv://fajrianwarf:fajrianwar@ecommerce-server.fhypt.mongodb.net/databaseTest?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database');
});

module.exports = db;
