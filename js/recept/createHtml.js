
export function printFullRecipe(recipe){
   const DIV = document.querySelector('#fullRecipe');

   DIV.appendChild(makeElement('section', '', 'id', 'recipeGrid'));
   
   //Header för receptet
   DIV.firstChild.appendChild(makeElement('header'));
   const HEADER = DIV.firstChild.firstChild;

   HEADER.appendChild(makeElement('h2', recipe.name));
   HEADER.appendChild(makeElement('p', 'Kategori: ' + recipe.category));
   HEADER.appendChild(makeElement('p','Kök: ' + recipe.kitchen));
   HEADER.appendChild(makeElement('a','Tillbaka till recepten', 'href', 'lista.html'));
   
   //Picture
   DIV.firstChild.appendChild(makeElement('picture'));
   const PICTURE = DIV.firstChild.lastChild;
   PICTURE.appendChild(makeElement('img', '', 'alt',`Bild på maträtten ${recipe.name}`));
   PICTURE.firstChild.setAttribute('src', recipe.picture);

   //Section med table för ingridienser
   DIV.firstChild.appendChild(makeElement('section'));
   DIV.firstChild.lastChild.appendChild(makeElement('h3', 'Ingridienser'));
   DIV.firstChild.lastChild.appendChild(makeElement('table'));
   const TABLE = DIV.firstChild.lastChild.lastChild;
   recipe.ingredients.forEach(row => {
      const TR = makeRowsWithIngridientsMessures(row);
      TABLE.appendChild(TR);
   });

   //Section med Instruktionen
   DIV.firstChild.appendChild(makeElement('section'));
   DIV.firstChild.lastChild.appendChild(makeElement('h3', 'Instruktion'));
   const UL = makeULWithInstructions(recipe.instructions);
   DIV.firstChild.lastChild.appendChild(UL);
}

export function printRecipes(recepies){
   const DIV = document.querySelector('#recipeWidget');
   if(DIV.hasChildNodes()){
      DIV.replaceChildren();
   }
   if(recepies == ""){
      return;
   }

   recepies.forEach(recepie => {
      DIV.appendChild(createHtmlRecipePreview(recepie));
   });
}

function createHtmlRecipePreview(recepie){
   let article = makeElement('article');

   article.appendChild(makeElement('a','', 'href', `gor-sa-har.html?id=${recepie.id}`))
   
   const A = article.firstChild;
   A.appendChild(makeElement('img', '', 'alt', 'Bild som visar rätten ' + recepie.name));
   A.firstChild.setAttribute('src', recepie.picture);
   A.appendChild(makeElement('h3', recepie.name));
   A.appendChild(makeElement('p', 'Kategori: ' + recepie.category));
   A.appendChild(makeElement('p', 'Kök: ' + recepie.kitchen));
   return article;
}

function makeULWithInstructions(instructions){
   const UL = makeElement('ul');

   instructions = instructions.split('\r\n');

   instructions.forEach(text => {
      UL.appendChild(makeElement('li', text));
   });
   return UL;
}

function makeElement(element, innerHtml = "", attr = "", value =""){
   let el = document.createElement(element);
   if(innerHtml != ""){
      el.innerHTML = innerHtml;
   }
   if(attr != "" && value != ""){
      el.setAttribute(attr, value);
   }
   return el;
}

function makeRowsWithIngridientsMessures(ingredient){
   const TR = makeElement('tr');
   TR.appendChild(makeElement('th', ingredient.name))
   TR.appendChild(makeElement('td', ingredient.messure));
   return TR;
}