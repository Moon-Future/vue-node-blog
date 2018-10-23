const mongoose = require('mongoose')
const Schema = mongoose.Schema
const currentTime = new Date().getTime()
const birth = new Date('1992-06-21').getTime()

const characterSchema = new Schema({
  name: String,
  nickName: String,
  from: { type: String, default: 'ACG' },
  sex: { type: Number, default: 1 }, // 男 1, 女 0
  age: { type: Number, default: 18 },
  birth: { type: Number, default: birth },
  createdTime: { type: Number, default: currentTime },
  upadteTime: { type: Number, default: null },
  hot: { type: Number, default: 0 },
  recommend: { type: Number, default: 0 },
  alias: { type: Array, default: [] },
  spell: String,
  avatar: String,
  avatarWeb: String,
  key: { type: String, unique: true }, // name-form
  voice: [{type: Schema.Types.ObjectId, ref: 'voice'}],
  image: [{type: Schema.Types.ObjectId, ref: 'image'}]
}, {
  collections: 'character'
})

module.exports = mongoose.model('Character', characterSchema, 'character')