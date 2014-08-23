/**
 * Created by chuanlong on 2014/8/22.
 */
var http = require('http'),
    iconv = require('iconv-lite'),
    env = require('jsdom').env,
    dyy = {
        4187: '安阳横店影城',
        2090: '安阳工人文化宫数字3D影城',
        3328: '林州奥斯卡开元影城',
        3105: '安阳奥斯卡榕森影城（殷都店）',
        3030: '滑县奥斯卡浩创电影城',
        1105: '安阳奥斯卡榕森影城',
        3221: '安阳内黄天翼奥斯卡影城'
    };



exports.getInfo=function(id,cb){
    http.get('http://theater.mtime.com/China_Henan_Province_Anyang/movie/'+id+'/', function (res) {
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
                    result += '影院：' + dyy[json[key].cinemaId] + ' 类型：' + json[key].version + ' 大厅：' + json[key].hallName + ' 开始时间：' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + d.getHours() + ':' + d.getMinutes() + ' 价格：' + json[key].price + '元 是否在售：' + json[key].isSale + ' \r\n';
                }
                cb('电影名称：' + name + '\r\n' + result)
            });

        });
});
}
exports.getAllMovie=function(cb){
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
                            cb(json)
                        }
                    });
                });

            });
    });
}

