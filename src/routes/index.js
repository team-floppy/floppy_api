const AuthRoutes = require("./AuthRoutes");
const UserRoutes = require("./UserRoutes");

module.exports = router => {
  router.use("/auth", AuthRoutes());
  router.use("/user", UserRoutes());
  return router;
};
