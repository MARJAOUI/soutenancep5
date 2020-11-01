//constatntes

const  articleAjoute_json  =  localStorage . getItem ( 'product' ) ;
let  articleAjoute =  JSON . parse ( articleAjoute_json ) ;
console.log(articleAjoute);
let produits = [];


const contactNom = document.getElementById('contact_nom');
const contactPrenom = document.getElementById('contact_prenom');
const contactAdresse = document.getElementById('contact_adresse');
const contactVille = document.getElementById('contact_ville');
const contactEmail = document.getElementById('contact_email');
const envoyer_commande = document.getElementById('envoi_commande');
class Contact {
  constructor(nom, prenom, adresse, ville, email) {
  	this.lastName = nom;               
    this.firstName = prenom;        
    this.address = adresse;        
    this.city = ville;
    this.email = email;
  }
}

 //////   afficher panier

function afficherArticleSelectionne(){
	for(let i in articleAjoute){                 
		const listeArticles = document.getElementById('liste_articles');
		const articlePanier = document.createElement('div');
		articlePanier.className = ('article_panier')

		const imageArticle = document.createElement('img');
		imageArticle.className = ('image_article3');
		imageArticle.src = articleAjoute[i].image;

		const nomArticle = document.createElement('p');
		nomArticle.className = ('nom_article3');
		nomArticle.textContent = 'Nom :' + ' ' + articleAjoute[i].name;

		const prixArticle = document.createElement('p');
		prixArticle.className = ('prix_article3');
		prixArticle.textContent = 'Prix unitaire :' + ' ' + articleAjoute[i].price + ' ' + '€' ;

		const idArticle = document.createElement('p');
		idArticle.className = ('id_article3');
		idArticle.textContent = 'ID :' + '' + articleAjoute[i]._id

		const couleurArticle = document.createElement('p');
		couleurArticle.className = ('couleur_article3');
		couleurArticle.textContent = 'Couleur :' + ' ' + articleAjoute[i].color;


		////////////////  suppression article  ////////////////
    
    const suppressionArticle = document.createElement('button');
		suppressionArticle.id = ('suppression_article');
		suppressionArticle.textContent = 'Supprimer Article';
    suppressionArticle.onclick = function removeItem(){
      let articleAjoute = localStorage.getItem("product");
      //Decode the array. 
      articleAjoute = JSON.parse(articleAjoute);
      //remove item
      articleAjoute.splice(i,1);
       // Encode the array.
      articleAjoute = JSON.stringify(articleAjoute);

      // Add the array back to LocalStorage. 
      localStorage.setItem("product", articleAjoute);
      window.location = 'panier.html';
    } 
    articlePanier.append(imageArticle, nomArticle, prixArticle, couleurArticle,  suppressionArticle );
		listeArticles.append(articlePanier);

  //////incrementation de l'article à ajouter

		produits.push(articleAjoute[i].id)
		console.log(produits);

  //////Afficher montant global à payer 

  let prixTotal = document.getElementById('prix_total');
  let montantGlobal = 0;
   for(let i = 0; i<articleAjoute.length; i++){
      montantGlobal += articleAjoute[i].price 
   }
  localStorage.setItem("total", montantGlobal )
  prixTotal.innerText = 'Le montant total de votre panier est de :' + ' ' + `${montantGlobal}` + ' ' + `€`;
  }
  let envoyer_commande = document.getElementById('envoi_commande');
	envoyer_commande.addEventListener('submit', (event) =>{
	event.preventDefault()
	const form = event.target;
	const contact = new Contact(form['contact_nom'].value, form['contact_prenom'].value, form['contact_adresse'].value, form['contact_ville'].value, form['contact_email'].value);
	envoiCommande(contact, produits);
  //localStorage.removeItem('product');
  })
}
afficherArticleSelectionne();

////// vider panier
function viderPanier(){    
  let viderPanier = document.getElementById("vider_panier");
     viderPanier.addEventListener('click', () =>{
     localStorage.removeItem('product');
     window.location = 'panier.html';
      });
}
viderPanier();

//////continuer achats 

function continuerAchats(){   
let continuerAchats = document.getElementById("continuer_achats");
    continuerAchats.addEventListener('click', () =>{
    location = "  index.html";
	});
}   
continuerAchats();

  //////envoi commande

let contact = new Contact(contactNom.value, contactPrenom.value, contactAdresse.value, contactVille.value, contactEmail.value);
console.log(contact);
function envoiCommande(contact, products){
  fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({contact, products })
  }).then(response => {
    response.json().then(data => {
      console.log(data);
      localStorage.setItem("confirmation", JSON.stringify(data))	
      window.location = 'confirmation.html';
  });
    });
}
const email = document.getElementById("contact_email");
email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Veuiller saisir une adresse Mail !");
  } else {
    email.setCustomValidity("");
  }
});
    
    





