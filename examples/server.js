var express = require('express');
var app = module.exports = express();
var autoRouteExpress = require('..');
var port = 8082;

// Configuration
app.configure(function () {
  app.use(express.logger('[:date] :method :url :status - :response-time ms'));
  app.use(express.bodyParser());

  autoRouteExpress(app);
});

app.listen(port);

console.log('Express server listening on port ' + port);
