/**
 * Created by chuanlong on 2014/9/23.
 */
var http = require('http'),
    iconv = require('iconv-lite'),
    env = require('jsdom').env;
exports.getAqi = function (cb) {
    http.get('http://aqicn.org/city/anyang/', function (res) {
        var html='';
        res.on('data', function (data) {
            html+=data;
        }).on('end',function(){
            env(html, function (errors, window) {
                var $ = require('jquery')(window);
                var result=$(html).find('.aqivalue')[0];
                cb('<span style="font-size: 12px">空气质量（AQI）:'+$(result).text()+'</span>')
            });
        });
    });
}