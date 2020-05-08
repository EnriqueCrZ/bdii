var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String
}, {collection: 'users'});

var userModel = mongoose.model('userModel',userSchema)

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find().then(function(doc){
    res.render('users',{items:doc});
  });
});

module.exports = router;
