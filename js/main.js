const MENUBUTTON = document.querySelector('body > header > img:last-child');
const NAVBAR = document.querySelector('nav');
MENUBUTTON.addEventListener('click', toggleNavbar);

function toggleNavbar(){
   if(NAVBAR.style.display === "block"){
      NAVBAR.style.display = "none";
   } else {
      NAVBAR.style.display = "block";
   }
}