import mongoose from 'mongoose';

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

export const City = mongoose.model('City', citySchema);
