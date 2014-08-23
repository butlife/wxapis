var http = require("http"),
    querystring = require('querystring'),
    url = require("url"),
    bus = require('./bus/BusService'),
    bus8684 = require('./bus/8684'),
    movie = require('./movie/mtime'),
    query, type, line, id, station1, station2, gjtype, x, y;


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html,charset=utf8'});
    req.setEncoding('utf8');
    query = url.parse(req.url).query;
    type = querystring.parse(query).type;
    if (type === "gj") {
        station1 = querystring.parse(query).station1;
        station2 = querystring.parse(query).station2;
        line = querystring.parse(query).line;
        gjtype = querystring.parse(query).gjtype;
        x = querystring.parse(query).x;
        y = querystring.parse(query).y;
        bus.bus(gjtype, station1, station2, line, x, y, function (result) {
            res.end(result);
        })

    } else if (type === "8684") {
        line = querystring.parse(query).line;
        console.log('8684' + line);
        bus8684.line(line, function (result) {
            res.end(result);
        })
    }
    else if (type === "allmovie") {
        console.log('movie')
        movie.getAllMovie(function (data) {
            res.end(data);
        });
    }
    else if (type === "movieinfo") {
        console.log('movieinfo')
        id = querystring.parse(query).id;
        movie.getInfo(id, function (data) {
            res.end(data);
        });
    }
    else {
        res.end('end');
    }


}).listen(3003);
console.log("runing 3003")