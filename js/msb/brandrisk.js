import { getFireData, getSearchedFireData } from "./fetchFromMsb.js";

addEventListener('load', main);
const SEARCHBUTTON = document.querySelector('#wrapperBrandrisk form button');
SEARCHBUTTON.addEventListener('click', getSearchedFireData);

async function main(){
   removeEventListener('load', main);

   //getGeo();
}

function getGeo(){
   let user_coords = navigator.geolocation;

   user_coords.getCurrentPosition(getFireData);
}


