var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
    console.log(idProduct);
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      return res.json();
    })
    .then((article) => {
        getadd(article)
        })
   


function getadd(article) {

            let productImg = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImg);
            productImg.src = article.imageUrl;
            productImg.alt = article.altTxt;
    
            let productName = document.getElementById("title");
            productName.innerHTML = article.name;
    
            let productPrice = document.getElementById("price");
            productPrice.innerHTML = article.price;  
    
            let productDescription = document.getElementById("description");
            productDescription.innerHTML = article.description;
        
            for (let colors of article.colors){
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
            }
        addToCart(article);
        }

const colorPicked = document.querySelector("#colors");

const quantityPicked = document.querySelector("#quantity");

const btn_envoyerPanier = document.querySelector("#addToCart");
console.log(btn_envoyerPanier);

function addToCart(article){
 
    let name = document.getElementById("title").textContent;

    let quantity = document.getElementById("quantity").value;
    
    
    btn_envoyerPanier.addEventListener("click", (event) =>{
        event.preventDefault();
      let optionProduit = {
       idProduit: idProduct,
       nomProduit: name,
       couleurProduit: colorPicked.value,
       choixQuantite: quantityPicked.value,
      }
       console.log(optionProduit);
    
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
    
    
            
    
    
  });
  
}