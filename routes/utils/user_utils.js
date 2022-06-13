const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}','${recipe_id})`);
}

async function insertMyRecipes(user_id,recipe_id,title,readyInMinutes,image,vegan,vegetarian,glutenFree,servings,extendedIngredients,instructions){
    await DButils.execQuery(`insert into MyRecipes values ('${user_id}','${recipe_id}','${title}','${readyInMinutes}','${image}','${vegan}','${vegetarian}','${glutenFree}','${servings}','${extendedIngredients}','${instructions}')`);
}


async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function userWatchedRecipe(user_id, recipe_id){
    await DButils.execQuery(`insert into WatchedRecipes values ('${user_id}','${recipe_id}')`);
}

async function getWatchedRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from WatchedRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function getFamilyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id,WhoCooked,WhenCooked,extendedIngredients,steps from FamilyRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function getFamilyRecipesID(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id where user_id='${user_id}'`);
    return recipes_id;
}

async function getMyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from MyRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function insertFamilyRecipes(user_id,recipe_id,WhoCooked,WhenCooked,extendedIngredients,steps,images){
    await DButils.execQuery(`insert into FamilyRecipes values ('${user_id}','${recipe_id}','${WhoCooked}','${WhenCooked}','${extendedIngredients}','${steps}','${images}')`);
}




exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.userWatchedRecipe = userWatchedRecipe;
exports.getWatchedRecipes = getWatchedRecipes;
exports.getFamilyRecipes = getFamilyRecipes;
exports.getMyRecipes = getMyRecipes;
exports.insertFamilyRecipes = insertFamilyRecipes;
exports.insertMyRecipes=insertMyRecipes;
exports.getFamilyRecipesID=getFamilyRecipesID;