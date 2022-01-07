const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>제일먼저 접속하는사람 문상 5000</h1>');
    res.end('<p>172.16.1.131:8080</p>')
    console.log(req.ip);
})
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중 ..');
    });