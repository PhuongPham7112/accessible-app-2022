module.exports = app => {
    const u_controller = require('../controllers/user.controller');
    var router = require("express").Router();

    router.post("/insertUser", u_controller.create);
    router.get("/loginUser", u_controller.login);
    app.use('/api', router);
}