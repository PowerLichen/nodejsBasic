var fs = require('fs');

// console.log('Start')
// var result = fs.readFileSync('syntax/test.txt', 'utf8');
// console.log(result)
// console.log('End')

console.log('Start')
fs.readFile('syntax/test.txt', 'utf8', function(err, result){
    console.log(result)
});
console.log('End')