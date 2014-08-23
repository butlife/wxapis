/**
 * Created by chuanlong on 2014/8/22.
 */
var http = require('http'),
    iconv = require('iconv-lite'),
    env = require('jsdom').env;



exports.getInfo = function (id, cb) {
    http.get('http://theater.mtime.com/China_Henan_Province_Anyang/movie/' + id + '/', function (res) {
        var html = '';
        var result = '';
        var json = '';
        res.setEncoding('binary');
        res.on('data',function (data) {
            html += data;
        }).on('end', function () {
                var buf = new Buffer(html, 'binary');
                var str = iconv.decode(buf, 'utf-8');
                env(str, function (errors, window) {
                    var $ = require('jquery')(window);
                    var movieN = $(str).find('.videoname h2')[0];
                    var img = $(str).find('.filminfo img')[0];
                    var src = $(img).attr('src');
                    var name = $(movieN).html();
                    $(str).find('script').each(function (index, item) {
                        var script = $(item).html();
                        if (script.indexOf('showtimesJson') != -1) {
                            var temp = script.toString().replace(/\n/g, '').split('var');
                            json = $.parseJSON(temp[4].replace('showtimesJson', '').replace('=', '').replace(/new Date\("/g, '"').replace(/"\)/g, '"').replace(';', ''));
                        }
                    });
                    for (var key in json) {
                        var d = new Date(json[key].realtime);
                        var time = (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + d.getHours() + ':' + d.getMinutes();
                        result += ',{"cinemaId":' + json[key].cinemaId + ',"version":"' + json[key].version + '","hallName":"' + json[key].hallName + '","realtime":"' + time + '","price":"' + json[key].price + '","isSale":' + json[key].isSale + '}';
                    }
                    result = '[' + result.substring(1) + ']';
                    result = '[{"name":"' + name + '","img":"' + src + '","info":' + result + '}]';
                    cb((result))
                });

            });
    });
}
exports.getAllMovie = function (cb) {
    http.get('http://theater.mtime.com/China_Henan_Province_Anyang/', function (res) {
        var html = '';
        var json = '';
        res.setEncoding('binary');
        res.on('data',function (data) {
            html += data;
        }).on('end', function () {
                var buf = new Buffer(html, 'binary');
                var str = iconv.decode(buf, 'utf-8');
                env(str, function (errors, window) {
                    var $ = require('jquery')(window);
                    $(str).find('script').each(function (index, item) {
                        var script = $(item).html();
                        if (script.indexOf('hotplaySvList') != -1) {
                            json = script.toString().replace(/\n/g, '').replace('var', '').replace('hotplaySvList', '').replace('=', '').replace(';', '').replace(/movie.mtime.com/g, 'theater.mtime.com/China_Henan_Province_Anyang/movie');
                            cb(json);
                        }
                    });
                });

            });
    });
}

