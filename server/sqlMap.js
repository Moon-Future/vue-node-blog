var sqlMap = {
    article: {
        queryById: 'SELECT * FROM tag_links as c LEFT JOIN tags as a on a.id = c.tid LEFT JOIN articles as b on b.id = c.aid WHERE c.aid = ?',
        // queryAll: 'SELECT * FROM tag_links as c LEFT JOIN tags as a  on a.id = c.tid RIGHT JOIN articles as b on b.id = c.aid WHERE b.delOr != 1',
        queryAll: 'SELECT * FROM tag_links as c LEFT JOIN tags as a on a.id = c.tid RIGHT JOIN articles as b on b.id = c.aid',
        delById: 'DELETE FROM articles WHERE id = ?',
        updById: 'UPDATE articles SET ? FROM WHERE id = ?',
        insert: 'INSERT INTO articles(user_id, author, title, state, type, loadURL, summary, post_time, upd_time, view, start, image, filePath) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',

    },
    tag: {
        queryById: 'SELECT * FROM articles WHERE id=?',
        queryAll: 'SELECT * FROM tags'
    },
    comment: {
        insert: 'INSERT INTO comments(article_id, user_id, reply_id, reply_comment_id, content, time) VALUES (?,?,?,?,?,?)',
        queryAll: 'SELECT * FROM comments',
        // queryByActicleId: 'SELECT * FROM comments WHERE article_id = ?'
        queryByActicleId: 'SELECT c.id, c.article_id, c.user_id, c.reply_id, c.reply_comment_id, c.content, c.time, v.name as user_name, v.avatar, vi.name as reply_name FROM visitors as v RIGHT JOIN comments as c on c.user_id = v.id LEFT JOIN visitors as vi on c.reply_id = vi.id WHERE c.article_id = 1'
    },
    user: {
        update: 'UPDATE users SET avatar = ? WHERE id = ?',
        queryAll: 'SELECT * FROM users',
        queryByEmail: 'SELECT * FROM users WHERE email = ?',
        insert: 'INSERT INTO users(name, email, password, root, avatar) VALUES (?,?,?,0,?)',
    },
    visitor: {
        insert: 'INSERT INTO visitors(name, email, website, avatar, reminder) VALUES (?,?,?,?,?)',
        queryByEmail: 'SELECT * FROM visitors WHERE email = ?',
        updByEmail: 'UPDATE visitors SET name = ?, website = ?, avatar = ?, reminder = ? WHERE email = ?'
    }
}

module.exports = sqlMap;