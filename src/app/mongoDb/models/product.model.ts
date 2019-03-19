import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    description: String,
    price: Number,
    productId: Number,
    reviews: Number,
    title: String,
});

export const Product = mongoose.model('Product', productSchema);
