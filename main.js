var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function (req, res) {
    var _url = req.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    if (_url == '/') {
        title = 'Welcome';
        _url = '/index.html';
    };
    if (_url == '/favicon.ico') {
        return res.writeHead(404);
    };
    res.writeHead(200);
    // comment: just show page
    // console.log(__dirname + _url);
    // res.end(fs.readFileSync(__dirname + _url));

    //node.js data transfer
    // res.end('egoing : ' + _url);

    //URL parse by query string
    fs.readFile(`data/${title}`, 'utf8', function (err, data) {
        var description = data;
        var templete = `
        <!doctype html>
        <html>
        <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${data}</p>
        </body>
        </html>
        `;
        res.end(templete);
    });

    
})

app.listen(3000);