const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    requestId: String,
    connection: {
        down: Number,
        effectiveType: String,
        rtt: Number
    },
    language: String,
    mobile: Boolean,
    platform: String
});
const Data = new mongoose.Model('Data', dataSchema);

// Create

// Read

// Update

//Delete