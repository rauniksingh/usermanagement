const express = require('express'),
      app = express.Router(),
      user = require('../services/user');

app.get('/users', user._getUsers)
   .post('/users', user._addUser)
   .get('/users/:id', user._getUser)
   .put('/users/:id', user._updateUser)
   .delete('/users/:id', user._deleteUser) 

module.exports = app;      