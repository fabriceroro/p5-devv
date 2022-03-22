//
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
    console.log(idProduct);
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
       return getadd(res)
        })
   


function getadd(article) {
//
            let productImg = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImg);
            productImg.src = article.imageUrl;
            productImg.alt = article.altTxt;
//  
            let productName = document.getElementById("title");
            productName.innerHTML = article.name;
   // 
            let productPrice = document.getElementById("price");
            productPrice.innerHTML = article.price;  
    //
            let productDescription = document.getElementById("description");
            productDescription.innerHTML = article.description;
    //    
            for (let colors of article.colors){
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
            }
        addToCart(article);
        }

const colorPicked = document.querySelector("#colors");
//
const quantityPicked = document.querySelector("#quantity");
//
const btn_envoyerPanier = document.querySelector("#addToCart");
console.log(btn_envoyerPanier);
//
function addToCart(article){
   
    let name = document.getElementById("title").textContent;

    let quantity = document.getElementById("quantity").value;

    //
    btn_envoyerPanier.addEventListener("click", (event) =>{
        event.preventDefault();
      let optionProduit = {
       idProduit: idProduct,
       nomProduit: name,
       couleurProduit: colorPicked.value,
       choixQuantite: parseInt(quantityPicked.value),
       descriptionProduit: article.description,
       imgProduit: article.imageUrl,
       altImgProduit: article.altTxt,
      }
       console.log(optionProduit); 
       //
       let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
       console.table(panierLocalStorage);
       //
       const popupConfirmation = () =>{
           if(window.confirm(`Votre commande de ${name} de la couleur ${colorPicked.value} quantité ${quantityPicked.value} a bien été ajouté au panier
           Pour consulter votre panier, clicker sur OK`)){
               window.location.href = "cart.html";
           }
           //
           else{
               window.location.href = "index.html";
           }
       }
       
       if (!panierLocalStorage){
        panierLocalStorage = [];
       }
       //ont verifie si le produit et déja dans le panier avec la meme couleur
       // si oui ont ajoute la quantite
       for(var i = 0 ; i < panierLocalStorage.length; i++){
           if(panierLocalStorage[i].idProduit == optionProduit.idProduit 
           && panierLocalStorage[i].couleurProduit == optionProduit.couleurProduit){
               panierLocalStorage[i].choixQuantite += optionProduit.choixQuantite ;
               optionProduit =null;
               break;
           }
       }
      
       //sinon ont ajoute a la fin du panier 
       if(optionProduit){   
              panierLocalStorage.push(optionProduit);
        }



       localStorage.setItem("produit", JSON.stringify(panierLocalStorage));
       popupConfirmation();
       
       
       
     
  });
  
}
