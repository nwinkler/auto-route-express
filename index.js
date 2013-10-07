var path = require('path'),
    glob = require('glob'),
    pathPrefix = 'routes',
    basename = path.basename,
    dirname = path.dirname;

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

                console.log(method + ' ' + pathName + ' - from ' + fullFilePath);

                var fn = require(fullFilePath);

                app[method](pathName, fn);
            }
        }
    });
}

