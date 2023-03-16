const bookService = require('../services/book.service');

async function getBookHandler(_req, _res) {
  const { author } = _req.query;
  await bookService.createBooks();
  _res.json(await bookService.getBooksGroupedByAuthor(author));
}

async function updateLikeStatusOfBookHandler(_req, _res) {
  const { isLike } = _req.body;
  const { id } = _req.params;
  _res.json(await bookService.updateLikeStatusOfBook(parseInt(id, 10), isLike));
}

async function getBookByIdHandler(_req, _res) {
  const { id } = _req.params;
  _res.json(await bookService.getBookById(parseInt(id, 10)));
}

module.exports = { getBookHandler, updateLikeStatusOfBookHandler, getBookByIdHandler };
