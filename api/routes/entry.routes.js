module.exports = app => {
    const e_controller = require('../controllers/entry.controller');
    var router = require("express").Router();
    
    router.post("/insertEntry", e_controller.create);
    router.put("/updateEntry", e_controller.update);
    router.get("/getEntry", e_controller.get);
    router.get("/getByBuilding", e_controller.getByBuilding);
    router.get("/getByType", e_controller.getByType);
    router.delete("/deleteEntry", e_controller.delete);
    app.use('/api', router);
}