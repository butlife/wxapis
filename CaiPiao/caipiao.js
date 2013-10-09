var $ = require('jquery');
var needle = require('needle');
var db = require('./../db/caipiaoDB');
exports.cp = function (callbacks) {
    needle.get('http://baidu.lecai.com/lottery/draw/?agentId=5555', function (err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var result = "";
            var table = $(body).find('.kj_tab');
            var tr = $(table).find('tr').each(function (i, item) {
                if (i != 0 && i != 1 && i != 8) {
                    $(item).find('a.sjh').text('');
                    var type = $(item).find("td:eq(0)").text().trim();
                    var issue = $(item).find("td:eq(1)").text().trim();
                    var startDate = $(item).find("td:eq(2)").text().trim();
                    var Number = $(item).find("td:eq(3)").text().toString().replace(/ /g, '').replace(/	/g, '');
                    console.log("number:" + Number);
                   db.insert_caipiao(type, issue, startDate, Number)
                    result += '{"type":"' + type + '","issue":"' + issue + '","startdate":"' + startDate + '","number":"' + Number + '"},';
                }
            });
            result = JSON.parse('[' + result.substr(0, result.length - 1) + ']');
            callbacks(result + ' ');
        }
    });
}

