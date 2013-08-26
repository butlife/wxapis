var config = require('./config');
var code = require('./emsCode');
var http = require('http');
exports.ems = function (com, nu, callback) {
    code.code(com, function (result) {
        var url = 'http://api.ickd.cn/?id=102051&secret=' + config.emsapi + '&com=' + result + '&nu=' + nu + '&type=json&encode=utf8';
        console.log(url);
        var result = "";
        http.get(url, function (res) {
            res.on('data',function (chunk) {
                result += chunk;
            }).on('end', function () {
                    console.log(result);
                    var j = JSON.parse(result);
                    console.log("status: " + j.status);
                    console.log(j.message);
                    console.log("errCode: " + j.errCode);
                    console.log("data: " + j.data);
                    console.log("html: " + j.html);
                    console.log("mailNo: " + j.mailNo);
                    console.log("expTextName: " + j.expTextName);
                    console.log("expSpellName: " + j.expSpellName);
                    console.log("update: " + j.update);
                    console.log("cache: " + j.cache);
                    console.log("ord: " + j.ord);
                    var status = j.status;
                    var errCode = j.errCode;
                    var data = j.data;
                    if (status != "0" && errCode == "0") {
                        callback(result);
                    } else {
                        callback("查询错误");
                    }

                })
        })
    })


}

