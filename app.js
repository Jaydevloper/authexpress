const express = require('express');
const app = express();
const cors = require("cors");
const routes = require('./routes/route')

const port = process.env.PORT || 5000

require('dotenv').config()

const connect = require('./db/db')
connect();

app.use(cors());
app.use(routes)

app.get('/', (req,res) =>{
    res.status(200).json({message:"nfanj"})
})

//https://testexpressas.herokuapp.com/
app.listen(port, () =>{
    console.log(`Server open the ${port}...`);
})