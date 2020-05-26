const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tipoUsuario = mongoose.model('typeUser');

let userSchema = new Schema({
  _id: {type: Schema.ObjectId, auto: true},
  dpi: Number,
  name: String,
  lastName: String,
  password: String,
  email: String,
  address: String,
  tipo_usuario: {type: Schema.ObjectId, ref: "typeUser"}
}, {collection: 'users'});

module.exports = mongoose.model('userModel',userSchema)
