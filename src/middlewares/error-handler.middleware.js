const { HttpError } = require('../errors/errors');

module.exports = {
  handleErrors(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    console.error(err);
    switch (err.constructor) {
      case HttpError: {
        return res.status(err.code).json({ message: err.message });
      }
      default: {
        return res.status(500).json({ message: 'Something unexpected happened' });
      }
    }
  },
};
