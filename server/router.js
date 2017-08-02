var express = require('express')
var router = express.Router();
var api = require('./api')

router.get('/article/getArticleAll', function(req, res, next) {
	api.getArticleAll(req, res, next);
})

router.get('/tag/getTagAll', function(req, res, next) {
	api.getTagAll(req, res, next);
})

router.get('/comment/getComment', function(req, res, next) {
	res.send('express 陈亮 getComment');
})

module.exports = router;