type Ingredient = {
    name: string
    number: number
    quantity: string
}

type NutriFacts = {
    calories: number,
    carbs: number,
    fat: number,
    protein: number,
    cholesterol: number,
    fiber: number,
}

type Prediction = {
    percentage: number,
    prediction: string,
    raw_data: string[]
}

type PredictionData = {
    filepath: string,
    ada: Prediction,
    mlp: Prediction
}

type Nutrition = {
    name: string,
    number: number
}