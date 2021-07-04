var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

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
        <a href="/create">create</a>
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

    } else if (pathname == '/create') {
        fs.readdir('./data/', function (err, filelist) {
            // console.log(filelist);
            title = 'WEB - create'
            var list = templateList(filelist)
            var templete = templateHTML(title, list, `
            <form action="http://192.168.35.90:3000/process_create" method="POST">
                <p><input type="text" name='title' placeholder='title'></p>
                <p>
                    <textarea name='description' placeholder='description'></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            
            `);
            res.writeHead(200);
            res.end(templete);
        });
    } else if (pathname == '/process_create') {
        var body = '';
        // 대량의 데이터를 분산하여 Load하는 부분
        req.on('data', function (data) {
            body = body + data;

        });
        //데이터 수신이 전부 Load한 후 작동
        req.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                res.writeHead(302, {Location:`/?id=${title}`});
                res.end();
            });

        });

    } else {
        res.writeHead(404);
        res.end('Not Found');
    };

})

app.listen(3000);