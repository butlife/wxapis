var http = require("http");
var querystring = require('querystring');
var url = require("url");
var caipiao = require('./CaiPiao/caipiao');
var ems = require('./Ems/ems');
var bus = require('./bus/BusService');
var bus8684 = require('./bus/8684');
var movie = require('./movie/mtime');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html,charset=utf8'});
    req.setEncoding('utf8');
    var query = url.parse(req.url).query;
    var type = querystring.parse(query).type;

    if (type == "cp") {
        caipiao.cp(function (result) {
            console.log(result);
            res.end(result);
        })

    } else if (type == "ems") {
        var com = querystring.parse(query).com;
        var nu = querystring.parse(query).nu;
        ems.ems(com, nu, function (result) {
            res.end(result);
        })

    } else if (type == "gj") {
        var station1 = querystring.parse(query).station1;
        var station2 = querystring.parse(query).station2;
        var line = querystring.parse(query).line;
        var gjtype = querystring.parse(query).gjtype;
        var x = querystring.parse(query).x;
        var y = querystring.parse(query).y;
        bus.bus(gjtype, station1, station2, line, x, y, function (result) {
            res.end(result);
        })

    } else if (type == "8684") {

        var line = querystring.parse(query).line;
        console.log('8684' + line);
        bus8684.line(line, function (result) {
            res.end(result);
        })
    }
    else if (type == "allmovie") {
        movie.mtime("all", "", function (result) {
            res.end(result);
        });
    } else if (type == "movie") {
        var mname = querystring.parse(query).mname;
        movie.mtime("movie", mname, function (result) {
            res.end(result);
        });
    } else if (type == "yy") {
        var yyname = querystring.parse(query).yyname;
        if (yyname == "whg" || yyname == "文化宫") {
            yyname = "2090";
        } else if (yyname == "askyd" || yyname == "安钢奥斯卡") {
            yyname = "3105";
        } else if (yyname == "ask" || yyname == "沃尔玛奥斯卡") {
            yyname = "1105";
        } else if (yyname == "hlw" || yyname == "好莱坞") {
            yyname = "2845";
        } else {
            yyname = "2090";
        }
        movie.mtime("cinema", yyname, function (result) {
            res.end(result);
        });
    }
    else {
        res.end('end');
    }


}).listen(3002);
console.log("runing 3002")