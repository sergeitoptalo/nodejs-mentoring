const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
    capital: Boolean,
    cityId: Number,
    country: String,
    lastModifiedDate: Date,
    location: {
        lat: Number,
        long: Number,
    },
    name: String,
});

module.exports = { City: mongoose.model('City', citySchema) };
