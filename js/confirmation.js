////// afficher le montant global et le numéro de commande
document.getElementById('total4');
const total = parseInt (localStorage.getItem('total')); 
let afficheTotal = document.getElementById('total4');
afficheTotal.textContent = 'Le montant total de votre commande est de :' + ' ' + total + ' ' + '€';

document.getElementById('confirmation4');
const confirmation = JSON.parse(localStorage.getItem('confirmation'));
let afficheConfirmation = document.getElementById('confirmation4');
afficheConfirmation.textContent = 'Votre commande porte le n°  :' + ' ' + confirmation.orderId;
console.log(total, confirmation);

    


localStorage.clear();

////// continuer achats 

function continuerAchats(){   
let continuerAchats = document.getElementById("continuer_achats");
    continuerAchats.addEventListener('click', () =>{
    location = "  index.html";
	});
}   
continuerAchats();