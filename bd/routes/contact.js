const express = require('express');
const router = express.Router();


const contactController = require('../controllers/contact.js');

  //create
  router.post('/contact_new', contactController.create);

  //index
  router.get('/',contactController.index);

  //update
  router.put('/update/:contactId',contactController.update);

  //delete
  router.post('/del',contactController.delete);

  router.get('/test',contactController.test);
module.exports = router;
