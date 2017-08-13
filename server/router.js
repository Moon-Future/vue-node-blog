var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/article/getArticleAll', (req, res, next) => {
	api.getArticleAll(req, res, next);
})

router.get('/tag/getTagAll', (req, res, next) => {
	api.getTagAll(req, res, next);
})

router.get('/comment/getComment', (req, res, next) => {
	api.getComment(req, res, next);
})

router.post('/comment/writeComment', (req, res, next) => {
	api.writeComment(req, res, next);
})

router.post('/picture/avatar', (req, res, next) => {
	api.uploadPic(req, res, next);
})

router.get('/user/getUserAll', (req, res, next) => {
	api.getUserAll(req, res, next);
})

module.exports = router;