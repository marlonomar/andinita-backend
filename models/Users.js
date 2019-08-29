'use strict'

const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let User = new Shema({
    name:{
        type:String,
        required:[true,'the name is required']
    },
    surname:{
        type:String,
        required:[true,'the surname is required']
    },
    nickname:{
        type:String,
        unique:true,
        required:[true,'the nickname is required']
    },
    email:{
        type:String,
        unique: true,
        required:[true,'the emial is required']
    },
    password:{
        type:String,
        required:[true,'the password is required']
    },
    role:{
        type:String,
        default : 'user'
    },
    image:{
        type:String,
        default:null
    },
    active:{
        type: Boolean,
        default: true
    },
    phone:{
        type:String,
        required:[true,'the phone is required']
    }
});

User.plugin(uniqueValidator , {mensagem :'{PATH} it already exists'})
module.exports = mongoose.model('User',User);