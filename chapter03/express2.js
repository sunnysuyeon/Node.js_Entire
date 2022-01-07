const express = require('express');
const app = express();

app.get('/', function (req, res, next) {
    res.send('Hello World!');
    next();
});

app.get('/aaa', function (req, res, next) {
    res.send('aaaa Hello!');
    next();
});

const myLogger = function (req, res, next) {
    console.log('LOGGED'+ req.ip);
    next();
};

app.use(myLogger);

app.listen(8080);  
