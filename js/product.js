
class product {
    constructor(id, name, price, description, image, colors) {
        this.id = id;
        this.name = name;
        this.price = price / 100;
        this.description = description;
        this.image = image;
        this.colors = colors;
    }
}
let selectedColor = null;     
 ///// determiner l'ID du produit selectionne
 function recuperationIdProduct() {                            
    let url = new URL(document.location)
    let parametre = url.searchParams;
    let id = parametre.get('id')
       return id
}
  /// telecharger les donnees du produit selectionné
function getProductById(id){
    return fetch("http://localhost:3000/api/teddies/" + id).then(response => {
    return  response.json()
            })    
}
   /////afficher les donnees du produit selectionné
function displayProductDetails(response){
    const productList = document.getElementById("product_list2")
    const productImage = document.createElement('img')
    productImage.className = 'product_image2';
    productImage.src = response.image;
   
    const productName = document.createElement('p')
    productName.className = 'product_name2'; 
    productName.textContent = 'Nom :' + ' ' + response.name;

    const productPrice = document.createElement('p')
    productPrice.className = 'product_price2';
    productPrice.textContent = 'Prix:' + ' ' + response.price + ' ' + '€';

    const productDescription = document.createElement('p')
    productDescription.className = 'product_description2';
    productDescription.textContent = 'Description :' +' ' + response.description;

    const productId = document.createElement('p')
    productId.className = 'product_id2';
    productId.textContent = 'Id :' +' ' + response.id;
    console.log(response.id);
    
    productColor = document.getElementById('product_color2')
    productLabel = document.getElementById('product_label')
    productSelect = document.getElementById('product_couleur')
    
    let choix_couleur = response.colors;
        for(let i=0; i<choix_couleur.length; i++ ){
            productSelect.innerHTML += ('<option>' + choix_couleur[i] + '</option>');
        }
    productList.append(productImage);
    productList.append(productName);
    productList.append(productPrice);
    productList.append(productDescription);
    productList.append(productId);
    productList.append(productColor);

    
}
    const id =  recuperationIdProduct();
    getProductById(id).then((response)=>{
    product = new product(response._id, response.name, response.price, response.description, response.imageUrl, response.colors);
    console.log(product);
    displayProductDetails(product);
    });

    // ajouter article au panier

    // 1 determiner les carac. de l'article   //2 sauv article dans LS 
let ajout_panier = document.getElementById("ajouter_panier");
  ajout_panier.addEventListener('click', (response) =>{
  let articleChoisi  =  {
    image : product.image ,
    name : product.name ,
    price : product.price,
    description : product.description,
    color : document.getElementById('product_couleur').value,      
    id : product.id
  }
  const articleAjoute  =  localStorage.getItem ( 'product' ) ;
  if ( articleAjoute )  {
    articlePanier  =  JSON.parse ( articleAjoute ) ;
    articlePanier.push ( articleChoisi ) ;
    localStorage.setItem ( 'product' ,JSON.stringify ( articlePanier ) ) ;
  } else  {
      articlePanier  =  [ ] ;
      articlePanier.push( articleChoisi ) ;
      localStorage .setItem ( 'product' ,JSON.stringify ( articlePanier ) ) ;
    }
});
//////////    liens vers pages suivantes et précedante
let Continuer_Achats = document.getElementById("retour_accueil");
Continuer_Achats.addEventListener('click',() =>{
      location = 'index.html';
});

let mon_panier = document.getElementById('mon_panier');
mon_panier.addEventListener('click', () => {
    location = "panier.html";
});

      







