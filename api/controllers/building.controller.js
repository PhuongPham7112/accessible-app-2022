// this file is for methods/functions for api calls related to building object
const sql = require("../config/db");
const geocoder = require("./geocode.controller");

// to create a new building profile
exports.create = (req, res) => {
    if (!req.body) { 
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query(
        "INSERT INTO buildings (building_name, building_address, building_description) VALUES (?, ?, ?)",
        [req.body.name, req.body.address, req.body.description],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(201).json({
                    status: "success",
                    message: "building is inserted"
                });
            }
        }
    )
}

// retrieve a building profile
exports.getBuilding = (req, res) => {
    if (!req.body.name) {
        res.status(404).send({
            message: "Please provide a building's name"
        })
    }

    sql.query(
        "SELECT * FROM buildings WHERE building_name = ?",
        [req.body.name],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                try {
                    var info, coordinate;
                    info = geocoder.getCoordinate(data[0].building_name.replace(/\s/g, '+'));
                    info.then(
                        (result) => {
                            coordinate = result;
                            res.status(200).json({
                                status: "success",
                                message: "entry point is retrieved",
                                data: {
                                    "building_name": data[0].building_name,
                                    "building_address": data[0].building_address,
                                    "building_description": data[0].building_description,
                                    "coordinate": coordinate
                                } 
                            });
                        }
                    )
                }
                catch (err) {
                    res.status(400).json({
                        "message": "failed coordinate conversion"
                    })
                }                
            }
        }
    )
}

// retrieve all buildings
exports.getAll = (req, res) => {
    sql.query(
        "SELECT * FROM buildings",
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                try {
                    var collection_data = [];
                    var coordinates = geocoder.getCoordinates(data);
                    coordinates.then((result) => {
                            for (var i = 0; i < data.length; i++) {
                                collection_data.push({
                                    "building_name": data[i].building_name,
                                    "building_address": data[i].building_address,
                                    "building_description": data[i].building_description,
                                    "coordinate": result[i]
                                });
                            }
                            res.status(200).json({
                                status: "success",
                                message: "buildings retrieved",
                                data: collection_data
                            });
                        }
                    )

                }
                catch (err) {
                    res.send(err);
                }
            }
        }
    )
}

// delete a building profile
exports.delete = (req, res) => {
    if (!req.body.name) {
        res.status(404).send({
            message: "Please provide a building's name"
        })
    }

    sql.query(
        "DELETE FROM buildings WHERE building_name = ?",
        [req.body.name],
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
    if (!req.body) { 
        res.status(400).send({
            message: "Content and name cannot be empty"
        })
    }

    sql.query(
        "UPDATE buildings SET building_name = ?, building_address = ?, building_description = ? WHERE building_name = ?",
        [req.body.name, req.body.address, req.body.description, req.body.old_name],
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