const express = require('express');
const axios = require('axios');
const books = require('./booksdb');
const { isValid, users } = require('./auth_users');
const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password.trim())
    return res.status(400).json({ message: 'Username and password are required' });
  if (isValid(username)) return res.status(409).json({ message: 'User already exists' });
  users.push({ username, password });
  return res.status(201).json({ message: 'User successfully registered. Now you can login' });
});

router.get('/', (req, res) => res.json(books));
router.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});
router.get('/author/:author', (req, res) => {
  const query = req.params.author.toLowerCase();
  return res.json(Object.fromEntries(Object.entries(books).filter(([, book]) => book.author.toLowerCase() === query)));
});
router.get('/title/:title', (req, res) => {
  const query = req.params.title.toLowerCase();
  return res.json(Object.fromEntries(Object.entries(books).filter(([, book]) => book.title.toLowerCase() === query)));
});
router.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book ? res.json(book.reviews) : res.status(404).json({ message: 'Book not found' });
});

// Axios async/await implementations for the final four assignment tasks.
const baseURL = process.env.BOOK_API_URL || 'http://localhost:5000';
async function getAllBooks() { return (await axios.get(`${baseURL}/`, { proxy: false })).data; }
async function getBookByISBN(isbn) { return (await axios.get(`${baseURL}/isbn/${encodeURIComponent(isbn)}`, { proxy: false })).data; }
async function getBooksByAuthor(author) { return (await axios.get(`${baseURL}/author/${encodeURIComponent(author)}`, { proxy: false })).data; }
async function getBooksByTitle(title) { return (await axios.get(`${baseURL}/title/${encodeURIComponent(title)}`, { proxy: false })).data; }

module.exports = { general: router, getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle };
