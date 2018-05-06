export function calcNutritionalValue(meal, product, amount, index) {
    // TODO: Пересмотреть параметры функции    
    let portionSize = product.portionSize || 1;

    meal.products[index].product = product;
    meal.products[index].amount = amount;
    meal.products[index].proteins = product.proteins * (amount / portionSize);
    meal.products[index].fats = product.fats * (amount / portionSize);
    meal.products[index].carbohydrates = product.carbohydrates * (amount / portionSize);
    meal.products[index].cellulose = product.cellulose * (amount / portionSize);
    meal.products[index].caloricity = product.caloricity * (amount / portionSize);
    meal.products[index].energy = product.energy * (amount / portionSize);
    meal.products[index].glycemicIndex = product.glycemicIndex * (amount / portionSize);
    meal.products[index].insulinIndex = product.insulinIndex * (amount / portionSize);

    meal = calcTotalNutritionalValue(meal);

    return meal;
}

export function calcTotalNutritionalValue(meal) {
    meal.totalAmount = 0;
    meal.totalProteins = 0;
    meal.totalFats = 0;
    meal.totalCarbohydrates = 0;
    meal.totalCellulose = 0;
    meal.totalCaloricity = 0;
    meal.totalEnergy = 0;
    meal.products.map(function(product, index) {
        meal.totalAmount += parseFloat(product.amount);
        meal.totalProteins += product.proteins;
        meal.totalFats += product.fats;
        meal.totalCarbohydrates += product.carbohydrates;
        meal.totalCellulose += product.cellulose;
        meal.totalCaloricity += product.caloricity;
        meal.totalEnergy += product.energy;
    });

    return meal;
}