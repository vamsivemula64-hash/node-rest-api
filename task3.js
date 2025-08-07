const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length ? books[books.length - 1].id + 1 : 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);

  if (index !== -1) {
    books[index] = { id: bookId, ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);

  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
