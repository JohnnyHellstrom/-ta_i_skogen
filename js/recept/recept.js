import { getRecipes,getSearchedRecipes } from "./fetchFromTheMealDB.js";

addEventListener('load', main);
const SEARCHBUTTON = document.querySelector('#recipes form button');
SEARCHBUTTON.addEventListener('click', getSearchedRecipes);

async function main(){
   removeEventListener('load', main);

   getRecipes();
}