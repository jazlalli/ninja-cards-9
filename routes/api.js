var fs = require('fs'),
	file = __dirname + '/products.json';

var products;
fs.readFile(file, 'utf8', function (error, data) {
	if (error) {
		console.log('error');
		return;
	}

	products = JSON.parse(data);
});

exports.cards = function(req, res) {
    res.send(products);
    res.end();
};

exports.card = function (req, res) {
	var i, pLen = products.Cards.length;

	for(i = 0; i < pLen; i += 1){
		if (req.params.id === products.Cards[i].ProductCode) {	
			res.send(products.Cards[i]);
			res.end();
		}
	}
};