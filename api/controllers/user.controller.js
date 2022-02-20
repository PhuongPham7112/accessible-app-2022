const sql = require("../config/db");

exports.create = (req, res) => {
    if (!req.body) { 
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query(
        "INSERT INTO users (user_email, user_password) VALUES (?, ?)",
        [req.body.email, req.body.password],
        function (err, data, fields) {
            if (err) res.send(err);
            else {
                res.status(201).json({
                    status: "success",
                    message: "new user is inserted"
                });
            }
        }
    );
}

exports.login = (req, res) => {
    if (!req.body) { 
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    sql.query(
        "SELECT * FROM users WHERE (user_email, user_password) = (?, ?)",
        [req.body.email, req.body.password],
        function (err, data, fields) {
            if (err) res.send(err);
            if (data.length === 0) res.status(404).send({"message": "Cannot find account"})
            else {
                res.status(200).json({
                    status: "success",
                    message: "user is retrieved",
                    data: data
                });
            }
        }
    )
}