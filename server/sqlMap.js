var sqlMap = {
    article: {
        queryById: 'SELECT * FROM tag_links as c LEFT JOIN tags as a  on a.id = c.tid LEFT JOIN articles as b on b.id = c.aid WHERE c.aid = ?',
        // queryAll: 'SELECT * FROM tag_links as c LEFT JOIN tags as a  on a.id = c.tid RIGHT JOIN articles as b on b.id = c.aid WHERE b.delOr != 1',
        queryAll: 'SELECT * FROM tag_links as c LEFT JOIN tags as a  on a.id = c.tid RIGHT JOIN articles as b on b.id = c.aid',
        delById: 'DELETE FROM articles WHERE id = ?',
        updById: 'UPDATE articles SET ? FROM WHERE id = ?'
    },
    tag: {
        queryById: 'SELECT * FROM articles WHERE id=?',
        queryAll: 'SELECT * FROM tags'
    },
    comment: {
        insert: 'INSERT INTO comments(article_id, user_id, user_name, reply_id, reply_name, content, time, reminder, email) VALUES (?,?,?,?,?,?,?,?,?)',
        queryAll: 'SELECT * FROM comments',
        queryByActicleId: 'SELECT * FROM comments WHERE article_id = ?'
    },
    user: {
        update:'UPDATE users SET avatar = ? WHERE id = ?',
        queryAll: 'SELECT * FROM users',
        queryByEmail: 'SELECT * FROM users WHERE email=?',
        insert: 'INSERT INTO users(name, email, password, root, avatar) VALUES (?,?,?,0,?)',
    }
}

module.exports = sqlMap;