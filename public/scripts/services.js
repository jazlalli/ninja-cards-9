angular.module('services', [])
	.factory('CreditCardCategoryMapper', function () {
		var i = 0,
			categories,
			numberOfCategories,
			card;

		return function (creditCards, selectedCategory) {
			var numberOfCards = creditCards.length,
				categoriesCss = 'carditem ';

			while (i < numberOfCards) {
				var j = 0;
				card = creditCards[i];
				categories = card.Categories,
				numberOfCategories = categories.length;


				while (j < numberOfCategories) {
					categoriesCss += categories[j].Name + ' ';
					card.CategoriesCss = categoriesCss;
					card.DisplayOrder = 999;

					if (selectedCategory && selectedCategory === categories[j].Name) {
						card.DisplayOrder = categories[j].DisplayOrder;
					}
					
					j += 1;
				}

				creditCards[i] = card;
				i += 1;
			}
			return creditCards;
		};
	});