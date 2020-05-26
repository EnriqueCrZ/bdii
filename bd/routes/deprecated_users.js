var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  dpi: Number,
  name: String,
  lastName: String,
  password: String,
  email: String,
  address: String
}, {collection: 'users'});

var userModel = mongoose.model('userModel',userSchema)

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find().then(function(doc){
    res.render('users',{items:doc});
  });
});

/* POST user insert */
router.post('/users/insert',function(req,res,next) {
  var item = {
    dpi: req.body.dpi,
    name: req.body.name,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    address: req.body.address
  };
  var data = new userModel(item);
  data.save();

  res.redirect('/');
});

module.exports = router;
