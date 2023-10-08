// Skapar ett receptobject av json data från API
export function parseRecipe(meal) {
   let ingredients = [];
   let ingredient = 'strIngredient';
   let messure = 'strMeasure';
   //Skapa array med object av ingridienser + mått
   for (let i = 1; i <= 20; i++) {
      if (meal[ingredient + i].length === 0) {
         break;
      } else {
         let ing = meal[ingredient + i];
         let mes = meal[messure + i];
         ingredients.push(new Ingridient(ing, mes));
      }
   }
   // Skapa och returnera receptobject
   return new Recipe(
      meal.idMeal,
      meal.strMeal,
      meal.strCategory,
      meal.strArea,
      meal.strInstructions,
      meal.strMealThumb,
      ingredients
   )
}

class Recipe {
   constructor(id, name, category, kitchen, instructions, picture, ingredients) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.kitchen = kitchen;
      this.instructions = instructions;
      this.picture = picture;
      this.ingredients = ingredients;
   }
}
class Ingridient{
   constructor(name, messure){
      this.name = name;
      this.messure = messure;
   }
}