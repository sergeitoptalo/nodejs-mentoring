const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    description: String,
    price: Number,
    productId: Number,
    reviews: Number,
    title: String,
});

module.exports = { Product: mongoose.model('Product', productSchema) };
