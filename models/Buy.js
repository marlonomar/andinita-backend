'use strict'

const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let Buy = new Shema({
    
    product:{
        type:String,
        required:[true,'the product is required']
    },
    price :{
        type:Number,
        required:[true,'the price is required']
    },
    quantity :{
        type:Number,
        required:[true,'the quantity is required']
    },
    total :{
        type:Number,
        required:[true,'the total is required']
    }
    
});

Buy.plugin(uniqueValidator , {mensagem :'{PATH} it already exists'})
module.exports = mongoose.model('Buy',Buy);