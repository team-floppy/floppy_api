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
  router.put("/Verify/:token", authCtrl.VerifyUser);
  router.put("/follow/:id", authMiddleware.authorizeAll, authCtrl.followComedian)
  router.get("/followers/:id", authMiddleware.authorizeComedian, authCtrl.getFollowers) 
  return router;
};