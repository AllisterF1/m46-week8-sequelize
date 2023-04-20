const Book = require("../books/model");
const Author = require("./model");

//creates a new author and adds it to the database
const addAuthor = async (req, res) => {
  try {
    const author = await Author.create({
      authorName: req.body.authorName,
    });
    res
      .status(201)
      .json({ message: "success, author has been created", author: author });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//returns all authors in the database
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();

    res.status(201).json({ message: "success", authors: authors });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//finds an author by name and returns them along with all books by them

const getAuthorAndBooks = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { authorname: req.params.authorname },
      include: Book, 
    });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "success", author: author });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//deletes an author by name
const deleteAuthorByName = async (req, res) => {
  const { authorName } = req.body;

  try {
    const author = await Author.destroy({ where: { authorName } });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res
      .status(201)
      .json({ message: "Author deleted successfully", author: author });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//deletes all authors in the database
const deleteAllAuthors = async (req, res) => {
  try {
    await Author.destroy({ where: {} });
    res.status(200).json({ message: "All authors deleted" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

module.exports = {
  addAuthor,
  getAllAuthors,
  getAuthorAndBooks,
  deleteAuthorByName,
  deleteAllAuthors,
};
