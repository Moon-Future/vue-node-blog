var mysql = require('mysql');
var mysqlConf = require('./db');
var sqlMap = require('./sqlMap');
var formidable = require('formidable');
var fs = require('fs');
var uuid = require('node-uuid');

// 连接数据库
var pool = mysql.createPool({
    host: mysqlConf.mysql.host,
    user: mysqlConf.mysql.user,
    password: mysqlConf.mysql.password,
    database: mysqlConf.mysql.database,
    port: mysqlConf.mysql.port
});

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, data) {
    if(typeof data === 'undefined') {
        res.json({
            status: false,
            msg: '操作失败'
        });
    } else {
        res.json(data);
    }
};

// 数据处理
var mergeData = function(data, flag) {
    var obj = {}, arr = [], arrDel = [], tmp;
    for(let i = 0, len = data.length; i < len; i++){
        tmp = data[i];
        if(obj[tmp.id]){
            tmp.tid ? obj[tmp.id].tags.push({'id':tmp.tid, 'name':tmp.name}) : false;
        }else{
            obj[tmp.id] = {};
            obj[tmp.id].id = tmp.id;
            obj[tmp.id].user_id = tmp.user_id;
            obj[tmp.id].title = tmp.title;
            obj[tmp.id].type = tmp.type;
            obj[tmp.id].loadURL = tmp.loadURL;
            obj[tmp.id].tags = [];
            tmp.tid ? obj[tmp.id].tags.push({'id':tmp.tid, 'name':tmp.name}) : false;
            obj[tmp.id].summary = tmp.summary;
            obj[tmp.id].post_time = tmp.post_time;
            obj[tmp.id].upd_time = tmp.upd_time ? tmp.upd_time : '';
            obj[tmp.id].view = tmp.view;
            obj[tmp.id].start = tmp.start;
            obj[tmp.id].state = tmp.state;
            obj[tmp.id].image = tmp.image;
        }
    }
    for(let i in obj){
        obj[i].state !== 0 ? (flag ? obj[i].state === 1 ? arr.push(obj[i]) : false : arr.push(obj[i])) : arrDel.push(obj[i]);
    }

    return flag ? arr : {'articles': arr, 'articlesDel': arrDel};
}

