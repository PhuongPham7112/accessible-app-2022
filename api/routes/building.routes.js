module.exports = app => {
    const b_controller = require('../controllers/building.controller');
    var router = require("express").Router();

    router.get("/getBuilding/:name", b_controller.getBuilding);
    router.get("/getAllBuilding", b_controller.getAll);
    router.post("/createBuilding", b_controller.create);
    router.put("/updateBuilding/:name", b_controller.update);
    router.delete("/deleteBuilding/:name", b_controller.delete);
}