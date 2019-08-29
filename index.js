//SERVER
require('./app');

//MONGOOSE
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://marlonGuerrero:12345@proyects-6wfz7.mongodb.net/test',{ useNewUrlParser: true },(err,res)=>{
    if(err){
        throw err
    }else{
        console.log('connect mongodb...')
    }
});

//RUTAS
require('./routes/Productos')
