const UsersController = require('./controllers/user.controller');
const express = require('express');
const app = express();

exports.routesConfig = function (app) {

    app.route('/users')
        .get(UsersController.list)
        .post(UsersController.insert);
    app.route('/users/:userId')
        .patch(UsersController.update)
        .delete(UsersController.remove);

};

module.exports.app = app;
