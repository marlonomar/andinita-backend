'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'soyUnToken:3';

exports.ensureAuth = function(req,res,next){

    if(!req.headers.Authorization){
        return res.status(403).send({success: false, error : 'no existe la cabezera Authorization'});
    }

    var token = req.headers.Authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.decode(token ,secret);
        var dataExpiration = payload.exp;
        var dataActual = moment().unix();

        if(dataExpiration <= dataActual){

            return res.status(404).send({
                success:false,
                mensaje: 'token ya expirado'
            })
        }

    }

    catch(ex){
        return res.status(404).send({
            success:false,
            mensaje: 'token no valido'
        })
    }

    req.user = payload;

    next();

}

