const generateBaseResponse = require('../utils/api-error');

function mapResponse(req, res, next) {
  res.json(generateBaseResponse(res.body));
  next();
}

exports.default = { mapResponse };
