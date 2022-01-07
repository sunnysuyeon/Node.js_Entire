const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello');
        res.end()
    } else if(req.url === '/a') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('A Hello');
        res.write('만약 여기 한글을 입력한다면?');
        res.end()
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('잘못된 접근입니다.');
        res.end()
    }
})
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결')
    });