const express = require('express');
const api = express.Router();
const productosControllers = require('../controllers/Productos');
const multipart = require('connect-multiparty');
const multipartMiddelware = multipart({uploadDir:'./images'});

api.get('/producto',productosControllers.getProductos);
api.get('/image/:image',productosControllers.getImage);
api.get('/get-producto/:id',productosControllers.getProducto);
api.post('/new-producto',productosControllers.createProducto);
api.post('/upload-file/:id',multipartMiddelware , productosControllers.uploadPhotoProducto);
api.put('/edit-producto/:id',productosControllers.updateProducto);
api.put('/available-producto/:id',productosControllers.availableProducto);
api.delete('/unavailable-producto/:id',productosControllers.unavailableProducto);


module.exports = api;