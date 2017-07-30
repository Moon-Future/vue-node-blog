var sqlMap = {
	blog: {
		insert:'INSERT INTO user(user_id,author,title,tyep,loadURL,tag,summary,posy_time,upd_time) VALUES(8023,陈亮,?,0,$,tag,?,?,?)',
		update:'update blog set name=?, age=? where id=?',
		delete: 'delete from blog where id=?',
		queryById: 'select * from blog where id=?',
		queryAll: 'select * from blog'
	},
	tag: {
		insert:'INSERT INTO user(user_id,author,title,tyep,loadURL,tag,summary,posy_time,upd_time) VALUES(8023,陈亮,?,0,$,tag,?,?,?)',
		update:'update blog set name=?, age=? where id=?',
		delete: 'delete from blog where id=?',
		queryById: 'select * from blog where id=?',
		queryAll: 'select * from tag'
	}
}

module.exports = sqlMap;

// INSERT INTO blog
// (user_id, author, title, type, loadURL, tags, summary, post_time, upd_time)
// VALUES
// (8023, "陈亮", "vue+node+mysql搭建个人博客", 1, "#", "[{'id':0, 'name':'vue'}, {'id':1, 'name':'javascript'}]", "一步一个脚印", "1501260407904", "1501270407904");