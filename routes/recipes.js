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

router.get("/alive", (req, res) => res.send("I'm alive"));
router.get("/", (req, res) => res.send("im here"));




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





module.exports = router;
