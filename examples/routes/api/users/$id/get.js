module.exports = getUser;

var users = require('../_users');

function getUser(req, res) {
  var id = req.params.id;

  if (id) {
    var user = users[id];

    if (user) {
      res.json(user);
    }
    else {
      res.send(404, 'Couldn\'t find user with id ' + id);
    }
  }
}

function middleware1 (req, res, next) {
  res.header('foo', 'bar');

  next();
}

function middleware2 (req, res, next) {
  res.header('foo2', 'bar2');

  next();
}

module.exports.middlewares = [middleware1, middleware2];
