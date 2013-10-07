var path = require('path');
var glob = require('glob');
var utils = require('./lib/utils');
var defaultCfg = {
  routePath: 'routesFolder'
};
var basename = path.basename;
var dirname = path.dirname;

module.exports = autoRouteExpress;

function autoRouteExpress(app, cfg) {
  var cwd = process.cwd();

  var opts = utils.applyDefaults(defaultCfg, cfg);

  console.log('Using configuration: ' + utils.formatObject(opts));

  glob(opts.routePath + '/**/*.js', {}, function (err, files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      var method = basename(file, '.js');

      if (!(method.substring(0, 1) === '_')) {
        var pathName = dirname(file).replace('$', ':').replace(opts.routePath, '');

        var fullFilePath = path.join(cwd, file);

        console.log('Added route' + method + ' ' + pathName + ' - from ' + fullFilePath);

        var fn = require(fullFilePath);

        app[method](pathName, fn);
      }
    }
  });
}

