var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipes_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipes_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

//user_id,recipe_id,WhoCooked,WhenCooked,extendedIngredients,steps,images
router.post('/familyRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    const WhoCooked = req.body.WhoCooked;
    const WhenCooked = req.body.WhenCooked;
    const extendedIngredients = req.body.extendedIngredients;
    const steps = req.body.steps;
    const images = req.body.images;
    await user_utils.insertFamilyRecipes(user_id,recipe_id,WhoCooked,WhenCooked,extendedIngredients,steps,images);
    res.status(200).send("The family Recipe successfully saved");
    } catch(error){
    next(error);
  }
})

router.get("/familyRecipes", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFamilyRecipesID(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipes_utils.getFamilyRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

router.get("/myRecipes", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getMyRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipes_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

//user_id,recipe_id,title,readyInMinutes,image,vegan,vegetarian,glutenFree,servings,extendedIngredients,instructions
router.post('/myRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    const title = req.body.title;
    const readyInMinutes = req.body.readyInMinutes;
    const image = req.body.image;
    const vegan = req.body.vegan;
    const vegetarian = req.body.vegetarian;
    const glutenFree = req.body.glutenFree;
    const servings = req.body.servings;
    const extendedIngredients = req.body.extendedIngredients;
    const instructions = req.body.instructions;
    await user_utils.insertMyRecipes(user_id,recipe_id,title,readyInMinutes,image,vegan,vegetarian,glutenFree,servings,extendedIngredients,instructions);
    res.status(200).send("The Recipe successfully saved");
    } catch(error){
    next(error);
  }
})

// router.get("/WatchedRecipes", async (req, res, next) => {
//   try {
//     const user_id = req.session.user_id;
//     let favorite_recipes = {};
//     const recipes_id = await user_utils.getWatchedRecipes(user_id);
//     let recipes_id_array = [];
//     recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
//     const results = await recipes_utils.getRecipesPreview(recipes_id_array);
//     res.status(200).send(results);
//   } catch (error) {
//     next(error);
//   }
// });

// //user_id,recipe_id,title,readyInMinutes,image,vegan,vegetarian,glutenFree,servings,extendedIngredients,instructions
// router.post('/WatchedRecipes', async (req,res,next) => {
//   try{
//     const user_id = req.session.user_id;
//     const recipe_id = req.body.recipe_id;
//     const title = req.body.title;
//     const readyInMinutes = req.body.readyInMinutes;
//     const image = req.body.image;
//     const vegan = req.body.vegan;
//     const vegetarian = req.body.vegetarian;
//     const glutenFree = req.body.glutenFree;
//     const servings = req.body.servings;
//     const extendedIngredients = req.body.extendedIngredients;
//     const instructions = req.body.instructions;
//     await user_utils.insertMyRecipes(user_id,recipe_id,title,readyInMinutes,image,vegan,vegetarian,glutenFree,servings,extendedIngredients,instructions);
//     res.status(200).send("The Recipe successfully saved");
//     } catch(error){
//     next(error);
//   }
// })



module.exports = router;
