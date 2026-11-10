const express = require('express');
const books = require('./booksdb');
const router = express.Router();
const users = [];

const isValid = username => users.some(user => user.username === username);
const authenticatedUser = (username, password) => users.some(user => user.username === username && user.password === password);

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!authenticatedUser(username, password)) return res.status(401).json({ message: 'Invalid username or password' });
  req.session.username = username;
  return res.json({ message: 'User successfully logged in' });
});

router.put('/auth/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const review = req.query.review ?? req.body?.review;
  if (typeof review !== 'string' || !review.trim()) return res.status(400).json({ message: 'Review is required' });
  book.reviews[req.session.username] = review;
  return res.json({ message: 'Review added/updated successfully', reviews: book.reviews });
});

router.delete('/auth/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  delete book.reviews[req.session.username];
  return res.json({ message: 'Review deleted successfully', reviews: book.reviews });
});

module.exports = { authenticated: router, isValid, users };
