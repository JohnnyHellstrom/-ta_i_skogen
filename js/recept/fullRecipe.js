import { fetchRecipes } from "./fetchFromTheMealDB.js";
import { printFullRecipe } from "./createHtml.js";

addEventListener('load', main);

async function main(){
   removeEventListener('load', main);
   const PARAM = new URLSearchParams(window.location.search);
   const ID = PARAM.get('id');
   const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`;
   let recipe = await fetchRecipes(URL);

   printFullRecipe(recipe);
}

