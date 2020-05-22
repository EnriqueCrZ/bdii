const express = require('express');
const router = express.Router();


const users_controller = require('../controllers/users.js');

  //create
  router.post('/user_new', users_controller.create);

  //index
  router.get('/',users_controller.index);

  //update
  router.put('/:userId/update',users_controller.update);

  //delete
  router.delete('/:userId',users_controller.delete);

  router.get('/test',users_controller.test);
module.exports = router;
