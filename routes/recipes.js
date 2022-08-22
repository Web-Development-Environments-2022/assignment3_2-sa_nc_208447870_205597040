var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const user_utils = require("./utils/user_utils");
const DButils = require("./utils/DButils");

router.get('/random', async (req,res,next) => {
  try{
    const results = await recipes_utils.getRandomRecipes();
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.get('/SearchByFood', async (req,res,next) => {
  try{
    const results = await recipes_utils.SearchByFood();
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.get("/alive", (req, res) => res.send("I'm alive"));
router.get("/", (req, res) => res.send("im here"));

router.get("/search", async (req, res, next) => {
  try{
    const query = req.query.query;
    const cuisine  = req.query.cuisine;
    const diet = req.query.diet;
    const intolerances = req.query.intolerances;
    const number = req.query.number;
    
    let recipes = await recipes_utils.searchRecipes(query, cuisine , diet, intolerances, number);
    var answer = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let id = recipe.id;
      console.log(id);
      // console.log(await recipes_utils.getRecipeDetails(id));
      answer.push((await recipes_utils.getRecipeDetails(id)));
    }

    res.status(200).send(answer);
  } catch(error){
    next(error); 
  }
});

router.get("/information", async (req, res, next) => {
  console.log(req.query.id);
  try {
    const recipe = await recipes_utils.getRecipeFull(req.query.id);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.use("/", async (error) =>{

})

module.exports = router;