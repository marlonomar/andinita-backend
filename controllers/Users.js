'use strict'

const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('../services/token');
const mongoosePagination = require('mongoose-pagination');
const path = require('path');
const fs = require('fs');


function getAllUsers (req,res){
    var page = 1;
    
    if(req.params.page){
        page = req.params.page;
    }

    var itemForPage = 2;

    User.find().sort('name').paginate(page,itemForPage,(err,users,total)=>{
        if(err) return res.status(403).send({success:false,mensaje:'Error en la peticion'});

        if(!users) return res.status(404).send({success:false,mensaje:'no hay usuarios a mostrar'});

        return res.status(200).send({
            users,
            total,
            pages : Math.ceil(total/itemForPage)
        });
    })
}

function getActiveUsers (req,res){

    User.find({active : true}).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                success: false,
                err
            })
        }else{
            res.json({
                success:true,
                user,
                total : user.length
            })
        }
    })
}

function getDeleteUsers (req,res){

    User.find({ active : false}).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                success: false,
                err
            })
        }else{
            res.json({
                success:true,
                user,
                total : user.length
            })
        }
    })
}

function createUser (req,res){

    let body = req.body;

    let user = new User({
        name : body.name,
        surname : body.surname,
        nickname : body.nickname,
        email : body.email,
        password : bcrypt.hashSync(body.password,10),
        role: body.role,
        image : body.image,
        phone : body.phone
    });

    user.save((err,user)=>{

       if(err){
           res.status(500).json({
               success:false,
               err
           })
       }
       
       else{
            res.status(200).json({
                success : true,
                user :user
            })
       }
       
    })
    
}

function UploadUser (req,res){
    let id = req.params.id;
    let body = req.body;
    
    User.findByIdAndUpdate(id,body,{new:true},(err,usuario)=>{
        if(err){
            return res.status(400).json({
                success: false,
                err
            })
        }
        res.json({
            success:true,
            user: usuario
        })
    })
}

function DeleteUser (req,res){
    let id = req.params.id;
    let active= {
        active:false
    }
    User.findByIdAndUpdate(id,active,{new : true},(err,remove)=>{

        if(err){
            return res.status(400).json({
                success: false,
                err
            })
        }
    
        if(!remove){
            return res.status(400).json({
                success: false,
                err : {
                    mensaje : 'registro no encontrado'
                }
            })
        }
    
        res.json({
            delete: true,
            registro: remove
        })
    
       })
}

function reactiveUser(req,res){
    let id = req.params.id;
    let active= {
        active:true
    }
    User.findByIdAndUpdate(id,active,{new : true},(err,reactive)=>{

        if(err){
            return res.status(400).json({
                success: true,
                err
            })
        }
    
        if(!reactive){
            return res.status(400).json({
                success: false,
                err : {
                    mensaje : 'registro no encontrado'
                }
            })
        }
    
        res.json({
            active: true,
            registro: reactive
        })
    
       })
}

function getUser(req,res){
    let id = req.params.id;
    User.find({_id : id}).exec((err,user)=>{

       if(user){

            if(err){
                return res.status(400).json({
                    success: false,
                    err
                })
            }

            if(id == req.user.sub){
                res.json({
                    success:true,
                    user:user
                });
                
            }else{
                res.json({
                    success:false,
                    mensaje:'Usuario no existe'
                }) 
            }
       }

       else{
           return res.status(404).send({
               mensaje: 'No hay usuarios en la base de datos'
           })
       }
    });
}

function loginUser(req,res){
    let params = req.body;
    let email = params.email;
    let password = params.password;

    User.findOne({email:email},(err,user)=>{

        if(err) return res.status(500).res.json({success:false,mensaje:'error en la peticion'});

        if(user){

            bcrypt.compare(password, user.password, (err,check)=>{

                if(check){
                    user.password = undefined;
                    if(user.active == true){
                        if(params.token){
                            return res.status(200).json({
                                token: jwt.createToken(user)
                            })
                        }
                        else{
                            return res.status(200).json({
                                success:true,
                                mensaje: 'Usuario Identificado',
                                user : user
                            })
                        }
                    }
                    else{
                        return res.status(404).send({success:false,mensaje:'Usuario inactivo'})
                    }

                }

                else{
                    return res.status(404).send({success:false,mensaje:'clave invalida'});
                }
            })
        }

        else{
            return res.status(404).send({success:false,mensaje:'usuario invalido'});
        }
    })
}

function uploadAvatar (req,res){
    let id = req.params.id;
    let fileName = 'imagen no subida...';
    
    if(req.files){

        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[1];
        let fileExtSplit = filePath.split('\.');
        let fileExt = fileExtSplit[1];

        if(id != req.user.sub){
             return removeFile(res,filePath,'usuario invalido')
        }
       
        if(fileExt == 'jpg' || fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'gif' || fileExt == 'JPG' || fileExt == 'PNG' || fileExt == 'JPEG' || fileExt == 'GIF'){
            User.findByIdAndUpdate(id,{image : fileName},{new :true} , (err,user)=>{

                if(err) return res.status(500).send({mensaje:'la imagen no se ha subido'});
    
                if(!user) return res.status(404).send({mensaje:'el proyecto no existe'});
    
                return res.status(200).send({
                    user : user
                });
        
            })
        }else{

             return removeFile(res,filePath,'extencion no valida')
            
        }

    }else{
        return res.status(200).send({
            mensaje : fileName
        });
    }

    function removeFile(res,filePath,mensaje){

        fs.unlink(filePath,(err)=>{
            return res.status(200).send({
                mensaje : mensaje
            });
        })
    }
}

function getImage(req,res){

    let imageFile = req.params.imageFile;
    let filePath = './uploads/'+imageFile;
    console.log(req.user)
    fs.exists(filePath,(exist)=>{
        if(exist){
            return res.sendFile(path.resolve(filePath));
        }else{
            return res.status(404).send({
                mensaje: 'no existe esa imagen'
            })
        }
    })
}

module.exports ={
    getAllUsers,
    createUser,
    UploadUser,
    DeleteUser,
    getActiveUsers,
    getUser,
    getDeleteUsers,
    loginUser,
    reactiveUser,
    uploadAvatar,
    getImage
}

