// this file is for methods/functions for api calls related to building object
const sql = require("../config/db");

// to create a new building profile
exports.create = (res, req) => {
    if (!req.body) { 
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query(
        "INSERT INTO buildings (building_name, building_address, building_description) VALUES (?, ?, ?)",
        [res.body.name, res.body.address, res.body.description],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(201).json({
                    status: "success",
                    message: "research is inserted"
                });
            }
        }
    )
}

// retrieve a building profile
exports.getBuilding = (res, req) => {
    if (!req.params.name) {
        res.status(404).send({
            message: "Please provide a building's name"
        })
    }

    sql.query(
        "SELECT * FROM buildings WHERE building_name = ?",
        [res.params.name],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(200).json({
                    status: "success",
                    message: "research is retrieved",
                    data: data
                });
            }
        }
    )
}

// retrieve all buildings
exports.getAll = (res, req) => {
    sql.query(
        "SELECT * FROM buildings",
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(200).json({
                    status: "success",
                    message: "all buildings are retrieved",
                    data: data
                });
            }
        }
    )
}

// delete a building profile
exports.delete = (req, res) => {
    if (!req.params.name) {
        res.status(404).send({
            message: "Please provide a building's name"
        })
    }

    sql.query(
        "DELETE FROM buildings WHERE building_name = ?",
        [req.params.name],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(200).json({
                    status: "success",
                    message: "building is deleted"
                });
            }
        }
    )
}

// update a building's profile
exports.update = (req, res) => {
    if (!req.body || !req.params.name) { 
        res.status(400).send({
            message: "Content and name cannot be empty"
        })
    }

    sql.query(
        "UPDATE buildings SET building_name=?, building_address=?, building_description=? WHERE building_name=?",
        [req.body.name, req.body.address, req.body.description, req.params.name],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(201).json({
                    status: "success",
                    message: "building is updated"
                });
            }
        }
    )
}