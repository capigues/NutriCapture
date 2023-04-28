function getIngredients(ingredient) {
    if (ingredient == "bangbang-chicken") return bangBangChicken

    if (ingredient == "dan-dan-noodles") return danDanNoodles

    if (ingredient == "twice-cooked-pork") return twiceCookedPork

    if (ingredient == "sichuan-hot-pot") return sichuanHotPot

    if (ingredient == "wontons-in-chili-oil") return wontonsInChiliOil

    return [{'name': 'Invalid', 'number': 0, 'quantity': 'item'}]
}

const bangBangChicken = [
    {'name': 'Chicken thigh', 'number': 600, 'quantity': 'grams'},
    {'name': 'ginger', 'number': 4, 'quantity': 'slices'},
    {'name': 'rice win', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'scallion', 'number': 2, 'quantity': 'stalk'},
    {'name': 'Japanese cucumber', 'number': 1, 'quantity': 'item'},
    {'name': 'sesame paste', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'soy sauce', 'number': 2, 'quantity': 'tbsp'},
    {'name': 'black vinegar', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'chili oil', 'number': 2, 'quantity': 'tbsp'}, 
    {'name': 'sugar', 'number': 1, 'quantity': 'tsp'},
    {'name': 'red chili strips', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'white sesame', 'number': 1, 'quantity': 'tsp'}
]

const danDanNoodles = [
    {'name': 'vegetable oil', 'number': 0.5, 'quantity': 'cup'},
    {'name': 'salt', 'number': 0.25, 'quantity': 'tsp'},
    {'name': 'chili flakes', 'number': 0.25, 'quantity': 'cup'},
    {'name': 'sichuan peppercorn', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'star anise', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'bay leaves', 'number': 3, 'quantity': 'item'},
    {'name': 'cinnamon bark', 'number': 1, 'quantity': 'pc'},
    {'name': 'sesame paste', 'number': 1, 'quantity': 'tsp'},
    {'name': 'stock', 'number': 2, 'quantity': 'tbsp'},
    {'name': 'light soy sauce', 'number': 2, 'quantity': 'tsp'},
    {'name': 'black vinegar', 'number': 2, 'quantity': 'tsp'},
    {'name': 'salt', 'number': 0.5, 'quantity': 'tsp'},
    {'name': 'white pepper', 'number': 0.5, 'quantity': 'tsp'},
    {'name': 'chili oil', 'number': 4, 'quantity': 'tsp'},
    {'name': 'pork', 'number': 60, 'quantity': 'grams'},
    {'name': 'sugar', 'number': 0.5, 'quantity': 'tsp'},
    {'name': 'salt', 'number': 0.25, 'quantity': 'tsp'},
    {'name': 'suimiyacai', 'number': 20, 'quantity': 'grams'},
    {'name': 'noodles', 'number': 200, 'quantity': 'grams'},
    {'name': 'bok choy', 'number': 1, 'quantity': 'pc'},
    {'name': 'sliced scallions', 'number': 1, 'quantity': 'tbs'}
]

const twiceCookedPork = [
    {'name': 'pork belly', 'number': 400, 'quantity': 'grams'},
    {'name': 'scallions', 'number': 2, 'quantity': 'pc'},
    {'name': 'ginger', 'number': 3, 'quantity': 'pc'},
    {'name': 'Szechuan peppercorns', 'number': 0.25, 'quantity': 'tsp'},
    {'name': 'chili bean paste', 'number': 2, 'quantity': 'tbsp'},
    {'name': 'black bean', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'Chinese wine', 'number': 2, 'quantity': 'tbsp'},
    {'name': 'bean paste', 'number': 2, 'quantity': 'tsp'},
    {'name': 'sugar', 'number': 1, 'quantity': 'tsp'},
    {'name': 'cooking oil', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'garlic', 'number': 2, 'quantity': 'tsp'},
    {'name': 'ginger', 'number': 2, 'quantity': 'tsp'},
    {'name': 'leek', 'number': 2, 'quantity': 'pc'},
    {'name': 'small green bell pepper', 'number': 1, 'quantity': 'pc'},
    {'name': 'red chilies', 'number': 2, 'quantity': 'pc'}
]

