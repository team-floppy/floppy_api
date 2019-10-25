const userService = require('../services/AuthService');
var mongoose = require('mongoose');
var rand = require('random-number');
var gen = rand.generator({
  min:  1000
, max:  100000
, integer: true
})

module.exports = function authController(){
    this.register = (req,res, next)=>{
        var Options ={
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
        var username = req.body.username
        var password = req.body.password
        userService.authenticateuser(username,password)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }

    this.VerifyUser = function(req, res){
        var email = req.body.email
        var Token = req.body.token
        userService.verifyAccount(email , Token)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
  
}