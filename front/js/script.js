//récupération des article de l'API a l'aide de la méthode fetch//
function getArticle () {
    fetch('http://localhost:3000/api/products')
.then(res => res.json()) 
//Récupération des données de l'API dans le DOM
.then(function (value) {
    value.forEach(data => {
let productItems = document.getElementById('items');
// Insertion de l'élément "a"
let productLink = document.createElement('a');
document.querySelector('.items').appendChild(productLink);
productLink.href = "product.html?id=" + data._id;
// Insertion de l'élément "article"
let productArticle = document.createElement('article');
productLink.appendChild(productArticle);
// Insertion de l'image
let productImg = document.createElement('img');
productArticle.appendChild(productImg);
productImg.src = data.imageUrl;
productImg.alt = data.altTxt;
// Insertion de l'élément "h3"
let productName = document.createElement('h3');
productArticle.appendChild(productName);
productName.classList.add("productName");
productName.innerHTML = data.name;
//Insertion de l'élément "p"
let productDescruption = document.createElement('p');
productArticle.appendChild(productDescruption);
productDescruption.innerHTML = data.description;
console.log(data)
    })

})
.catch((error) => console.log(error));

}

getArticle();

