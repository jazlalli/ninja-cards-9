var fs = require('fs'),
	file = __dirname + '/cards.json';

var products;
fs.readFile(file, 'utf8', function (error, data) {
	if (error) {
		console.log(error);
		return;
	}

	products = JSON.parse(data);
});

exports.getAll = function (request, response) {
	response.send(products);
};

exports.getById = function (request, response) {
	var i,
		count = products.PrimaryCreditCards.length;

	for (i = 0; i < count; i += 1) {
		if (products.PrimaryCreditCards[i].ProductCode == request.params.id) {
			response.send(products.PrimaryCreditCards[i]);
		}
	}
};