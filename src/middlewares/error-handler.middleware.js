const ApiError = require('../utils/api-error');

module.exports = {
  handleErrors(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    console.error(err);
    switch (err.constructor) {
      case ApiError: {
        return res.status(err.status).json({ message: err.message });
      }
      default: {
        return res.status(500).json({ message: 'Something unexpected happened' });
      }
    }
  },
};
