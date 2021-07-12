var http = require('http');
var cookie = require('cookie');
var app = http.createServer(function (req, res) {
    console.log(req.headers.cookie);
    var cookies = {}
    if(req.headers.cookie != undefined){
        // 쿠키 생성
        cookies = cookie.parse(req.headers.cookie);
    }
    console.log(cookies);
    res.writeHead(200, {
        'Set-Cookie': ['yummy=choco', 'tasty=strawberry']
    })
    res.end('Cookie!!');
}).listen(3000);