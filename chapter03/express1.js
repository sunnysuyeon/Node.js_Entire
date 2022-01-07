const express = require('express');
const app = express()

app.get('/naver/papago', (req, res) => {
    console.log();
    var express = require('express');
    var app = express();
    var client_id = '1OROfOeTkxi7UAx1F8_k';
    var client_secret = '6cT1O_dtxx';
    var query = req.query.aa;
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var request = require('request');
    var options = {
        url: api_url,
        form: {'source':'ko', 'target':'en', 'text':query},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
        } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
        }
    });



});
app.get('/naver/detectlangs', (req, res) => {
    console.log(req.query.aa);

});

app.post('/naver/trend', (req, res) => {


});
app.post('/naver/shopping', (req, res) => {


});

app.listen(8080, () =>
    console.log('8080포트에서 서버 실행중'));