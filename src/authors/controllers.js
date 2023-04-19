const Author = require("./model");

//creates a new Author and adds it to the database
const addAuthor = async (req, res) => {
  try {
    const author = await Author.create({
      name: req.body.title,
    });
    res.status(201).json({ message: "success", book: book });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

