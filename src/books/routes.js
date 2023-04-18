const { Router } = require("express");
const bookRouter = Router();
const { addBook, getAllBooks, updateBookByTitle } = require("./controllers")

bookRouter.post("/books/addbook", addBook);
bookRouter.get("/books/getallbooks", getAllBooks);
bookRouter.put("/books/updatebook", updateBookByTitle);

module.exports = bookRouter;
