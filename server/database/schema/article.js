const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: { type: String, default: '' },
  summary: { type: String, default: '' },
  content: { type: String, default: '' },
  comment: { type: Array, default: [] },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  createdTime: { type: Number, default: null },
  upadteTime: { type: Number, default: null },
  view: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  type: { type: String, default: '1' }, // 类型 {'': 原创, 'url': 转载链接}
  state: { type: Number, default: 0 }, // 状态 {0: 删除, 1: 显示, 2: 不显示}
}, {
  collections: 'article'
})

module.exports = mongoose.model('Article', articleSchema, 'article')