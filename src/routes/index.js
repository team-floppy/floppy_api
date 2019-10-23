const AuthRoutes = require('./AuthRoutes');

module.exports = (router) => {
    router.use('/auth',AuthRoutes())
    return router;
}
