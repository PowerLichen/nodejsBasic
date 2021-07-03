var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}    
    </body>
    </html>
    `;
};

function templateList(filelist) {
    var list = '<ul>'
    var i = 0;
    while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i = i + 1
    };
    list = list + '</ul>';
    return list;
}


var app = http.createServer(function (req, res) {
    var _url = req.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    // Show path without query string
    // console.log(url.parse(_url,true).pathname)

    // if (_url == '/') {
    //     title = 'Welcome';
    //     _url = '/index.html';
    // };
    // if (_url == '/favicon.ico') {
    //     return res.writeHead(404);
    // };

    // comment: just show page
    // console.log(__dirname + _url);
    // res.end(fs.readFileSync(__dirname + _url));

    //node.js data transfer
    // res.end('egoing : ' + _url);

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data/', function (err, filelist) {
                // console.log(filelist);
                title = 'Welcome'
                var description = "HELLO! Welcome my page!";
                var list = templateList(filelist)
                var templete = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                res.writeHead(200);
                res.end(templete);
            });

        } else {
            fs.readdir('./data/', function (err, filelist) {
                //URL parse by query string
                fs.readFile(`data/${title}`, 'utf8', function (err, data) {
                    var description = data;
                    var list = templateList(filelist)
                    var templete = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    res.writeHead(200);
                    res.end(templete);
                });
            });
        }

    } else {
        res.writeHead(404);
        res.end('Not Found');
    };

})

app.listen(3000);