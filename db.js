const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('MongoDB connected successfully');
});

module.exports = db;
