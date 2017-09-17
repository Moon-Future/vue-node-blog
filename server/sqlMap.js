var sqlMap = {
    article: {
        queryById: 'SELECT * from tag_links as c LEFT JOIN tags as a  on a.id = c.tid LEFT JOIN articles as b on b.id = c.aid where c.aid = ?',
        // queryAll: 'SELECT * from tag_links as c LEFT JOIN tags as a  on a.id = c.tid RIGHT JOIN articles as b on b.id = c.aid WHERE b.delOr != 1',
        queryAll: 'SELECT * from tag_links as c LEFT JOIN tags as a  on a.id = c.tid RIGHT JOIN articles as b on b.id = c.aid',
        delById: 'DELETE FROM articles WHERE id = ?',
        updById: 'UPDATE articles SET ? FROM WHERE id = ?'
    },
    tag: {
        queryById: 'select * from articles where id=?',
        queryAll: 'select * from tags'
    },
    comment: {
        insert: 'INSERT INTO comments(article_id, user_id, user_name, reply_id, reply_name, content, time, reminder, email) VALUES (?,?,?,?,?,?,?,?,?)',
        queryAll: 'select * from comments',
        queryByActicleId: 'select * from comments where article_id = ?'
    },
    user: {
        update:'update users set avatar=? where username=236338364',
        queryAll: 'select * from users',
        queryByEmail: 'select * from users where email=?',
        insert: 'INSERT INTO users(name, email, password, root, avatar) VALUES (?,?,?,0,?)',
    }
}

module.exports = sqlMap;