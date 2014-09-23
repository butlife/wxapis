var http = require("http"),
    $ = require("jquery"),
    iconv = require('iconv-lite'),
    linefor8684 = require('./CodeToLine');

exports.line = function (line, callback) {
    var options;
    linefor8684.CodeToLine(line, function (result) {
        options = {
            host: 'anyang.8684.cn',
            port: 80,
            path: '/pp/159/' + result,
            headers: {
                'User-Agent': ' Mozilla/5.0 (Windows; U; Windows NT 5.2)Gecko/2008070208 Firefox/3.0.1',
                'Connection': 'keep-alive'

            }
        };
        var html = "";
        http.get(options, function (res) {
            res.setEncoding('binary');
            res.on('data',function (data) {
                html += data;
            }).on('end', function () {
                    var list = "";
                    var buf = new Buffer(html, 'binary');
                    var str = iconv.decode(buf, 'gb2312');
                    var strs = str.split('"');
                    if (strs.length > 0) {
                        var info = strs[13] + '\r\n';
                        var money = strs[15] + '\r\n';
                        var lines = strs[27];
                        var post='';
                        if(lines){
                            lines = lines.substring(0, lines.indexOf('||')).trim();
                            lines = lines.replace(/\|/g, ',') + '\r\n';
                            post = "安阳公交小喇叭提醒您：\r\n" + info + money + lines + "\r\n1、发送“G+站点名”查看对应公交站线路及车辆到站时间。\r\n2、发送“G”进行更多公交查询。";
                        }else{
                            post = "安阳公交小喇叭提醒您：\r\n没有此公交\r\n1、发送“G+站点名”查看对应公交站线路及车辆到站时间。\r\n2、发送“G”进行更多公交查询。";
                        }
                        callback(post);

                    }

                });
        });
    });
}

