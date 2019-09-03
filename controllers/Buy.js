let Buy = require('../models/Buy');


function error (res,err){
    res.status(500).send({mensaje: 'error en la peticion' , error : err});
}

function createBuy (req,res){

    let body = req.body;
    let buy = new Buy({
        product: body.product,
        price : body.price,
        quantity : body.quantity,
        total: body.total
    });

    buy.save((err,newBuy)=>{

        if(err) return error (res,err);

        return res.status(200).send({
            success : true,
            buy :newBuy
        });
    })
}

module.exports ={
    createBuy
}