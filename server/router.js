var express = require('express');
var router = express.Router();
var api = require('./api');

// get
// 获得所有文章
router.get('/article/getArticleAll', (req, res, next) => {
  api.getArticleAll(req, res, next);
})
router.get('/article/getArticleById', (req, res, next) => {
  api.getArticleById(req, res, next);
})
router.get('/article/getArticleByTagId', (req, res, next) => {
  api.getArticleByTagId(req, res, next);
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
// 游客评论邮箱查询
router.get('/visitor/getVisitor', (req, res, next) => {
  api.getVisitor(req, res, next);
})
// 获取session
router.get('/getSession', (req, res, next) => {
  req.session.isLogin ? res.send(req.session.userData) : res.send('false');
})


// post
// 更新文章
router.post('/article/updArticle', (req, res, next) => {
  api.updArticle(req, res, next);
})
// 新增文章
router.post('/article/addArticle', (req, res, next) => {
  api.addArticle(req, res, next);
})
router.post('/article/addViewOrStart', (req, res, next) => {
  api.addViewOrStart(req, res, next);
})
// 填写评论
router.post('/comment/writeComment', (req, res, next) => {
  api.writeComment(req, res, next);
})
// 更新游客信息
router.post('/visitor/updVisitorMes', (req, res, next) => {
  api.updVisitorMes(req, res, next);
})
// 上传头像
router.post('/picture/avatar', (req, res, next) => {
  api.uploadPic(req, res, next);
})
// 登陆
router.post('/user/login', (req, res, next) => {
  api.userLogin(req, res, next);
})
// 注册
router.post('/user/signup', (req, res, next) => {
  api.userSignup(req, res, next);
})
// 退出
router.post('/user/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
  });
  res.end();
})

module.exports = router;
