const express = require('express')
const router = express.Router()
const users = require('../modules/user');
const newUser = require('../modules/crud')
const bcrypt = require('bcrypt');     
    router.use(express.json());
    router.use(express.urlencoded({extended:true}));
    router.post('/signup',  (req,res) =>{
            const{name,email,password} = req.body;  
            if (!name || !email || !password){
                 res.status(400).json({error:"Please enter all required fileds"})
            }
            if (password.length > 10){
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
    router.post('/user/create', (req,res) =>{
        const{userName,userEmail} = req.body;
        const user = new newUser({
            userName,
            userEmail
        }) 
        user.save()
        res.status(200).json({message:'User created successfully!'})
    })
    router.delete('/user/delete/:id', (req, res) => {
        newUser.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      });
      router.put('/user/edit/:id', (req, res) => {
        const{userName,userEmail} = req.body;
        const thing = new newUser({
          _id: req.params.id,
          userName,
          userEmail
        });
        newUser.updateOne({_id: req.params.id}, thing).then(
          () => {
            res.status(200).json({
              message: 'Thing updated successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            }); 
          }
        );
      });  
    router.get(('/user') , (req,res) =>{
        newUser.find()
        .then((data) =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).send(err)
        })
    })
    
module.exports = router;