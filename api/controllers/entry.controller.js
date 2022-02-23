// this file is for methods/functions for api calls related to entry object
const sql = require("../config/db");
const geocoder = require("./geocode.controller");

exports.create = (req, res, next) => {
    if (!req.body) { 
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query(
        "SELECT * FROM buildings WHERE building_name=?",
        [req.body.building],
        function (err, data, fields) {
            if (err) res.send(err);
        }
    )

    sql.query(
        "INSERT INTO entry_points (building, entry_type, i_description) VALUES (?, ?, ?); \n\
        SELECT LAST_INSERT_ID();",
        [req.body.building, req.body.type, req.body.description],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(201).json({
                    status: "success",
                    message: "entry point is inserted",
                    data: data // return an id for the front end
                });
            }
        }
    )
}

// select a specific point
exports.get = (req, res, next) => { 
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query (
        "SELECT entry_points.building, entry_points.entry_type, entry_points.i_description, buildings.building_address FROM entry_points, buildings WHERE (id, building, entry_type) = (?, ?, ?) AND building_name = ?",
        [req.body.id, req.body.building, req.body.type, req.body.building],
        function (err, data, fields) {
            console.log(data);
            if (err) res.send(err);
            else {
                try {
                    var info, coordinate;
                    info = geocoder.getCoordinate(data[0].building_address.replace(/\s/g, '+'));
                    console.log("bruh ", data[0].building_address);
                    info.then(
                        (result) => {
                            res.status(200).json({
                                status: "success",
                                message: "entry point is retrieved",
                                data: {
                                    "building": data[0].building,
                                    "type": data[0].entry_type,
                                    "description": data[0].i_description,
                                    "address": data[0].building_address,
                                    "coordinate": result
                                } 
                            });
                        }
                    )
                }
                catch (err) {
                    res.status(400).json({
                        "message": "failed coordinate conversion, " + err.message
                    })
                }                
            }
        }
    )
}

// get entry points of a building
exports.getByBuilding = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name cannot be empty, please provide one"
        })
    }

    sql.query(
        "(SELECT entry_points.*, buildings.building_address FROM entry_points, buildings WHERE building = ? AND building_name = ?)",
        [req.body.name, req.body.name],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                try {
                    var collection_data = [];
                    info = geocoder.getCoordinate(data[0].building_address.replace(/\s/g, '+'));
                    info.then(
                        (result) => {
                            for (let i = 0; i < data.length; i++) {
                                collection_data.push({
                                    "building": data[i].building,
                                    "type": data[i].entry_type,
                                    "description": data[i].i_description,
                                    "address": data[i].building_address,
                                    "coordinate": result
                                })
                            }
                            res.status(200).json({
                                status: "success",
                                message: "entry points of this building are retrieved",
                                data: collection_data // return the info of that entry and its address
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

// get all points of a specific type(s)
exports.getByType = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Type array cannot be empty, please provide one"
        })
    }
    const stringType = req.body.type.toString();
    sql.query(
        "SELECT entry_points.building, entry_points.entry_type, entry_points.i_description, buildings.building_address FROM entry_points, buildings WHERE FIND_IN_SET(entry_points.entry_type, ?) AND buildings.building_name = entry_points.building;",
        [stringType],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                try {
                    var collection_data = [];
                    geocoder.getCoordinates(data).then(
                        c_results => {
                            console.log("from api call: ", c_results);
                            for (let i = 0; i < data.length; i++) {
                                collection_data.push({
                                    "building": data[i].building,
                                    "type": data[i].entry_type,
                                    "description": data[i].i_description,
                                    "address": data[i].building_address,
                                    "coordinate": c_results[i]
                                })
                            }
                            res.status(200).json({
                                status: "success",
                                message: "entry points retrieved",
                                data: collection_data,
                            });
                        }
                    );
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        }
    )
}

// update an entry point
exports.update = (req, res, next) => {
    if (!req.body) { 
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query(
        "SELECT * FROM buildings WHERE building_name=?",
        [req.body.building],
        function (err, data, fields) {
            if (err) res.send(err);
        }
    )

    sql.query(
        "UPDATE entry_points SET building = ?, entry_type = ?, i_description = ? WHERE (id, building, entry_type) = (?, ?, ?)",
        [req.body.new_building, req.body.new_type, req.body.new_description, req.body.id, req.body.old_building, req.body.old_type],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(201).json({
                    status: "success",
                    message: "entry point is updated"
                });
            }
        }
    )
}

// delete an entry 
exports.delete = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.delete(
        "DELETE FROM entry_points WHERE (id, building, entry_type) = (?, ?, ?)",
        [req.body.id, req.body.building, req.body.type],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(200).json({
                    status: "success",
                    message: "entry point is deleted"
                });
            }
        }
    )
}