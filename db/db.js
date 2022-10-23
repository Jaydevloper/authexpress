const mongoose = require('mongoose');
module.exports = () =>{
    try{
        mongoose.connect('mongodb://localhost:27017/admin',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },() =>{
            console.log("mongoose connect");
        })
    }catch(err){ 
        console.log(err);
        console.log('Database falied!');
    }
}
//fjaoksjfojafasS
//mongodb+srv://tenctaion:fjaoksjfojafasS@cluster0.4ns0ply.mongodb.net/signup