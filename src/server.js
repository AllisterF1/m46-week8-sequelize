require("dotenv").config();

const express = require("express");
const Book = require("./books/model");
const Author = require ("./authors/model")
const bookRouter = require("./books/routes");
const authorRouter = require("./authors/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

//relationships must be declared before the sync functions
const syncTables = () => {

  Author.hasMany(Book);
  Book.belongsTo(Author);
    Book.sync();
    Author.sync();

  
};

app.use(bookRouter);
app.use(authorRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ mesage: "App is healthy" });
});

app.listen(port, () => {
    syncTables();
  console.log("Server is listening");
});
