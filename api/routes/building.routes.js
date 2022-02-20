module.exports = app => {
    const b_controller = require('../controllers/building.controller');
    var router = require("express").Router();

    router.get("/getBuilding", b_controller.getBuilding);
    router.get("/getAllBuilding", b_controller.getAll);
    router.post("/createBuilding", b_controller.create);
    router.put("/updateBuilding", b_controller.update);
    router.delete("/deleteBuilding", b_controller.delete);
    app.use('/api', router);
}