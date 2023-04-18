const Book = require("./model");

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

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.findAll();

    res.status(201).json({ message: "success", allBooks: allBooks });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

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

const deleteBookByTitle = async (req, res) => {
  const { title } = req.body;

  try {
    const book = await Book.findOne({ where: { title } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully", book: book });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};


const deleteAll = async (req, res) => {
      
    try {
        const book = await Book.findAll();
      await book.destroy();
      res.status(200).json({ message: "All books deleted", book: book });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: "Validation error" });
    }
  };

module.exports = {
  addBook,
  getAllBooks,
  updateBookByTitle,
  deleteBookByTitle,
  deleteAll
};
