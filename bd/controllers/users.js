const express = require('express');
const session = require('express-session');
var app = express();
app.use(session({secret:'XASDASDA'}));
const bodyParser = require('body-parser');
const TypeUser = require('../models/tipoUsuario');
const Users = require('../models/users');

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

  console.log(req.body);

  Users.findOne({
    _id: req.params.userId
  })
  .then((user) => {
    user.dpi = req.body.dpi;
    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.address = req.body.address;
    user.save();
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
   Users.find({},function(err,us){
     TypeUser.populate(us, {path:"tipo_usuario"},function(err,us){
       res.status(200).send(us);
     });
   });

   //res.send('Greetings from the Test controller!');
};

exports.login = function(req,res){
  Admin = TypeUser.findOne({tipo: "Administrador"},function(err,rol){
    Users.findOne({email: req.body.email, password: req.body.password}, function(err, user){
      if(err){
        console.log(err);
      }else if(user){
        ssn=req.session;
        ssn.email = user.email;
        ssn._id = user._id;
        console.log(ssn._id);
      
        if(user.tipo_usuario.equals(rol._id)){
          res.redirect('/users');
        }else{
          res.redirect('/contact');
        }
      }else{
        res.redirect('/users/login');
      }
    })
  })
}

exports.logout = function(req,res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('/');
    }
  });
};
