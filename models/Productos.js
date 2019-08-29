'use strict'

const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let Producto = new Shema({
    title:{
        type:String,
        required:[true,'the title is required']
    },
    description:{
        type:String,
        required:[true,'the description is required']
    },
    price:{
        type:Number,
        required :[true,'the price is required']
    },
    availability:{
        type: Boolean,
        default: true
    },
    typeProduct:{
        type:String,
        required:[true,'the type of the product is required']
    },
    image:{
        type: String,
        default: null
    }
});

Producto.plugin(uniqueValidator , {mensagem :'{PATH} it already exists'})
module.exports = mongoose.model('Producto',Producto);