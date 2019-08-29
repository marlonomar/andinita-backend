
let Producto = require('../models/Productos');
const fs = require('fs');
const url = require('../config/url');
const path = require('path');

function error (res,err){
    res.status(500).send({mensaje: 'error en la peticion' , error : err});
}

function getProductos(req,res){
    
    Producto.find({ availability : true })
          .exec((err,producto)=>{
              if(err){
                error (res,err)
              }

              return res.send({
                  success: true,
                  producto
              })
          })
}

function getProducto(req,res){
    let id = req.params.id;
    Producto.find({_id : id}).exec((err,producto)=>{
        if(err) return error (res,err);

        return res.status(200).send({
            success:true,
            producto
        })
    })
}

function createProducto (req,res){
    let body = req.body;

    let producto = new Producto({
        title : body.title,
        description : body.description,
        price : body.price,
        typeProduct : body.typeProduct
    });

    producto.save((err,producto)=>{

        if(err) return error (res,err);

        return res.status(200).send({
            success : true,
            producto :producto
        });
    })
}

function uploadPhotoProducto(req,res){
    let id = req.params.id;
    let nameFile = "no se subio la imagen";

    if(req.files){

        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let filename = fileSplit[1];
        let fileExtSplit = filename.split('\.');
        let fileExt = fileExtSplit[1].toLowerCase();
        let ruta = url+'/productos/image/'+filename;
        
        Producto.findByIdAndUpdate(id,{image: ruta}, {new:true},(err,producto)=>{
            if(err) return error (res,err);

            if(!producto) return res.status(404).send({success: false , mensaje :'producto no encontrado'});

            if(fileExt == 'jpg' || fileExt == 'png'||  fileExt == 'jpeg' || fileExt == 'gif' ){

                return res.status(200).send({
                    success: true,
                    producto
                });

            }
            
            else{

                fs.unlink(filePath,(err)=>{
                    return res.status(401).send({
                        success: false,
                        mensaje : 'formato invalido'
                    })
                })
                
            }
        });
    }
    else{
        return res.status(500).send({
            success: false,
            files : nameFile
        })
    }
}

function updateProducto(req,res){
    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id,body,{new:true},(err,producto)=>{

        if(err) return error (res,err);

        return res.status(200).send({
            success: true,
            producto : producto
        });

    });
}

function unavailableProducto(req,res){
    let id = req.params.id;
    let availability = {
        availability : false
    }

    Producto.findByIdAndUpdate(id,availability,{new:true},(err,producto)=>{

        if(err) return error (res,err);

        return res.status(200).send({
            success: true,
            producto : producto
        });

    });
}

function availableProducto(req,res){
    let id = req.params.id;
    let availability = {
        availability : true
    }

    Producto.findByIdAndUpdate(id,availability,{new:true},(err,producto)=>{

        if(err) return error (res,err);

        return res.status(200).send({
            success: true,
            producto : producto
        });

    });
}

function getImage(req,res){

    let file = req.params.image;
    let path_file = './images/'+file;
    
    fs.exists(path_file, (exists)=>{
        if(exists){
            return res.sendFile(path.resolve(path_file));
        }else{
            return res.status(500).send({
                success: false,
                mensaje : 'imagen no econtrada'
            })
        }
    })
}

module.exports ={
    getProductos,
    createProducto,
    updateProducto,
    unavailableProducto,
    availableProducto,
    uploadPhotoProducto,
    getImage,
    getProducto
}
