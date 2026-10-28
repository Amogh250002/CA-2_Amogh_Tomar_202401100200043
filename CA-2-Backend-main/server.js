require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const books = require('./routes/books');


const app=express;
app.use(express.json());
app.use('/api/books', books);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library');
app.listen(process.env.PORT || 3000);
