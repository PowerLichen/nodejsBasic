var M = {
    value:'v',
    f:function(){
        console.log(this.value);
    }
}

//해당 파일의 객체를 모듈로서 다른 파일에서 사용하려면
//아래 명령어가 필요

module.exports = M;