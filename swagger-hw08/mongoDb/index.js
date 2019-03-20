//import { MongoClient } from 'mongodb';
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const Product = require('./models').Product;
const User = require('./models').User;

const connectionString =
    'mongodb+srv://mongoUser:111@cluster0-syndd.mongodb.net/homework-07?retryWrites=true';

mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to database');
});

module.exports = db;
