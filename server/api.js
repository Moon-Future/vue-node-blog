const mysql = require('mysql');
const mysqlConf = require('./db');
const sqlMap = require('./sqlMap');
const formidable = require('formidable');
const fs = require('fs');
const uuid = require('uuid');
const marked = require('marked');
const path = require('path');
const rootDir = path.join(__dirname, '../static');
const articlePath = path.join(__dirname, '../articles/');
const LIMIT = 10;
try {
  var {transporter, mailOptions, sendMsg} = require('./emailInfo'); // npm包: nodemailer
} catch(e) {
  console.log('缺少文件 emailInfo.js，不能发送邮件');
}

// 连接数据库
const pool = mysql.createPool({
  host: mysqlConf.mysql.host,
  user: mysqlConf.mysql.user,
  password: mysqlConf.mysql.password,
  database: mysqlConf.mysql.database,
  port: mysqlConf.mysql.port,
  multipleStatements: true    // 多语句查询
});

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

// 数据处理
var mergeData = function(data, flag) {
  let obj = {}, arr = [], arrDel = [], tmp;
  for(let i = 0, len = data.length; i < len; i++){
    tmp = data[i];
    let tagString = tmp.tag_string, tagArr;
    obj[tmp.id] = {};
    obj[tmp.id].id = tmp.id;
    obj[tmp.id].user_id = tmp.user_id;
    obj[tmp.id].title = tmp.title.trim();
    obj[tmp.id].type = tmp.type;
    obj[tmp.id].loadURL = tmp.loadURL;
    obj[tmp.id].summary = tmp.summary;
    obj[tmp.id].post_time = tmp.post_time;
    obj[tmp.id].upd_time = tmp.upd_time ? tmp.upd_time : '';
    obj[tmp.id].view = tmp.view;
    obj[tmp.id].start = tmp.start;
    obj[tmp.id].state = tmp.state;
    obj[tmp.id].cover = tmp.cover;
    obj[tmp.id].tags = [];
    if (tagString) {
      tagArr = tagString.split(',');
      for(let j = 0, l = tagArr.length; j < l; j++){
        obj[tmp.id].tags.push({id: tagArr[j].split('_')[0], name: tagArr[j].split('_')[1]})
      }
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
      let params = req.query, noDel = params.noDel, limit = params.limit, start = limit > LIMIT ? limit - LIMIT : 0,
        sqlGetLen = '; SELECT COUNT(1) AS total FROM articles WHERE state = 1',
        sql = sqlMap.article.queryAll + (limit ? ' LIMIT ' + start + ',' + limit : '' );
      sql += (limit && limit <= LIMIT) ? sqlGetLen : '';
      connection.query(sql, (err, result) => {
        let total = 0, data;
        if (limit && limit <= LIMIT) {
          data = result[0];
          total = result[1][0].total;
          res.json({
            data: mergeData(data, noDel),
            total: total
          });
        } else {
          res.json(result ? mergeData(result, noDel) : result);
        }
        connection.release();
      })
    })
  },
  getArticleById(req, res, next) {
    let params = req.query, id = params.id, title = params.title.trim(), editor = params.editor,
      filePath = articlePath + title + '.md',
      fileHtml = articlePath + title + '.html',
      content, data, stat;
    if (editor) {
      try {
        content = fs.readFileSync(filePath, 'utf-8');
      } catch(e) {
        res.json({
          status: false,
          msg: '没有找到文章'
        })
        return;
      }
    } else {
      try {
        stat = fs.statSync(fileHtml);
        content = fs.readFileSync(fileHtml, 'utf-8');
      } catch(e) {
        try {
          content = fs.readFileSync(filePath, 'utf-8');
          content = marked(content);
          fs.writeFileSync(fileHtml, content);
        } catch(e) {
          res.json({
            status: false,
            msg: '没有找到文章'
          })
          return;
        }
      }
    }
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.queryById, [id], (err, result) => {
        if (result.length !== 0) {
          data = mergeData(result, false).articles;
          data[0].content = content || '';
        } else {
          data = {
            status: false,
            msg: '没有找到文章'
          }
        }
        res.json(data);
        connection.release();
      })
    })
  },
  getArticleByTagId(req, res, next) {
    pool.getConnection((err, connection) => {
      let params = req.query, tagId = params.tagId, noDel = params.noDel,
        limit = params.limit, start = limit > LIMIT ? limit - LIMIT : 0,
        sqlGetLen = '; SELECT COUNT(1) AS total FROM tag_links WHERE tid = ' + tagId,
        sql = sqlMap.article.queryByTagId + (limit ? ' LIMIT ' + start + ',' + limit : '' );
      sql += (limit && limit <= LIMIT) ? sqlGetLen : '';
      connection.query(sql, [tagId], (err, result) => {
        let total = 0, data;
        if (limit && limit <= LIMIT) {
          data = result[0];
          total = result[1][0].total;
          res.json({
            data: mergeData(data, noDel),
            total: total
          });
        } else {
          res.json(result ? mergeData(result, noDel) : result);
        }
        // connection.release();
      })
    })
  },
  // 更新文章
  updArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      if (req.session.userData.root !== 1) {
        res.json({status: false, msg: '没有权限'});
        return;
      }
      let postData = req.body, id = postData.id, title = (postData.title || '').trim(), tags = postData.tags, tagIdMax = postData.tagIdMax,
        sql = 'UPDATE articles SET ', str = '';
      connection.query('SELECT * FROM articles WHERE title = ? AND id != ?', [title, id], (err, result) => {
        if (result.length === 0) {
          if (postData.state === 3) { // 彻底删除
            sql = 'DELETE FROM articles WHERE id = ' + id + '; ';
            sql += 'DELETE FROM tag_links WHERE aid = ' + id + '; ';
          } else {
            let markedHtml, htmlTags, content = postData.content, summary = '', count = 0, limit = 2;
            if (postData.content) {
              markedHtml = marked(content);
              htmlTags = markedHtml.match(/.*|<(.|\n)*?<\/.*>.*/g);
              for(let i = 0, len = htmlTags.length; i < len; i++) {
                if (htmlTags[i] === '') {
                  summary += '\n';
                }
                if (htmlTags[i].match(/^<(.)/)) {
                  let tag = htmlTags[i].match(/^<(.)/)[1];
                  if (tag === 'h') {
                    count += 1;
                  }
                  if (count > limit && tag === 'h') {
                    break;
                  }
                }
                summary += htmlTags[i];
              }
              summary += '<p>......</p>';
              summary = summary.replace(/\'/g, '"');
            }
            for(let key in postData) {
              if (key === 'id' || key === 'tags' || key === 'tagIdMax') {
                continue
              }
              if (key === 'content') {
                str += "`summary` = '" + summary + "',";
              } else {
                str += "`" + key + "` = '" + postData[key] + "',";
              }
            }
            if (postData.content) {
              str += "`upd_time` = '" + new Date().getTime() + "',";
            }
            sql += str.substr(0, str.length - 1) + " WHERE id = " + id + "; ";
            
            if (postData.content) {
              sql += "DELETE FROM tag_links WHERE aid = " + id + "; ";
              for (let i = 0, l = tags.length; i < l; i++) {
                let tagId = tags[i].id, tagName = tags[i].name;
                if (tagId === -1) {
                  tagIdMax += 1;
                  sql += (sql.indexOf('INSERT INTO tags') === -1 ?  'INSERT INTO tags(id, `name`) VALUES ' : '');
                  sql += "(" + tagIdMax + ", '" + tagName + "'), ";
                  tags[i].id = tagIdMax;
                }
              }
              sql = sql[sql.length - 2] === ',' ? sql.substr(0, sql.length - 2) + '; ' : sql;
              for (let i = 0, l = tags.length; i < l; i++) {
                let tagId = tags[i].id;
                sql += (sql.indexOf('INSERT INTO tag_links') === -1 ? 'INSERT INTO tag_links(tid, aid) VALUES ' : '');
                sql += "(" + tagId + ", " + id + "), ";
              }
              sql = sql[sql.length - 2] === ',' ? sql.substr(0, sql.length - 2) : sql;
            }
          }
          connection.query(sql, (err, result) => {
            if (err) {
              res.json({status: false, msg: '操作失败'});
            } else {
              res.json({status: true, msg: '操作成功'});
              let filePath = articlePath + title + '.md';
              let fileHtml = articlePath + title + '.html';
              if (postData.state === 3) {
                try {
                  fs.unlink(filePath, () => {});
                } catch(e) {
                  console.log(e);
                }
              } else if(postData.content) {
                try {
                  fs.unlink(fileHtml, () => {});
                } catch(e) {
                  console.log(e);
                }
                fs.writeFileSync(filePath, postData.content);
              }
            }
            connection.release();
          })
        } else {
          res.json({status: false, msg: '文章标题已存在'});
          connection.release();
        }
      })
    })
  },
  // 阅读量、点赞量 +1
  addViewOrStart(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body,
        id = postData.id,
        count = postData.count,
        type = postData.type,
        sql = 'UPDATE articles SET ' + type + ' = ' + count + ' WHERE id = ' + id;
      connection.query(sql, (err, result) => {
        res.send('ok');
      })
    })
  },
  // 新增文章
  addArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body,
        curTime = new Date().getTime(),
        content = postData.content,
        title = postData.title.trim(),
        tags = postData.tags,
        fileDir = articlePath,
        fileName = title + '.md',
        filePath = fileDir + fileName,
        markedHtml, htmlTags, summary = '', count = 0, limit = 2, tagIdMax = postData.tagIdMax;
      if (!title || !content) {
        res.json({status: true, msg: '提交失败,请完善内容'});
        return;
      }
      markedHtml = marked(content);
      htmlTags = markedHtml.match(/.*|<(.|\n)*?<\/.*>.*/g);
      for(let i = 0, len = htmlTags.length; i < len; i++) {
        if (htmlTags[i] === '') {
          summary += '\n';
        }
        if (htmlTags[i].match(/^<(.)/)) {
          let tag = htmlTags[i].match(/^<(.)/)[1];
          if (tag === 'h') {
            count += 1;
          }
          if (count > limit && tag === 'h') {
            break;
          }
        }
        summary += htmlTags[i];
      }
      summary += '<p>......</p>';

      connection.query(sqlMap.article.queryByTitle, [title], (err, result) => {
        if (result.length === 0) {
          if (req.session.userData.root !== 1) {
            postData.state = 2;
          }
          connection.query(sqlMap.article.insert + '; SELECT MAX(id) as id FROM articles', [postData.user_id,title,postData.state,postData.type,postData.loadURL,summary,curTime,null,0,0], (err, result) => {
            let id = result[1][0].id, sql = '';
            for (let i = 0, l = tags.length; i < l; i++) {
              let tagId = tags[i].id, tagName = tags[i].name;
              if (tagId === -1) {
                tagIdMax += 1;
                sql += (sql.indexOf('INSERT INTO tags') === -1 ?  'INSERT INTO tags(id, `name`) VALUES ' : '');
                sql += "(" + tagIdMax + ", '" + tagName + "'), ";
                tags[i].id = tagIdMax;
              }
            }
            sql = sql[sql.length - 2] === ',' ? sql.substr(0, sql.length - 2) + '; ' : sql;
            for (let i = 0, l = tags.length; i < l; i++) {
              let tagId = tags[i].id;
              sql += (sql.indexOf('INSERT INTO tag_links') === -1 ? 'INSERT INTO tag_links(tid, aid) VALUES ' : '');
              sql += "(" + tagId + ", " + id + "), ";
            }
            sql = sql[sql.length - 2] === ',' ? sql.substr(0, sql.length - 2) : sql;
            fs.writeFileSync(filePath, content);
            res.json({status: true, msg: '提交成功'});
            if (transporter && req.session.userData.root !== 1) {
              mailOptions.html = '<h1>' + sendMsg.newArticle + '<h1>'
                + '<p>' + sendMsg.title + ': ' + title + '</p>'
                + '<p>' + sendMsg.content + ': ' + markedHtml + '</p>';
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
              });
            }
            if (tags.length === 0) {
              connection.release();
            } else {
              connection.query(sql, (err, result) => {
                connection.release();
              })
            }
          })
        } else {
          res.json({status: false, msg: '提交失败,文章标题已存在'});
          connection.release();
        }
      })
    })
  },
  // 标签
  getTagAll(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.tag.queryAll, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  getTagById(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.tag.queryById, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  // 评论
  writeComment(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body, time = new Date().getTime();
      // 游客评论
      let email = postData.email, name = postData.uname, website = postData.website,
      reminder = postData.reminder, avatar = postData.avatar || '', uid = postData.uid;
      if (uid) {
        connection.query(sqlMap.comment.insert, [postData.aid, uid, postData.rid, postData.rCommentID, postData.content, time], (err, result) => {
          postData.uid = uid;
          res.json(postData);
          connection.release();
        })
      } else {
        connection.query(sqlMap.visitor.insert, [name, email, website, avatar, reminder], (err, result) => {
          if (err) { throw err;  }
          connection.query(sqlMap.visitor.queryByEmail, [email], (err, result) => {
            if (err) { throw err; }
            uid = result[0].id;
            connection.query(sqlMap.comment.insert, [postData.aid, uid, postData.rid, postData.rCommentID, postData.content, time], (err, result) => {
              postData.uid = uid;
              postData.avatar = result[0].avatar;
              res.json(postData);
              connection.release();
            })
          })
        })
      }
    })
  },
  getComment(req, res, next) {
    pool.getConnection((err, connection) => {
      let params = req.query, obj = {}, arr = [];
      connection.query(sqlMap.comment.queryByActicleId, [params.articleID], (err, result) => {
        for(let i = 0, len = result.length; i < len; i++){
          let tmp = result[i], replyCommentID = tmp.reply_comment_id, replyID = tmp.reply_id, tmpObj = {};
          if(!replyCommentID){
            obj[tmp.id] ? false : obj[tmp.id] = {};
            arr.push(obj[tmp.id]);
            obj[tmp.id].commentID = tmp.id;
            obj[tmp.id].aid = tmp.article_id;
            obj[tmp.id].uid = tmp.user_id;
            obj[tmp.id].uname = tmp.user_name;
            obj[tmp.id].content = tmp.content;
            obj[tmp.id].time = tmp.time;
            obj[tmp.id].avatar = tmp.avatar;
          }else{
            obj[replyCommentID] ? false : obj[replyCommentID] = {};
            obj[replyCommentID].replys ? false : obj[replyCommentID].replys = [];
            tmpObj.uid = tmp.user_id;
            tmpObj.uname = tmp.user_name;
            tmpObj.content = tmp.content;
            tmpObj.time = tmp.time;
            if(replyID){
              tmpObj.rid = replyID;
              tmpObj.rname = tmp.reply_name;
            }
            obj[replyCommentID].replys.push(tmpObj);
          }
        }
        res.json(arr);
        connection.release();
      })
    })
  },
  // 上传图片
  uploadPic(req, res, next) {
    let form = new formidable.IncomingForm(), userID, userAvatar;
    form.uploadDir = rootDir + '/images/avatar/';
    form.parse(req, (error, fields, files) => {
      userID = fields.userID;
      userAvatar = fields.userAvatar;
      for(let key in files){
        let file = files[key];
        let fileName = uuid.v1() + '_' + file.name;
        let newPath = form.uploadDir + fileName;
        res.json(fileName);
        fs.renameSync(file.path, newPath);
        // 删除原头像文件
        if (userAvatar && userAvatar !== 'avatar.jpg' && userAvatar !== 'head1.jpg' && userAvatar !== 'head2.jpg') {
          fs.unlinkSync(form.uploadDir + userAvatar);
        }
        if (!userID) {
          return;
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
        res.json(result);
        connection.release();
      })
    })
  },
  // 游客评论邮箱查询
  getVisitor(req, res, next) {
    pool.getConnection((err, connection) => {
      let params = req.query, email = params.email;
      connection.query(sqlMap.visitor.queryByEmail, [email], (err, result) => {
        result.length === 0 ? res.json(false) : res.json(result[0]);
        connection.release();
      })
    })
  },
  // 更新游客信息
  updVisitorMes(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body, avatar = postData.avatar || '', email = postData.email;
      if (req.session.userData && req.session.userData.email === email) {
        return;
      }
      // 博客账户不可在此更新,只能在后台更新
      connection.query(sqlMap.user.queryByEmail, [email], (err, result) => {
        if (err) { throw err; }
        if (result.length !== 0) {
          res.json(false);
          return;
        } else {
          connection.query(sqlMap.visitor.updByEmail, [postData.name, postData.website, avatar, postData.reminder, email], (err, result) => {
            if (err) { throw err; }
            res.json(true);
            connection.release();
          })
        }
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
            res.json(result[0]);
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
          let email = postData.email, password = postData.password, name = postData.name,
            avatar = postData.avatar, website = postData.website, reminder = postData.reminder;
          connection.query(sqlMap.user.insert, [name, email, password, avatar, website, reminder, name, email, avatar, website, reminder], (err, result) => {
            let status = true, msg = '注册成功';
            if (err) {
              status = false;
              msg = '服务器出错,请稍后再试';
            }
            res.json({
              status: status,
              msg: msg
            });
            if (transporter) {
              mailOptions.html = '<h1>' + sendMsg.newUser + '<h1>'
                + '<p>' + sendMsg.email + ': ' + email + '</p>'
                + '<p>' + sendMsg.name + ': ' + name + '</p>'
                + '<p>' + sendMsg.website + ': ' + website + '</p>';
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
              });
            }
            connection.release();
          })
        }
      })
    })
  }
}
