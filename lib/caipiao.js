var $ = require('jquery');
var needle = require('needle');
var db=require('./db');
exports.cp = function (callback) {
    needle.get('http://baidu.lecai.com/lottery/draw/?agentId=5555', function (err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var result = "";
            var table = $(body).find('.kj_tab');
            var tr = $(table).find('tr').each(function (i, tr) {
                if (i != 0 && i != 1 && i != 8) {
                    $(tr).find('a.sjh').text('');
                    var type = $(tr).find("td:eq(0)").text().trim();
                    var issue = $(tr).find("td:eq(1)").text().trim();
                    var startDate = $(tr).find("td:eq(2)").text().trim();
                    var Number = $(tr).find("td:eq(3)").text().toString().replace(/ /g, '').replace(/	/g,'');
                    db.insert_caipiao(type,issue,startDate,Number);
                    result += '{"type":"' + type + '","issue":"' + issue + '","startdate":"' + startDate + '","number":"' + Number + '"},';
                }
            });
            result = JSON.parse('[' + result.substr(0, result.length - 1) + ']');
            console.log(result);
            callback(result+' ');

        }
    });
}

