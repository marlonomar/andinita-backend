//SERVER

const express = require('express');
const app = express();
const url = require('./config/url');
//BODY PARSER
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors

app.options(url, function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Access-Control-Max-Age", "1728000");
    return res.sendStatus(200);
 });

//ROUTES
let producto =require('./routes/Productos');
let users = require('./routes/User');

//RUTAS
app.use('/productos',producto);
app.use('/Users',users);

//Canal del servidor

var server = process.env.PORT || 3000;
app.listen(server,()=>{
    console.log('server http://localhost:3000');
})

module.exports = {app};