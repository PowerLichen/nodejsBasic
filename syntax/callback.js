/*
function a(){
    console.log('a');
};
*/

// 변수 a에 함수를 할당
var a = function (){
    console.log('a');
};

function slowfunc(callback){
    callback();
}

slowfunc(a);