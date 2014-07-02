/**
 * Module dependencies.
 */

var http = require('http');

exports.bus = function (type, station1, station2, line, x, y, callback) {
    var url = "";
    switch (type) {
        case "StationInfo":
            url = "http://120.194.49.246:81/nimei.ashx?type=zhan&station=" + station1;
            break
        case "WaitForBus":
            url = "http://120.194.49.246:81/nimei.ashx?type=wait_for_bus&station=" + station1 + "&line=" + line;
            break
        case "LineInfo":
            url = "http://120.194.49.246:81/nimei.ashx?type=line_info&line=" + line;
            break
        case "Change"  :
            url = "http://120.194.49.246:81/nimei.ashx?type=s_s&sstart=" + station1 + "&estart=" + station2;
            break
        case "coordinate":
            url = "http://120.194.49.246:81/nimei.ashx?type=xy&x=" + x + "&y=" + y;
            break

    }
    var html='';
    http.get(url, function (res) {
        res.on('data',function (data) {
            html += data;
        }).on('end', function () {
                if (html == '') {
                    html = '暂无信息';
                } else {
                    html = '安阳公交小喇叭提醒您：\r\n' + html + '\r\n1、发送“G+站点名”查看对应公交站线路及车辆到站时间。\r\n2、发送“G”进行更多公交查询。';
                }
                callback(html);
            });

    });
}

