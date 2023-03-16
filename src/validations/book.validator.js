const joi = require('joi');

const getBookById = {
  params: joi.object().keys({
    id: joi.number().min(0).required(),
  }),
};

const getBookByAuthor = {
  query: joi.object().keys({
    author: joi.string().optional(),
  }),
};

const updateLikeStatus = {
  body: joi.object().keys({
    isLike: joi.boolean().required(),
  }),
};

module.exports = { getBookById, getBookByAuthor, updateLikeStatus };
