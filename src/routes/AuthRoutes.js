const authController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

module.exports = function() {
  const authCtrl = new authController();

  router.post("/register", authMiddleware.signUpValidator, authCtrl.register);
  
  router.post(
    "/authenticate",
    authMiddleware.signInValidator, 
    authCtrl.authenticate
  );

  router.put("/Verify/:token", authCtrl.VerifyUser);

  return router;
};
