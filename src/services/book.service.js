const callExternalApi = require('../helpers/api');
const API_PATH = require('../config/constants');
const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');

const db = require('../config/db');

function groupBooksByAuthor(books) {
  return books
    .sort((book1, book2) => book1.rating - book2.rating)
    .reduce((previous, current) => {
      const { author } = current;

      const acc = { ...previous };

      if (acc[author]) {
        acc[author].push(current);
      } else {
        acc[author] = [current];
      }
      return acc;
    }, {});
}

async function getBooksFromApi() {
  const data = await callExternalApi(API_PATH.ALL_BOOK_PATH);

  const { books } = data;

  return books;
}

async function getBooksWithRatingFromApi() {
  const books = await getBooksFromApi();
  const ratings = await Promise.all(
    books.map((book) => callExternalApi(API_PATH.FIND_BOOKS_PATH + book.id)),
  );

  const booksWithRating = books.map((book, index) => ({
    ...book,
    rating: ratings[index].rating,
  }));

  return booksWithRating;
}

async function createBooks() {
  const booksWithRating = await getBooksWithRatingFromApi();

  const books = await Promise.all(
    booksWithRating.map((book) => db.book.upsert({
      create: {
        author: book.Author,
        name: book.Name,
        id: book.id,
        rating: book.rating,
      },
      update: {
        author: book.Author,
        name: book.Name,
        rating: book.rating,
      },
      where: {
        id: book.id,
      },
    })),
  );

  // const ids = await db.book.findMany({
  //   select: {
  //     id: true,
  //   },
  // }).then((res) => res.map((record) => record.id));

  // console.log(ids);
  // const booksNotExistedInDB = booksWithRating
  //   .filter((book) => ids[book.id])
  //   .map((intersectBookId) => booksWithRating
  //     .filter((bookId) => bookId === intersectBookId)[0]);

  // const books = await db.book.createMany({
  //   data: booksNotExistedInDB.map((book) => ({
  //     author: book.Author,
  //     name: book.Name,
  //     id: book.id,
  //     rating: book.rating,
  //   })),
  // });

  return books;
}

async function getBooks() {
  return db.book.findMany({});
}

async function getBookById(bookId) {
  return db.book.findUniqueOrThrow({
    where: {
      id: bookId,
    },
    select: {
      id: true,
      author: true,
      name: true,
      isLike: true,
    },
  });
}

async function getBooksGroupedByAuthor(author) {
  const booksWithRating = await getBooks();

  if (author) {
    return groupBooksByAuthor(booksWithRating)[author];
  }
  return groupBooksByAuthor(booksWithRating);
}

async function updateLikeStatusOfBook(bookId, isLike) {
  const result = await db.book.update({
    where: {
      id: bookId,
    },
    data: {
      isLike,
    },
  });

  return result;
}

module.exports = {
  createBooks,
  getBooks,
  getBookById,
  groupBooksByAuthor,
  getBooksGroupedByAuthor,
  updateLikeStatusOfBook,
};
