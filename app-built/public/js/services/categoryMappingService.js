define(['app'], function ($app) {
	'use strict';
	
	console.log('loading Angular services');

	return $app.factory('categoryMapper', function () {
		var i, j,
			categories,
			numberOfCategories,
			card;

		return function (creditCards, selectedCategory) {
			var categoriesCss,
				numberOfCards = creditCards.length;

			for (i = 0; i < numberOfCards; i += 1) {
				categoriesCss = 'carditem ',
				card = creditCards[i],
				categories = card.Categories,
				numberOfCategories = categories.length;

				for (j = 0; j < numberOfCategories; j += 1) {
					categoriesCss += categories[j].Name + ' ';
					card.CategoriesCss = categoriesCss;
					card.DisplayOrder = 999;

					if (selectedCategory && selectedCategory === categories[j].Name) {
						card.DisplayOrder = categories[j].DisplayOrder;
					}
				}

				creditCards[i] = card;
			}
			return creditCards;
		};
	});
});