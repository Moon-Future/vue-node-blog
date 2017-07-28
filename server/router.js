var express = require('express')
var router = express.Router();
var api = require('./api')

router.get('/blog/getBlogAll', function(req, res, next) {
	api.getBlogAll(req, res, next);
})

router.get('/blog/getblog', function(req, res, next) {
	console.log('getblog');
	res.send('express 陈亮 getblog');
})

router.get('/comment/getComment', function(req, res, next) {
	console.log('getComment');
	res.send('express 陈亮 getComment');
})

module.exports = router;