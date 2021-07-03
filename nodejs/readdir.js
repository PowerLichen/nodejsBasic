var indexFolder = './data/';
var fs = require('fs');

fs.readdir(indexFolder, function(err, filelist){
    console.log(filelist)
})