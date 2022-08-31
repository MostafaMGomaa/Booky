const Book = require('../models/bookModel');
const catchAsync = require('./catchAsync');

// Create this method to modfiy my data.
exports.setAllRelatedBook = catchAsync(async () => {
  const books = await Book.find();

  books.map(async (currentBook) => {
    console.log('Remember BEFORE DEPLOY DELETE THIS METHOD AND THERE ROUTE .');
    currentBook.relatedBooks.splice(0, currentBook.relatedBooks.length);
    currentBook.categories.map((cat) => {
      books.map((book) => {
        if (book.categories.includes(cat) && book.id !== currentBook.id)
          currentBook.relatedBooks.push(book.id);
      });
    });
    await currentBook.save();
  });
});

exports.setRelatedBooksToNewBook = async (currentBook) => {
  const books = await Book.find();

  currentBook.categories.map((cat) => {
    books.map(async (book) => {
      if (book.categories.includes(cat) && book.id !== currentBook.id) {
        currentBook.relatedBooks.push(book.id);
        book.relatedBooks.push(currentBook.id);
      }
      // await book.save();
    });
  });
  await currentBook.save();
};

exports.deleteRelatedBooks = (books, currentBook) => {
  books.map(async (book) => {
    book.relatedBooks.map(async (id) => {
      if (id.equals(currentBook.id)) {
        const idInedx = book.relatedBooks.indexOf(currentBook.id);
        book.relatedBooks.splice(idInedx, 1);
      }
    });
    await book.save();
  });
};
