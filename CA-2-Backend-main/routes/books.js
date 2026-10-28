const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const book = await Book.create(req.body);
  res.status(201).json(book);
});

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const books = await Book.find().skip(skip).limit(limit);
  const total = await Book.countDocuments();
  res.json({ books, page, total });
});

router.patch('/:id', async (req, res) => {
  const availability = req.body.availability ?? req.body.available;
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { availability },
    { new: true }
  );

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

module.exports = router;
