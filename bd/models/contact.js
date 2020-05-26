const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('userModel');

let contactSchema = new Schema({
  _id: {type: Schema.ObjectId, auto: true},
  name: String,
  lastName: String,
  email: String,
  address: String,
  phone: Number,
  usuario: {type: Schema.ObjectId, ref: "userModel"}
}, {collection: 'contacto'});

module.exports = mongoose.model('contactModel',contactSchema)
