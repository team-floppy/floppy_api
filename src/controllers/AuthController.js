const userService = require('../services/AuthService');
const mongoose = require('mongoose');
const rand = require('random-number');
const gen = rand.generator({
  min:  1000
, max:  100000
, integer: true
})

module.exports = function authController(){
    this.register = (req,res, next)=>{
        const Options ={
            username: req.body.username,
            name:req.body.name,
            email:req.body.email,
            verificationCode: gen(),
            password:req.body.password,
        }
        userService.RegisterUser(Options).then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json(err);
        })
    }

    this.authenticate = function(req, res, next){
        const username = req.body.username
        const password = req.body.password
        userService.authenticateuser(username,password)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }

    this.VerifyUser = function(req, res){
        const email = req.body.email
        const Token = req.body.token
        userService.verifyAccount(email , Token)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
  
}