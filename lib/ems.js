var needle = require('needle');

exports.ems = function (com, nu, callback) {
    needle.get('http://api.ickd.cn/?id=102051&secret=75765e4321ccec4787b9eba44f3e8475&com=' + com + '&nu=' + nu + '&type=json&encode=utf8', function (err, resp, body) {
        if (!err && resp.statusCode == 200) {

        }
    })

}