module.exports = {
    // 文章
    getArticleAll(req, res, next) {
        pool.getConnection((err, connection) => {
            let param = req.query.index;
            connection.query(sqlMap.article.queryAll, (err, result) => {
                jsonWrite(res, result ? mergeData(result, param) : result);
                connection.release();
            })
        })
    },
    // 更新文章
    updArticle(req, res, next) {
        pool.getConnection((err, connection) => {
            if (req.session.userData.root !== 1) {
                res.send('false');
                return;
            }
            let postData = req.body, sql = 'UPDATE articles SET ', str = '';
            for(let key in postData) {
                if (key === 'id') {
                    continue
                }
                str += key + ' = ' + postData[key] + ','
            }
            sql += str.substr(0, str.length - 1) + ' WHERE id = ' + postData.id;
            connection.query(sql, (err, result) => {
                res.send('true');
                connection.release();
            })
        })
    },
    // 新增文章
    addArticle(req, res, next) {
        pool.getConnection((err, connection) => {
            let postData = req.body, curTime = new Date().getTime();
            if (req.session.userData.root !== 1) {
                postData.state = 2;
            }
            connection.query(sqlMap.article.insert, [postData.user_id,postData.author,postData.title,postData.state,postData.type,postData.loadURL,postData.summary,curTime,null,0,0,'',''], (err, result) => {
                res.send('true');
                connection.release();
            })
        })
    },
    // 标签
    getTagAll(req, res, next) {
        pool.getConnection((err, connection) => {
            connection.query(sqlMap.tag.queryAll, (err, result) => {
                jsonWrite(res, result);
                connection.release();
            })
        })
    },
    getTagById(req, res, next) {
        pool.getConnection((err, connection) => {
            connection.query(sqlMap.tag.queryById, (err, result) => {
                jsonWrite(res, result);
                connection.release();
            })
        })
    },
    // 评论
    writeComment(req, res, next) {
        pool.getConnection((err, connection) => {
            let postData = req.body, time = new Date().getTime();
            // 游客评论
            let email = postData.email, name = postData.uname, website = postData.website, id;
            connection.query(sqlMap.visitor.queryByEmail, [email], (err, result) => {
                if (err) { throw err; }
                if (result.length !== 0) {
                    let data = JSON.parse(JSON.stringify(result[0]));
                    id = data.id;
                    jsonWrite(res, data);
                    connection.query(sqlMap.comment.insert, [postData.aid, id, postData.rid, postData.content, time, postData.reminder], (err, result) => {
                        jsonWrite(res, 'ok');
                        connection.release();
                    })
                } else {
                    connection.query(sqlMap.visitor.insert, [name, email, website, 'avatar'], (err, result) => {
                        if (err) { throw err;  }
                        connection.query(sqlMap.visitor.queryByEmail, [email], (err, result) => {
                            if (err) { throw err; }
                            id = result[0].id;
                            connection.query(sqlMap.comment.insert, [postData.aid, id, postData.rid, postData.content, time, postData.reminder], (err, result) => {
                                jsonWrite(res, 'ok');
                                connection.release();
                            })
                        })
                    })
                }
            })
        })
    },
    getComment(req, res, next) {
        pool.getConnection((err, connection) => {
            let params = req.query, obj = {};
            connection.query(sqlMap.comment.queryByActicleId, [params.articleID], (err, result) => {
                for(let i = 0, len = result.length; i < len; i++){
                    let tmp = result[i], replyCommentID = tmp.reply_comment_id, replyID = tmp.reply_id, tmpObj = {};
                    if(!replyCommentID){
                        obj[tmp.id] ? false : obj[tmp.id] = {};
                        obj[tmp.id].article_id = tmp.article_id;
                        obj[tmp.id].user_id = tmp.user_id;
                        obj[tmp.id].user_name = tmp.user_name;
                        obj[tmp.id].content = tmp.content;
                        obj[tmp.id].time = tmp.time;
                    }else{
                        obj[replyCommentID] ? false : obj[replyCommentID] = {};
                        obj[replyCommentID].replys ? false : obj[replyCommentID].replys = [];
                        tmpObj.user_id = tmp.user_id;
                        tmpObj.user_name = tmp.user_name;
                        tmpObj.content = tmp.content;
                        tmpObj.time = tmp.time;
                        if(replyID){
                            tmpObj.reply_id = replyID;
                            tmpObj.reply_name = tmp.reply_name;
                        }
                        obj[replyCommentID].replys.push(tmpObj);
                    }
                }
                jsonWrite(res, {data: obj, len: result.length});
                connection.release();
            })
        })
    },
    // 上传图片
    uploadPic(req, res, next) {
        let form = new formidable.IncomingForm(), userID, userAvatar;
        form.uploadDir = '../static/images/avatar/';
        form.parse(req, (error, fields, files) => {
            userID = fields.userID;
            userAvatar = fields.userAvatar;
            for(let key in files){
                let file = files[key];
                let fileName = uuid.v1() + '_' + file.name;
                let newPath = form.uploadDir + fileName;
                jsonWrite(res, fileName);
                fs.renameSync(file.path, newPath);
                // 删除原头像文件
                if (userAvatar !== 'head1.jpg' && userAvatar !== 'head2.jpg') {
                    fs.unlinkSync(form.uploadDir + userAvatar);
                }
                pool.getConnection((err, connection) => {
                    connection.query(sqlMap.user.update, [fileName, userID], (err, result) => {
                        if (err) {
                            throw err;
                        }
                        req.session.userData.avatar = fileName;
                        req.session.save()
                        connection.release();
                    })
                })
            }
        });
    },
    // 用户
    getUserAll(req, res, next) {
        pool.getConnection((err, connection) => {
            connection.query(sqlMap.user.queryAll, (err, result) => {
                jsonWrite(res, result);
                connection.release();
            })
        })
    },
    // 登陆
    userLogin(req, res, next) {
        pool.getConnection((err, connection) => {
            let postData = req.body;
            connection.query(sqlMap.user.queryByEmail, [postData.email], (err, result) => {
                if(result.length === 0) {
                    res.json({
                        status: false,
                        msg: '用户不存在'
                    });
                }else{
                    if(result[0].password !== postData.password){
                        res.json({
                            status: false,
                            msg: '密码错误'
                        });
                    }else{
                        delete result[0].password;
                        req.session.isLogin = true;
                        req.session.userData = result[0];
                        jsonWrite(res, result[0]);
                        connection.release();
                    }
                }
            })
        })
    },
    // 注册
    userSignup(req, res, next) {
        pool.getConnection((err, connection) => {
            let postData = req.body;
            if (postData.password !== postData.rePassword) {
                res.json({
                    status: false,
                    msg: '两次密码输入不一样',
                });
                return;
            }
            connection.query(sqlMap.user.queryByEmail, [postData.email], (err, result) => {
                if (result.length !== 0) {
                    res.json({
                        status: false,
                        msg: '用户已存在'
                    });
                    connection.release();
                } else {
                    connection.query(sqlMap.user.insert, [postData.name,postData.email,postData.password,postData.avatar], (err, result) => {
                        let status = true, msg = '注册成功';
                        if (err) {
                            status = false;
                            msg = '服务器出错,请稍后再试';
                        }
                        res.json({
                            status: status,
                            msg: msg
                        });
                        connection.release();
                    })
                }
            })
        })
    },
}
