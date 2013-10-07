var path = require('path');
var glob = require('glob');
var pathPrefix = 'routes';
var basename = path.basename;
var dirname = path.dirname;

module.exports = autoRouteExpress;

function autoRouteExpress(app) {
  var cwd = process.cwd();

  glob(pathPrefix + '/**/*.js', {}, function (err, files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      var method = basename(file, '.js');

      if (!(method.substring(0, 1) === '_')) {
        var pathName = dirname(file).replace('$', ':').replace(pathPrefix, '');

        var fullFilePath = path.join(cwd, file);

        console.log('Added route' + method + ' ' + pathName + ' - from ' + fullFilePath);

        var fn = require(fullFilePath);

        app[method](pathName, fn);
      }
    }
  });
}

