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
        'Set-Cookie': [
            //세션 쿠키
            'yummy=choco',
            'tasty=strawberry',
            // 지속 쿠키(Permanent)
            `Permanet=cookies; Max-Age=${60*60*24*30}`,
            // HTTPS 사용 시에만 전송되는 보안 쿠키
            'Secure=sec; Secure',
            // JS에서는 접근 못하는 Http로만 가능한 쿠키
            'HttpOnly=only; HttpOnly',
            // Path를 가진 쿠키
            'Path=path; Path=/cookie',
            //특정 도메인에서만 살아있는 쿠키
            'Domain=domain; Domain=oo.org'
        ]
    })
    res.end('Cookie!!');
}).listen(3000);