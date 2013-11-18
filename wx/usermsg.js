var getCookie=require('./GetCookie');
var http = require('http');
var iconv = require('iconv-lite');
exports.wxmsg =function(cb){
    getCookie.cookie(function (cookie, token) {
        var html = '';
        var headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip,deflate,sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': cookie,
            'Referer': 'https://mp.weixin.qq.com/cgi-bin/contactmanage?t=user/index&pagesize=10&pageidx=0&type=0&groupid=0&token='+token+'&lang=zh_CN',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36'
        }
        var opt = {
            hostname: 'mp.weixin.qq.com',
            port: 80,
            path: '/cgi-bin/message?t=message/list&count=20&day=7&token='+token+'&lang=zh_CN',
            method: 'GET',
            headers: headers
        }

        var request = http.request(opt, function (res) {
            res.setEncoding('binary');
            res.on('data',function (chunk) {
                html += chunk;
                console.log(chunk);
            }).on('end', function () {
                    var buf = new Buffer(html, 'binary');
                    var str = iconv.decode(buf, 'utf8');
                    html = str.toString().substring(str.indexOf('\"msg_item\":')).replace('\"msg_item\":', '');
                    html = html.substring(0, html.indexOf('}).msg_item'));
                    cb(html);
                });


        });
        request.write('');
        request.end();
    });

}



