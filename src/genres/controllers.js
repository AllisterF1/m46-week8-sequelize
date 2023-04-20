const Book = require("../books/model");
const Genre  = require("./model");

//creates a new genre and adds it to the database
const addGenre = async (req, res) => {
  try {
    const genre = await Genre.create({
      genre: req.body.genre,
    });
    res
      .status(201)
      .json({ message: "success, genre has been created", genre: genre });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//returns all genres in the database
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();

    res.status(201).json({ message: "success", genres : genres });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};

//finds an genre by name and returns them along with all book within that genre

const getGenreAndBooks = async (req, res) => {
  try {
    const genre = await Genre.findOne({
      where: { genre: req.params.genre },
      include: Book, 
    });
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.status(200).json({ message: "success", genre: genre });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Validation error" });
  }
};


module.exports = {
   addGenre,
   getAllGenres,
   getGenreAndBooks
  };
  