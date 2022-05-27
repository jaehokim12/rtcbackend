// db user modeling
// mongoose db 정도 담겨 있는 파일 중 user table(schema) 만 접근
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
});
module.exports = mongoose.model('user', userSchema);
