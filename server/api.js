var mysql = require('mysql');
var mysqlConf = require('./db');
var sqlMap = require('./sqlMap');

// 连接数据库
var pool = mysql.createPool({
	host: mysqlConf.mysql.host,
	user: mysqlConf.mysql.user,
	password: mysqlConf.mysql.password,
	database: mysqlConf.mysql.database,
	port: mysqlConf.mysql.port
})

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, data) {
    if(typeof data === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(data);
    }
};

// 数据处理
var mergeData = function(data) {
	var obj = {}, arr = [], tmp;
	for(let i = 0, len = data.length; i < len; i++){
		tmp = data[i];
		if(obj[tmp.aid]){
			obj[tmp.aid].tags.push({'id':tmp.tid, 'name':tmp.name});
		}else{
			obj[tmp.aid] = {};
			obj[tmp.aid].id = tmp.aid;
			obj[tmp.aid].user_id = tmp.user_id;
			obj[tmp.aid].title = tmp.title;
			obj[tmp.aid].type = tmp.type;
			obj[tmp.aid].loadURL = tmp.loadURL;
			obj[tmp.aid].tags = [{'id':tmp.tid, 'name':tmp.name}];
			obj[tmp.aid].summary = tmp.summary;
			obj[tmp.aid].post_time = tmp.post_time;
			obj[tmp.aid].upd_time = tmp.upd_time;
			obj[tmp.aid].view = tmp.view;
			obj[tmp.aid].start = tmp.start;
		}
	}
	for(let i in obj){
		arr.push(obj[i]);
	}
	return arr;
}

module.exports = {
	getArticleAll(req, res, next) {
		pool.getConnection((err, connection) => {
			connection.query(sqlMap.article.queryAll, (err, result) => {
				jsonWrite(res, mergeData(result));
				connection.release();
			})
		})
	},
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
}
