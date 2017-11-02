let fs = require('fs');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let mysql = require('mysql');

let app = express();

let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'pippin',
    database: 'Chirper'
});

function countArguments(array) {
    if (array.length == 0) {
        return '';
    } else {
        let op = '?';
        for (i=1; i < array.length; i++) {
            op += ',?';
        };
        return op;
    }
}

function modifyChirps(procedure, array) {
    return new Promise(function(fulfill, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(`CALL ${procedure}(${countArguments(array)});`, array, function(err, resultsets) {
                    if (err) {
                        connection.release();
                        reject(err);
                    } else {
                        connection.release();
                        fulfill(resultsets[0]);
                    }
                })
            }
        })
    })
}

let homePage = path.join(__dirname, '..', 'client', 'index.html');
let chirpHistory = path.join(__dirname, 'data.json');
let clientPath = path.join(__dirname, '../client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(clientPath));

app.route('/api/chirps')
    .get((req, res) => {
        modifyChirps('GetAllChirps', [])
            .then(function(chirps) {
                res.send(chirps);
            }, function(err) {
                res.status(500).send(err);
            });
    }).post((req, res) => {
        modifyChirps('CreateChirp', [req.body.user, req.body.message])
            .then(function(id) {
                res.status(201).send(id[0]);
            }, function(err) {
                res.status(500).send(err);
            });
    })

app.route('/api/chirps/:id')
    .get((req, res) => {
        modifyChirps('GetSingleChirp', [req.params.id])
            .then(function(chirp) {
                res.send(chirp[0]);
            }, function(err) {
                res.status(500).send(err);
            });
    }).delete((req, res) => {
        modifyChirps('DeleteChirp', [req.params.id])
            .then(function(id) {
                res.status(204).send(id[0]);
            }, function(err) {
                res.status(500).send(err);
            });
    }).put((req, res) => {
        modifyChirps('UpdateChirp', [req.params.id, req.body.message])
            .then(function(id) {
                res.status(201).send(id[0]);
            }, function(err) {
                res.status(500).send(err);
            });
    });

app.route('/api/users')
    .get((req, res) => {
        modifyChirps('GetAllUsers', [])
        .then(function(users) {
            res.send(users);
        }, function(err) {
            res.status(500).send(err);
        });
    }).post((req, res) => {
        modifyChirps('CreateUser', [req.body.user, req.body.email])
            .then(function(id) {
                res.status(201).send(id[0]);
            }, function(err) {
                res.status(500).send(err);
            });
    })

app.listen(3000);