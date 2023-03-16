const service = require('../../src/services/book.service');
const db = require('../../src/config/db');
const ApiError = require('../../src/utils/api-error');
const HttpCode = require('../../src/utils/http-code');

jest.mock('../../src/config/db', () => ({
  book: {
    findMany: jest.fn(),
    findUniqueOrThrow: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../src/helpers/api');

describe('Group book by author', () => {
  it('Should group books by author and order by rating', () => {
    // Arrange
    const books = [{
      author: 'J K Rowling',
      id: 10,
      name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
      rating: 2.8,
    },
    {
      author: 'J K Rowling',
      id: 20,
      name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
      rating: 4.5,
    }, {
      author: 'Sidney Sheldon',
      id: 100,
      name: 'Tell Me Your Dreams',
      rating: 3.5,
    }];

    const expectedGroupedBooks = {
      'J K Rowling': [
        {
          author: 'J K Rowling',
          id: 10,
          name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
          rating: 2.8,
        },
        {
          author: 'J K Rowling',
          id: 20,
          name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
          rating: 4.5,
        },
      ],
      'Sidney Sheldon': [
        {
          author: 'Sidney Sheldon',
          id: 100,
          name: 'Tell Me Your Dreams',
          rating: 3.5,
        },
      ],
    };

    // Act
    const groupedBooks = service.groupBooksByAuthor(books);

    // Assert
    expect(groupedBooks).toEqual(expectedGroupedBooks);
  });
});

describe('Get books from the database', () => {
  it('Should get books from the database', async () => {
    // Arrange
    const expectedBooks = [{
      author: 'Sidney Sheldon',
      id: 100,
      name: 'Tell Me Your Dreams',
      rating: 3.5,
    }];

    db.book.findMany.mockResolvedValue(expectedBooks);
    expect(db.book.findMany).toHaveBeenCalledTimes(0);
    // Act
    const books = await service.getBooks();

    // Assert

    expect(books).toEqual(expectedBooks);
    expect(db.book.findMany).toHaveBeenCalledTimes(1);
  });
});

describe('Get Book By Id', () => {
  it('Should return book by the id if the book exists in the database', async () => {
    const expectedBook = {
      author: 'Sidney Sheldon',
      id: 100,
      name: 'Tell Me Your Dreams',
      rating: 3.5,
    };

    db.book.findUniqueOrThrow.mockResolvedValue(expectedBook);
    expect(db.book.findUniqueOrThrow).toHaveBeenCalledTimes(0);

    const book = await service.getBookById(expectedBook.id);

    expect(book).toEqual(expectedBook);
    expect(db.book.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('Should throw not found api error if the book not exists in the database', async () => {
    // const error = new ApiError(HttpCode.BAD_REQUEST, 'Message');

    db.book.findUniqueOrThrow.mockRejectedValue('a');

    expect(db.book.findUniqueOrThrow).toHaveBeenCalledTimes(0);

    try {
      await service.getBookById(10);
    } catch (e) {
      expect()
      expect(db.book.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    }
  });
});

// describe('Get books from the API', () => {
//   it('Should return data when called', () => {
//     callExternalApi
//       .mockResolvedValueOnce([
//         {
//           author: 'Sidney Sheldon',
//           id: 100,
//           name: 'Tell Me Your Dreams',
//           rating: 3.5,
//         },
//         {
//           author: 'J K Rowling',
//           id: 20,
//           name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
//           rating: 4.5,
//         },
//       ])
//       .mockResolvedValueOnce([
//         { rating: 3.5 },
//         { rating: 4.5 },
//       ]);
//   });
// });
