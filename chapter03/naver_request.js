const request = require('request');
const express = require('express');
const app = express();
var client_id = 'XeDiMhcyEDtChQCgz2gU';
var client_secret = 'l2wiVT6OkO';
var api_url = 'https://openapi.naver.com/v1/datalab/search';

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우팅 설정 */
app.get('/naver/search', (req, res) => {
    var request_body = {
        "startDate": "2017-01-01",
        "endDate": "2017-04-30",
        "timeUnit": "month",
        "keywordGroups": [
            {
                "groupName": "한글",
                "keywords": [
                    "한글",
                    "korean"
                ]
            },
            {
                "groupName": "영어",
                "keywords": [
                    "영어",
                    "english"
                ]
            }
        ],
        "device": "pc",
        "ages": [
            "1",
            "2"
        ],
        "gender": "f"
    };

    request.post({
            url: api_url,
            body: JSON.stringify(request_body),
            headers: {
                'X-Naver-Client-Id': client_id,
                'X-Naver-Client-Secret': client_secret,
                'Content-Type': 'application/json'
            }
        },
        function (error, response, body) {
            console.log(response.statusCode);
            console.log(body);
            res.send(body);
            res.end();
        });
});

/* 서버와 포트 연결.. */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});
// ===========================================위쪽 코딩
