const AuthRoutes = require("./AuthRoutes");
const UserRoutes = require("./UserRoutes");
const VideRoutes = require("./VideoRoutes");

module.exports = router => {
  router.use("/auth", AuthRoutes());
  router.use("/user", UserRoutes());
  router.use("/video", VideRoutes());
  return router;
};
