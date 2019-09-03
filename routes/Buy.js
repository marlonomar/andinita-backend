const express = require('express');
const api = express.Router();
const BuyController = require('../controllers/Buy');

api.post('/create-buy',BuyController.createBuy);

module.exports = api;