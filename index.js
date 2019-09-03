//SERVER
require('./app');

//MONGOOSE
const mongoose = require('mongoose');
var mongoAtlas = 'mongodb+srv://marlonGuerrero:12345@proyects-6wfz7.mongodb.net/test';
var mongoLocal = 'mongodb://localhost:27017/Andinita';
mongoose.connect(mongoAtlas,{ useNewUrlParser: true },(err,res)=>{
    if(err){
        throw err
    }else{
        console.log('connect mongodb...')
    }
});

//RUTAS
require('./routes/Productos')
