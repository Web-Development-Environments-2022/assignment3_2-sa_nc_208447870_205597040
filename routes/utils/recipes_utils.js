const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getRecipesPreview(recipes_id_array) {
    var arr =[];
    for (let i = 0; i < recipes_id_array.length; i++) {
        arr.push(getRecipeA(recipes_id_array[i]))
    }
    return arr;
}


async function getRecipeA(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, servings, extendedIngredients, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, instructions} = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        servings: servings,
        extendedIngredients: extendedIngredients,
        instructions : instructions,
    }

}

async function getFamilyRecipesPreview(user_id) {
    let recipe_info = await getFamilyRecipes(user_id);
    let {recipe_id,title,readyInMinutes,image,vegan,vegetarian,glutenFree,servings,extendedIngredients,instructions} = recipe_info.data;

    return {
        recipe_id: recipe_id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        servings: servings,
        extendedIngredients: extendedIngredients,
        instructions : instructions,
    }
}



async function randomRecipesFromApi(){
    return await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getRandomRecipes() {
    let recipe_info = await randomRecipesFromApi();
    return recipe_info.data
}   





exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getFamilyRecipesPreview = getFamilyRecipesPreview;
exports.getRandomRecipes= getRandomRecipes;



