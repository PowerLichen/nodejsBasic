var http = require('http');
var fs = require('fs');
var app = http.createServer(function(req, res){
    var url = req.url;
    if (req.url == '/'){
        url = '/index.html';
    }
    if (req.url == '/favicon.ico'){
        return res.writeHead(404);
    };
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
})

app.listen(3000);