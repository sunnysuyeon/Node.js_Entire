const express = require('express');
const app = express();
const mysql_dbc = require('./db/db_con')();
const pool = mysql_dbc.init_pool();

var bodyParser = require('body-parser');    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err)
            throw err;
        else {
            connection.query('select * from new_customers', function (err, result) {
                if (err) {
                    var err = new Error('Not Found');
                    err.status = 404;
                    console.log(err);
                    // next(err);
                } else {
                    console.log(JSON.stringify(result));
                }
                connection.release();
                return res.json(result);
            });
        }
    });
    
});


app.post('/insert', function (req, res) {
    let body = req.body;
    pool.getConnection(function (err, connection) {
        if (err)
            throw err;
        else {
            connection.query('insert into new_customers(name, age, sex) values(?, ?, ?)', [body.name, body.age, body.sex], function (err, result) {
                if (err) {
                    var err = new Error('Not Found');
                    err.status = 404;
                    console.log(err);
                    // next(err);
                } else {
                    console.log(JSON.stringify(result));
                    res.json(result);
                }
                connection.release();
            });
        }
    });
    
});

app.listen(8080, () =>
    console.log('8080포트에서 서버 실행중'));