const sichuanHotPot = [
    {'name': 'chicken', 'number': 1, 'quantity': 'pc'},
    {'name': 'pork bones', 'number': 1, 'quantity': 'kilograms'},
    {'name': 'ginger', 'number': 10, 'quantity': 'pc'},
    {'name': 'scallions', 'number': 3, 'quantity': 'pc'},
    {'name': 'soup stock', 'number': 1000, 'quantity': 'milliliters'},
    {'name': 'dong quai', 'number': 2, 'quantity': 'pc'},
    {'name': 'red dates', 'number': 2, 'quantity': 'pc'},
    {'name': 'yu zhu', 'number': 10, 'quantity': 'pc'},
    {'name': 'goji berries', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'garlic', 'number': 1, 'quantity': 'pc'},
    {'name': 'salt', 'number': 1.5, 'quantity': 'tbsp'},
    {'name': 'dried chili', 'number': 40, 'quantity': 'grams'},
    {'name': 'star anise', 'number': 1, 'quantity': 'pc'},
    {'name': 'cinnamon', 'number': 1, 'quantity': 'pc'},
    {'name': 'Tsaoko', 'number': 1, 'quantity': 'pc'},
    {'name': 'white cardamom', 'number': 5, 'quantity': 'pc'},
    {'name': 'bay leaf', 'number': 1, 'quantity': 'pc'},
    {'name': 'cumin seeds', 'number': 0.5, 'quantity': 'tsp'},
    {'name': 'Szechuan peppercorns', 'number': 1.5, 'quantity': 'tsp'},
    {'name': 'chili bean paste', 'number': 25, 'quantity': 'grams'},
    {'name': 'rock sugar', 'number': 5, 'quantity': 'grams'},
    {'name': 'shoaling wine', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'salt', 'number': 5, 'quantity': 'grams'},
    {'name': 'soup stock', 'number': 1000, 'quantity': 'milliliters'}
]

const wontonsInChiliOil = [
    {'name': 'ground pork', 'number': 250, 'quantity': 'grams'},
    {'name': 'soy sauce', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'salt', 'number': 0.5, 'quantity': 'tsp'},
    {'name': 'white pepper', 'number': 0.25, 'quantity': 'tsp'},
    {'name': 'sugar', 'number': 1, 'quantity': 'tsp'},
    {'name': 'sesame oil', 'number': 1, 'quantity': 'tsp'},
    {'name': 'ginger', 'number': 1, 'quantity': 'tsp'},
    {'name': 'garlic', 'number': 2, 'quantity': 'tsp'},
    {'name': 'scallions', 'number': 2, 'quantity': 'stalks'},
    {'name': 'coriander leaves', 'number': 2, 'quantity': 'stalks'},
    {'name': 'water', 'number': 2, 'quantity': 'tbsp'},
    {'name': 'shoaling wine', 'number': 1, 'quantity': 'tbsp'},
    {'name': 'chili oil', 'number': 4, 'quantity': 'tbsp'},
    {'name': 'soy sauce', 'number': 2, 'quantity': 'tbsp'},
    {'name': 'vinegar', 'number': 2, 'quantity': 'tbsp'},
    {'name': 'minced garlic', 'number': 2, 'quantity': 'tsp'},
    {'name': 'minced scallion', 'number': 2, 'quantity': 'tsp'},
    {'name': 'water', 'number': 200, 'quantity': 'milliliters'},
    {'name': 'soy sauce', 'number': 300, 'quantity': 'milliliters'},
    {'name': 'brown sugar', 'number': 100, 'quantity': 'grams'},
    {'name': 'scallion', 'number': 1, 'quantity': 'stalk'},
    {'name': 'cardamoms', 'number': 3, 'quantity': 'stalk'},
    {'name': 'ginger', 'number': 5, 'quantity': 'slices'},
    {'name': 'star anise', 'number': 3, 'quantity': 'pc'},
    {'name': 'fennel seeds', 'number': 0.5, 'quantity': 'tbsp'},
    {'name': 'cloves', 'number': 15, 'quantity': 'pc'},
    {'name': 'cinnamon', 'number': 1, 'quantity': 'pc'},
    {'name': 'bay leaves', 'number': 3, 'quantity': 'pc'}
]

module.exports = { getIngredients }