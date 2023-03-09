const { Router } = require('express');
const controller = require('../../controllers/book.controller');
const catchAsync = require('../../utils/catchAsync');

const router = Router();

router.get('/', catchAsync(controller.getBooksGroupedByAuthor));
router.patch('/:id/updateLikeStatus', catchAsync(controller.updateLikeStatusOfBook));
router.get('/:id/', catchAsync(controller.getBookById));

module.exports = { router };
