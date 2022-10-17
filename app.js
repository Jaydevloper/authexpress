const express = require('express');
const app = express();
// const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const routes = require('./routes/route')
const port = process.env.PORT || 5000
mongoose.connect('mongodb+srv://jony:hfurewihfsihSUQiwd@cluster0.gcxoi8p.mongodb.net/regis',() =>{
    console.log("mongoose connect");
})
app.use(routes)
app.get('/', (req,res) =>{
   
    res.send('Nma gap')
})
//fiueioHUEFDHUEasdwq
//hfurewihfsihSUQiwd
app.listen(port, () =>{
    console.log(`Server open the ${port}...`);
})