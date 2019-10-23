const authController = require('../controllers/AuthController');

const router = require('express').Router();
module.exports = function(){
    const authCtrl = new authController();
    router.post('/register', authCtrl.register);
    router.post('/authenticate', authCtrl.authenticate);
    router.post('/Verify' , authCtrl.VerifyUser);


    return router;
}