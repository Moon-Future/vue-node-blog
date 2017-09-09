var express = require('express');
var router = express.Router();
var api = require('./api');

// get

// 获得所有文章
router.get('/article/getArticleAll', (req, res, next) => {
	api.getArticleAll(req, res, next);
})
// 获取标签
router.get('/tag/getTagAll', (req, res, next) => {
	api.getTagAll(req, res, next);
})
// 获得评论
router.get('/comment/getComment', (req, res, next) => {
	api.getComment(req, res, next);
})
// 用户
router.get('/user/getUserAll', (req, res, next) => {
	api.getUserAll(req, res, next);
})


// post

// 填写评论
router.post('/comment/writeComment', (req, res, next) => {
	api.writeComment(req, res, next);
})
// 上传头像
router.post('/picture/avatar', (req, res, next) => {
	api.uploadPic(req, res, next);
})
// 登陆
router.post('/user/login', (req, res, next) => {
	api.userLogin(req, res, next);
})
module.exports = router;