const { Router } = require('express');
const controller = require('../../controllers/book.controller');
const catchAsync = require('../../utils/catchAsync');
const validate = require('../../middlewares/validation.middleware');
const bookValidator = require('../../validations/book.validator');

const router = Router();

router.get('/', validate(bookValidator.getBookByAuthor), catchAsync(controller.getBookHandler));
router.patch('/:id/', validate(bookValidator.updateLikeStatus), catchAsync(controller.updateLikeStatusOfBookHandler));
router.get('/:id/', validate(bookValidator.getBookById), catchAsync(controller.getBookByIdHandler));

module.exports = { router };
