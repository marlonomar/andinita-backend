'use strict'

const express = require('express');
const userController = require('../controllers/Users');
const api = express.Router();
const tokenAtutentication = require('../middelwares/autenticarToken');
const token = tokenAtutentication.ensureAuth;
const multipart = require('connect-multiparty');
const multipartMiddelware = multipart({uploadDir:'./images'});


api.get('/show-users',token,userController.getActiveUsers);
api.get('/user/:id',token,userController.getUser);
api.get('/deleted-users',token,userController.getDeleteUsers);
api.get('/show-all-users/:page?',token,userController.getAllUsers);
api.get('/get-image-user/:imageFile',token,userController.getImage);
api.post('/create-user',userController.createUser);
api.post('/login',userController.loginUser);
api.post('/upload-avatar/:id',multipartMiddelware,token,userController.uploadAvatar);
api.put('/upload-user/:id',token,userController.UploadUser);
api.put('/reactive-user/:id',token,userController.reactiveUser);
api.delete('/delete-user/:id',token,userController.DeleteUser);


module.exports = api;