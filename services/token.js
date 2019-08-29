'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'soyUnToken:3';

exports.createToken = function(user){

    let paiload ={
        sub : user._id,
        name : user.name,
        surname: user.surname,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
        image: user.image,
        iat : moment().unix(),
        exp : moment().add(30,'days').unix()
    };

    return jwt.encode(paiload, secret);

}