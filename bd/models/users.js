const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: {type: Schema.ObjectId, auto: true},
  dpi: Number,
  name: String,
  lastName: String,
  password: String,
  email: String,
  address: String
}, {collection: 'users'});

module.exports = mongoose.model('userModel',userSchema)
