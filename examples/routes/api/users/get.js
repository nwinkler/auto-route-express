module.exports = getAllUsers;

var users = require('./_users');

function getAllUsers(req, res) {
    res.json(users);
}
