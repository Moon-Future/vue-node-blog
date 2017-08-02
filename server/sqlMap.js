var sqlMap = {
	article: {
//		insert:'INSERT INTO user(user_id,author,title,tyep,loadURL,tag,summary,posy_time,upd_time) VALUES(8023,陈亮,?,0,$,tag,?,?,?)',
//		update:'update articles set name=?, age=? where id=?',
//		delete: 'delete from articles where id=?',
//		queryById: 'select * from articles where id=?',
//		queryAll: 'select * from articles',
		queryById: 'SELECT * from tag_links as c LEFT JOIN tags as a  on a.id = c.tid LEFT JOIN articles as b on b.id = c.aid where c.aid = ?',
		queryAll: 'SELECT * from tag_links as c LEFT JOIN tags as a  on a.id = c.tid LEFT JOIN articles as b on b.id = c.aid'
	},
	tag: {
		queryById: 'select * from articles where id=?',
		queryAll: 'select * from tags'
	}
}

module.exports = sqlMap;