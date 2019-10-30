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
            name:req.body.name,
            username: req.body.username.trim(),
            role: req.body.role,
            preference: req.body.preference,
            email:req.body.email.trim(),
            verificationCode: gen(),
            password:req.body.password,
        }
        userService.RegisterUser(Options).then((data)=>{
            console.log(data)
            res.status(201).json(data);
        }).catch((err)=>{
            res.status(400).json(err);
            console.log(err)
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
        const token = req.params.token
        userService.verifyAccount(token)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err));
    }
    this.uploadAvatar = function(req, res){
        userService.uploadAvatar()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(200).send(err))
    }
}