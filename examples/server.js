var express = require('express'),
    app = module.exports = express(),
    autoExpress = require('..'),
    port = 8082;

// Configuration
app.configure(function () {
    app.use(express.logger('[:date] :method :url :status - :response-time ms'));
    app.use(express.bodyParser());

    autoExpress(app);
});

app.listen(port);

console.log('Express server listening on port ' + port);