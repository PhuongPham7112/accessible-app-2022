// this file is for methods/functions for api calls related to entry object
const sql = require("../config/db");

exports.create = (res, req) => {
    if (!req.body) { 
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query(
        "SELECT * FROM buildings WHERE building_name=?",
        [req.body.building],
        function (err, data, fields) {
            if (err) res.send({
                message: "Building's name might be not in the database yet, please provide this building's profile"
            });
        }
    )

    sql.query(
        "INSERT INTO entry_points (building, entry_type, i_description) VALUES (?, ?, ?); \n\
        SELECT LAST_INSERT_ID();",
        [req.body.building, req.body.entry_type, req.body.description],
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

exports.get = (req, res) => { // select a specific point
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query (
        "(SELECT * FROM entry_points WHERE (id, building, entry_type) = (?, ?, ?)) UNION (SELECT building_address FROM buildings WHERE building_name = ?)",
        [req.body.id, req.body.building, req.body.entry_type, req.body.building],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(200).json({
                    status: "success",
                    message: "entry point is retrieved",
                    data: data // return the info of that entry and its address
                });
            }
        }
    )
}

// get entry points of a building
exports.getByBuilding = (req, res) => {
    if (!req.params.name) {
        res.status(400).send({
            message: "Name cannot be empty, please provide one"
        })
    }

    sql.query(
        "(SELECT * FROM entry_points WHERE building = ?) UNION (SELECT building_address FROM buildings WHERE building_name = ?)",
        [req.params.name],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(200).json({
                    status: "success",
                    message: "entry points of this building are retrieved",
                    data: data // return the info of that entry and its address
                });
            }
        }
    )
}

// get all points of a specific type
exports.getByType = (req, res) => {
    if (!req.params.type) {
        res.status(400).send({
            message: "Type cannot be empty, please provide one"
        })
    }

    sql.query(
        "(SELECT * FROM entry_points WHERE entry_type = ?)",
        [req.params.type],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(200).json({
                    status: "success",
                    message: "entry points of this type are retrieved",
                    data: data // return the info of that entry and its address
                });
            }
        }
    )
}

