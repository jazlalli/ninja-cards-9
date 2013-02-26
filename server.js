var express = require('express'),
    fs = require('fs'),
    api = require('./routes/api');

var app = express();
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);        
});

app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/public/views/index.html'));
});

app.get('/api/cards', api.cards);
app.get('/api/cards/:id', api.card);

app.listen(3000);
console.log('Listening on port 3000...');