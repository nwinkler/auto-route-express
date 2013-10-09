var path = require('path');
var glob = require('glob');
var utils = require('./lib/utils');
var defaultCfg = {
  routePath: 'routes'
};
var basename = path.basename;
var dirname = path.dirname;

module.exports = autoRouteExpress;

function autoRouteExpress(app, cfg) {
  var cwd = process.cwd();

  // Apply default values for missing configuration options.
  var opts = utils.applyDefaults(defaultCfg, cfg);

  console.log('Using configuration: ' + utils.formatObject(opts));

  // Find all files matching the specified pattern
  glob(opts.routePath + '/**/*.js', {}, function (err, files) {
    // Iterate of the files
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // The name of the file specifies the HTTP method, e.g. get.js for a GET request.
      // Cut off the path and the extension.
      var method = basename(file, '.js');

      // Files starting with an underscore are ignored.
      if (!(method.substring(0, 1) === '_')) {
        // The name of the directory is used as the path.
        // A dollar sign specifies a parameter - change the $ to a colon (:),
        // since that is what express understands.
        var pathName = dirname(file).replace('$', ':').replace(opts.routePath, '');

        // Create the full path of the file to load
        var fullFilePath = path.join(cwd, file);

        console.log('Adding route ' + method + ' ' + pathName + ' - from ' + fullFilePath);

        // Load the file and the contained function
        var fn = require(fullFilePath);

        var middlewares = fn.middlewares || [];

        console.log('Middlewares: ' + middlewares);

        // Define the route for the given path and function
        app[method](pathName, middlewares, fn);
      }
    }
  });
}
