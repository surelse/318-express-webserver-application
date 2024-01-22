const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware for logging incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Sample book data
let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'MegaLiving', author: 'Robin Sharma' },
];

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Books route
app.get('/books', (req, res) => {
  res.render('books', { books });
});

// Book details route
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    res.render('bookDetails', { book });
  } else {
    res.status(404).send('Book not found');
  }
});

// API endpoints

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.json(newBook);
});

// Get details of a specific book
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});