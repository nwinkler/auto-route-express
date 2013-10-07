var path = require('path'),
    glob = require('glob'),
    pathPrefix = 'routes',
    basename = path.basename,
    dirname = path.dirname;

module.exports = autoExpress;

function autoExpress(app) {
    glob(pathPrefix + '/**/*.js', {}, function (err, files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            var method = basename(file, '.js');

            if (!(method.substring(0, 1) === '_')) {
                var path = dirname(file).replace('$', ':').replace(pathPrefix, '');

                var fn = require('./' + file);

                console.log(method + ' ' + path + ' - from ' + file);

                app[method](path, fn);
            }
        }
    });
}

