import { parseRecipe } from "./classParsers.js";
import { printRecipes } from "./createHtml.js";

const URLRECIPIES = [
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=53013`,
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52848`,
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=53044`,
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=53041`,
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52854`,
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52829`,
];

export async function getRecipes() {
   // .map kör funktionen fetchRecipes för varje url i URLRECIPIES.
   let recipes = await Promise.all(URLRECIPIES.map(fetchRecipes));

   printRecipes(recipes);
}

// Kör fetch mot api:et, parsar till json, kör parseRecipe och returnerar ett Receptobject
export async function fetchRecipes(url){
   let response = await fetch(url);
   let data = await response.json();
   return parseRecipe(data.meals[0]);
}

export async function getSearchedRecipes(){
   let searchWord = document.querySelector('[name=search]').value;

   const P = document.querySelector('#recipes > header > p:nth-child(2)');
   P.innerHTML = `Resultat för sökning på: ${searchWord}`;

   try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`);
      let data = await response.json();

      // Map kör parseRecipe för varje meal
      let recipes = await data.meals.map((recipe) => {
         return parseRecipe(recipe);
      });

      printRecipes(recipes);
      
   } catch (error) {
      printRecipes("");
   }

}