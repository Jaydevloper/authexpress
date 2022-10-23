const mongoose = require('mongoose')

const crudSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    userEmail:{
        type:String
    }
}) 
const newUser = mongoose.model("newUser",crudSchema);

module.exports = newUser;
