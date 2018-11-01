const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: { type: String, default: '', unique: true },
  createdTime: { type: Number, default: null },
  upadteTime: { type: Number, default: null },
}, {
  collections: 'tag'
})

module.exports = mongoose.model('Tag', tagSchema, 'tag')