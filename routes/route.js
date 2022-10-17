const express = require('express')
const router = express.Router()
const users = require('../modules/user');
const bcrypt = require('bcrypt');  

    router.use(express.json());
    router.use(express.urlencoded({extended:true}));
    router.post('/signup',  (req,res) =>{
            const{name,email,password} = req.body;
            if (!name || !email || !password){
                 res.status(400).json({error:"Please enter all required fileds"})
            }
            if (password.length > 8){
                 res.status(400).json({
                    error:"Please enter a password at least 8 charecters"
                })
            }
            users.findOne({email})
            .then(savedUser =>{
                if(savedUser){
                    return res.status(400).json({error:'user already exists'})
                }
                bcrypt.hash(password,10)
                .then(hash =>{
                    const User = new users({
                        name,
                        email,
                        password:hash
                    });
                    User.save()
                    .then(User =>{
                        res.status(200).json({
                            message:"User created succssefully",
                            User
                        })
                    })
                    .catch(err =>{
                        res.status(500).json({message:err})
                    })
                })
            })
    });
    router.post ('/login' , (req,res) =>{
        const {email,password} = req.body;
        users.findOne({email})
        .then(user =>{
            if (!user) res.status(400).json({error:'Use does not exists'})
            bcrypt.compare(password, user.password)
            .then(isMatch =>{
                if(!isMatch) res.status(400).json({error:"Invalid credentials"})
                else {
                    res.status(200).json({
                        message:"Login successeful",
                        user
                    })
                }
            })
        })
    })
module.exports = router;