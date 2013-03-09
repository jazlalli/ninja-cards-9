var express = require('express'),
    fs = require('fs'),
    cards = require('./routes/cards');
 
var app = express();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use('/', express.static(__dirname + '/public/'));
    app.use(app.router);
});

app.get('/', function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.write(fs.readFileSync(__dirname + '/public/views/index.html'));
    response.end();
});

app.get('/cards', function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.write(fs.readFileSync(__dirname + '/public/views/cards.html'));
    response.end();
});

app.get('/api/cards', cards.getAll);
//app.get('/api/cards/:id', cards.getById);

app.listen(3000);
console.log('Listening on port 3000...');