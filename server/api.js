var mysql = require('mysql');
var mysqlConf = require('./db');
var sqlMap = require('./sqlMapping');

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

module.exports = {
	getBlogAll(req, res, next) {
		pool.getConnection((err, connection) => {
			connection.query(sqlMap.blog.queryAll, (err, result) => {
				jsonWrite(res, result);
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

}