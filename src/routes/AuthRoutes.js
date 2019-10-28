const authController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();
module.exports = function() {
  const authCtrl = new authController();
  router.post("/register", authMiddleware.signUp, authCtrl.register);
  router.post(
    "/authenticate",
    authMiddleware.authenticate,
    authCtrl.authenticate
  );
  router.post("/Verify", authCtrl.VerifyUser);
  return router;
};
