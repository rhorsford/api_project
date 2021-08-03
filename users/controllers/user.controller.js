const {readUser, createUser, editUser, deleteUser} = require("../models/user.model");
const UserModel = require('../models/user.model');
const date_ob = new Date();

exports.insert = (req, res) => {
    req.body.created = date_ob;
    createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id,});
        });
};


exports.list = (req, res) => {
    readUser(req.body)
        .then((result) => {
            res.status(200).send({result});
        });
};

exports.update = (req, res) => {
    editUser(req.params.userId, req.body)
        .then((result) => {
            res.json({"message": "User " + result._id + " Updated"});
            res.status(204).send({});
        });

};


exports.remove = (req, res) => {
    deleteUser(req.params.userId)
        .then((result) => {
            res.json({"message": "User " + req.params.userId + " Deleted"});
            res.status(204).send({});
        });

};
