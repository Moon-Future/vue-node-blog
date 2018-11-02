const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: { type: String, default: '', unique: true },
  createTime: { type: Number, default: null },
  updateTime: { type: Number, default: null },
}, {
  collections: 'tag'
})

module.exports = mongoose.model('Tag', tagSchema, 'tag')