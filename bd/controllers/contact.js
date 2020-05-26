const express = require('express');
const session = require('express-session');
var app = express();
app.use(session({secret:'XASDASDA'}));
const bodyParser = require('body-parser');
const Contact = require('../models/contact');
const Users = require('../models/users');

//vars
var ssn;


// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//mongoose.connect('mongodb://localhost:27017/test');



//create user
exports.create = function(req,res) {
  
  ssn=req.session;
  console.log('Creando...');
  
  //crear
  var contact = {
    name: req.body.name,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    usuario: ssn._id
  };
  var data = new Contact(contact);
  data.save();

  res.redirect('/contact');

};

//index
exports.index = function(req,res) {
  ssn=req.session;

  Contact.find({usuario:ssn._id}).then(function(doc){
    res.render('contacts',{items:doc});
  });
};

//user update
exports.update = function(req,res) {

  console.log(req.body);

  Contact.findOne({
    _id: req.params.contactId
  })
  .then((contact) => {
    contact.name = req.body.name;
    contact.lastName = req.body.lastName;
    contact.email = req.body.email;
    contact.address = req.body.address;
    contact.phone = req.body.phone;
    contact.save();
  
  });

    //Find user and update it

    /*Users.findByIdAndUpdate(req.params.userId, function(err, us){
      if (err){
        return res.status(404).send({
          message: "No se ha encontrado el usuario."
        });
      }
      us.dpi = req.body.dpi || "El campo DPI esta vacio";
      us.name = req.body.name;
      us.lastName = req.body.lastName;
      us.email = req.body.email;
      us.address = req.body.address;
      us.save();
    });*/
    res.send('Aparcado');
};

//delete user
exports.delete = function(req,res) {
  const id = req.params.id;

      Users.deleteOne({
        _id:id
      }, function(err,us){
        if(err){
          return res.status(404).send({
            message: "No se ha encontrado el usuario."
          });
        };
      })
};

exports.test = function(req,res){
  ssn = req.session;
console.log(ssn);
  Contact.find({usuario: ssn.id},function(err,us){
      res.status(200).send(us);
  });
}


