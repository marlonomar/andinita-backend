//SERVER

const express = require('express');
const app = express();

//BODY PARSER
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
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