const express = require('express');
const router = express.Router();


const users_controller = require('../controllers/users.js');

  //create
  router.post('/user_new', users_controller.create);

  //index
  router.get('/',users_controller.index);

  //update
  router.put('/update/:userId',users_controller.update);

  //delete
  router.post('/del',users_controller.delete);
  
  //login
  router.post('/login',users_controller.login)
  
  router.get('/logout',users_controller.logout)

  router.get('/test',users_controller.test);
module.exports = router;
