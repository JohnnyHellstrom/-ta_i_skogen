export function createSectionFireData(FireData){  
   let section = document.createElement('section');

   section.appendChild(makeElement('h3', `Kommun: ${FireData.county}`));
   section.appendChild(makeElement('p', FireData.prohibitionStatus));
   section.appendChild(makeElement('p', `Brandriskindex: ${FireData.fireIndex}`));
   section.appendChild(makeElement('p', FireData.prohibitionMsg));
   section.appendChild(makeElement('p', `Eldningsförbud uppdaterat: <time>${FireData.prohibitionTime}</time>`));
   section.appendChild(makeElement('p', `Brandrisk uppdaterat: <time>${FireData.IndexTime}</time>`));

   if(FireData.url != null){
      let a = makeElement('a', `Läs mer om eldningsförbud i ${FireData.county}`, 'href', FireData.url);
      a.setAttribute('target', '_blank');
      section.appendChild(a);
   }

   return section;
}

export function addHeaderToSection(text){
   let header = document.createElement('header');

   header.appendChild(makeElement('h2', text));

   return header;
}

export function createErrorMsg(){
   let section = document.createElement('section');

   section.appendChild(makeElement('h2', 'Något gick fel'));
   section.appendChild(makeElement('p', 'Kontrollera att du är i eller söker i Sverige'));

   return section;
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