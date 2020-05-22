const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users');

//mongoose.connect('mongodb://localhost:27017/test');



//create user
exports.create = function(req,res) {
  // if(!req.body.dpi){
  //   return res.status(400).send({
  //     message: "El contenido esta vacio."
  //   });
  // }

  //crear
  var user = {
    dpi: req.body.dpi || "El campo DPI esta vacio",
    name: req.body.name,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    address: req.body.address
  };
  var data = new Users(user);
  data.save();

  res.redirect('/users');

};

//index
exports.index = function(req,res) {
  Users.find().then(function(doc){
    res.render('users',{items:doc});
  });
};

//user update
exports.update = function(req,res) {

    //Find user and update it
    Users.findByIdAndUpdate(req.params.userId, function(err, us){
      if (err){
        return res.status(404).send({
          message: "No se ha encontrado el usuario."
        });
      }
      us.dpi = req.body.dpi || "El campo DPI esta vacio";
      us.name = req.body.name;
      us.lastName = req.body.lastName;
      us.password = req.body.password;
      us.email = req.body.email;
      us.address = req.body.address;
      us.save();
    });
    res.redirect('/');
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
        }
        if(!us)
      })
};

exports.test = function(req,res){
   res.send('Greetings from the Test controller!');
};
