//Initialisation du local storage
let tabRefProducts = {};
let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(panierLocalStorage);
const positionElementCart = document.querySelector("#cart__items");
fetch('http://localhost:3000/api/products')
.then((res) => res.json())
.then((data) => {
  if (panierLocalStorage) {
    for (produit of panierLocalStorage) {
         const product = data.find((d) => d._id === produit.idProduit);
      if (product) {
        tabRefProducts[produit.idProduit] = product.price;
         
      }
    }
  }
getCart();
getTotals();
modifyQuantity();
deleteItem();

})


function getCart(){
  
    if (panierLocalStorage === null || panierLocalStorage == 0) {
        const panierVide = `<p>Votre panier est vide</p>`;
        positionElementCart.innerHTML = panierVide;
        
    } else {
    for (let produit in panierLocalStorage){

    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', panierLocalStorage[produit].idProduit);

    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = panierLocalStorage[produit].imgProduit;
    productImg.alt = panierLocalStorage[produit].altImgProduit;
    
    let productDivCartContent =  document.createElement("div")
    productArticle.appendChild(productDivCartContent);
    productDivCartContent.className = "cart__item__content";

    let productDivDescription = document.createElement("div");
    productDivCartContent.appendChild(productDivDescription);
    productDivDescription.className = "cart__item__content__description";

    let producTitle = document.createElement("h2");
    productDivDescription.appendChild(producTitle);
    producTitle.innerHTML = panierLocalStorage[produit].nomProduit;
    
    let productColorDesciption =  document.createElement("p");
    productDivDescription.appendChild(productColorDesciption);
    productColorDesciption.innerHTML = panierLocalStorage[produit].couleurProduit;

    
    let productPriceDescription =  document.createElement("p");
    productDivDescription.appendChild(productPriceDescription);
    productPriceDescription.innerHTML = tabRefProducts[panierLocalStorage[produit].idProduit] + " €";
   
    let productDivContentSetting = document.createElement("div");
    productDivCartContent.appendChild(productDivContentSetting);
    productDivContentSetting.className = "cart__item__content__settings";

    let productDivSettingsQuantity = document.createElement("div");
    productDivContentSetting.appendChild(productDivSettingsQuantity);
    productDivSettingsQuantity.className = "cart__item__content__settings__quantity"

    let productQteQuantity = document.createElement("p");
    productDivSettingsQuantity.appendChild(productQteQuantity);
    productQteQuantity.innerHTML = "Qté : ";

    let productQuantity = document.createElement("input");
    productDivSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = panierLocalStorage[produit].choixQuantite;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity")
    

    let productContentSettingsDelete = document.createElement("div");
    productDivContentSetting.appendChild(productContentSettingsDelete);
    productContentSettingsDelete.className = "cart__item__content__settings__delete";

    let productDelete = document.createElement("p");
    productContentSettingsDelete.appendChild(productDelete);
    productDelete.className = "deleteItem";
    productDelete.innerHTML = "Supprimer";

    
    
};
    }
}

//
function getTotals(){
    //
    let elementQuantity = document.getElementsByClassName('itemQuantity');
    let mylength = elementQuantity.length,
    quantityTotal = 0;

    for(let i = 0; i < mylength; i++) {
        quantityTotal += elementQuantity[i].valueAsNumber;
    }
    let totalQuantityItems = document.getElementById('totalQuantity');
    totalQuantityItems.textContent = quantityTotal;
    //
    let totalPrice = 0;
    for (let i = 0; i < mylength; i++){
        totalPrice += elementQuantity[i].valueAsNumber * parseInt(tabRefProducts[panierLocalStorage[i].idProduit]);
    }
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.textContent = totalPrice;
    console.log(totalPrice);
}

//////////
function modifyQuantity() {
    const modifQuantity = document.querySelectorAll('.itemQuantity');
  
    for (let k = 0; k < modifQuantity.length; k++) {
      modifQuantity[k].addEventListener('change', function (event) {
        event.preventDefault();
  
        panierLocalStorage[k].quantity = event.target.value;
  
        if (
          panierLocalStorage[k].quantity == 0 ||
          panierLocalStorage[k].quantity > 100
        ) {
          alert('Veuillez sélectionner une quantité comprise entre 1 et 100');
          location.reload();
        } else {
          localStorage.setItem('produit', JSON.stringify(panierLocalStorage));
          getTotals();
        }
      });
    }
  }

///////
function deleteItem() {
    let delItem = document.querySelectorAll('.deleteItem');
    for (let d = 0; d < delItem.length; d++) {
      delItem[d].addEventListener('click', (event) => {
        event.preventDefault();
       
        if (
          window.confirm(
            `Êtes- vous sur de vouloir supprimer ${panierLocalStorage[d].choixQuantite} ${panierLocalStorage[d].nomProduit} de couleur ${panierLocalStorage[d].couleurProduit} ?`
          )
        ) {
          let idDelItem = panierLocalStorage[d].idProduit;
          let colorDelItem = panierLocalStorage[d].couleurProduit;
  
          panierLocalStorage = panierLocalStorage.filter(
            (element) =>
              element.idProduit !== idDelItem || element.couleurProduit !== colorDelItem
          );
          localStorage.setItem('produit', JSON.stringify(panierLocalStorage));
          location.reload();
        }
      });
    }
}

function getForm() {
    
    let form = document.querySelector(".cart__order__form");

    
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

  
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });
    form.address.addEventListener('change', function() {
        validAddress(this);
    });
    form.city.addEventListener('change', function() {
        validCity(this);
    });
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

  
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

   
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

 
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

   
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

 
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }

getForm();

function postForm(){
    const btn_commander = document.getElementById("order");

  
    btn_commander.addEventListener("click", (event)=>{
    
       
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        
        let idProducts = [];
        for (let i = 0; i<panierLocalStorage.length;i++) {
            idProducts.push(panierLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const postOptions = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };
        console.log(postOptions);
        fetch("http://localhost:3000/api/products/order", postOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}

postForm();
