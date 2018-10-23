const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  avatar: { type: String, default: '' },
  website: { type: String, default: '' },
  remind: { type: Number, default: 0 }, // 邮件提醒
  root: { type: Number, default: 0 },
}, {
  collections: 'user'
})

module.exports = mongoose.model('User', userSchema, 'user')