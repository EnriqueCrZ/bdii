const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let typeUserSchema = new Schema({
  _id: {type: Schema.ObjectId, auto: true},
  tipo: String,
  
}, {collection: 'tipo_usuario'});

module.exports = mongoose.model('typeUser',typeUserSchema)
