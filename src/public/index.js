'use strict';

const user = require('./user'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/user/:userId')
    .get((req, res) => {
        let foundUser = user.findById(req.param('userId'));
        if (foundUser) {
            res.json(foundUser);
        } else {
            res.send(204);
        }
    })
    .put((req, res) => {
        try {
            let userUpdate = Object.assign(req.body, {id: req.param('userId')});
            res.json(user.update(userUpdate));
        } catch (err) {
            console.log(err);
            res.send(404);
        }
    })
    .delete((req, res) => {
        try {
            var userId = req.param('userId');
            console.log(`DELETE ${userId}`);
            res.json(user.deleteById(userId), 204);
        } catch (err) {
            console.log(err);
            res.send(404);
        }
    });

app.route('/user')
    .post((req, res) => {
        let userJson = req.body;
        try {
            let newuser = user.create(userJson.email, userJson.forename, userJson.surname);
            res.status(201).json(newuser);
        } catch (err) {
            console.log(err);
            res.send(400)
        }


    })
    .get((req, res) => {
        let all = user.all();
        if (all && all.length != 0) {
            res.json(all);
        } else {
            res.status(204).json({});
        }
    });

app.listen(8055,()=> {
    console.log('listening on 8055');
});
