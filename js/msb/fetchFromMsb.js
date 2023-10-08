import { parseFireData } from "./msbClassesParsers.js";
import { createSectionFireData, createErrorMsg, addHeaderToSection } from "./createHtml.js";

export async function getFireData(coords){
   const MSBDIV = document.querySelector('#msbData');
   
   try {
      let FireData = await fetchFireData(coords.coords.latitude, coords.coords.longitude);
      let section = createSectionFireData(FireData);
      section.insertBefore(addHeaderToSection('Läget där du befinner dig'), section.firstChild);
      MSBDIV.appendChild(section);
   } catch (error) {
      MSBDIV.appendChild(createErrorMsg());
   }
} 

export async function getSearchedFireData(){
   let lat = document.querySelector('[name=lat]').value;
   let lon = document.querySelector('[name=lon]').value;
   const SEARCHEDDATA = document.querySelector('#msbSearchedData');
   let searchSection;

   if(isValidLatitude(parseFloat(lat)) && isvalidLongitud(parseFloat(lon))){
      try {
         let FireData = await fetchFireData(lat,lon);
         searchSection = createSectionFireData(FireData);
         searchSection.insertBefore(addHeaderToSection('Sökresultat'), searchSection.firstChild);
      } catch (error) {
         searchSection = createErrorMsg();
      }
       
   } else {
      searchSection = createErrorMsg();
   }

   //Kolla om det redan finns sökt data/felmeddelande och ersätt eller presentera nytt
   if(SEARCHEDDATA.children.length == 1){
      SEARCHEDDATA.insertBefore(searchSection, SEARCHEDDATA.firstChild);
   } else {
      SEARCHEDDATA.firstChild.replaceWith(searchSection);
   }    

}

async function fetchFireData(lat, lon){

   // Hämta info om eldningsförbud,brandriskför givna koordinater
   let urlFireProhibition = `https://api.msb.se/brandrisk/v2/FireProhibition/sv/${lat}/${lon}`;
   let urlCurrentRisk = `https://api.msb.se/brandrisk/v2/CurrentRisk/sv/${lat}/${lon}`;
   
   let responses = await Promise.all([fetch(urlFireProhibition), fetch(urlCurrentRisk)]);
   
   let fireProhibition = await responses[0].json();
   let currentRisk = await responses[1].json();

   return parseFireData(fireProhibition, currentRisk);
}


function isValidLatitude(lat){
   return (typeof lat === 'number' && Math.abs(lat) <= 90);
}
function isvalidLongitud(lon){
   return (typeof lon === 'number' && Math.abs(lon) <= 180);
}