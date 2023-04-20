const Book = require("./model");

//creates a new book and adds it to the database
const addBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
    });
    res.status(201).json({ message: "success", book: book });
  } catch (error) {
    console.log(error);
  }
};

//returns all books in the database
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    res.status(201).json({ message: "success", books: books });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//returns a single book from the title in the endpoint route

const getSingleBookByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const book = await Book.findOne({ where: { title } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "success", book: book });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//updates book via searching by title
const updateBookByTitle = async (req, res) => {
  const { title, newAuthor, newGenre, newTitle } = req.body;

  try {
    const book = await Book.findOne({ where: { title } });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update({
      author: newAuthor,
      title: newTitle,
      genre: newGenre,
    });

    res.status(200).json({ message: "Book updated successfully", book: book });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//deletes all books via title in url
const deleteBookByTitle = async (req, res) => {
  const { title } = req.body;

  try {
    const book = await Book.destroy({ where: { title } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(201).json({ message: "Book deleted successfully", book: book });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//deletes all books in the database
const deleteAll = async (req, res) => {
  try {
    await Book.destroy({ where: {} });
    res.status(200).json({ message: "All books deleted" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getSingleBookByTitle,
  updateBookByTitle,
  deleteBookByTitle,
  deleteAll,
};
