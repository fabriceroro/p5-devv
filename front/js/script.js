
async function getArtcicle () {
    fetch('http://localhost:3000/api/products')
.then(res => res.json()) 
.then(function (value) {
    value.forEach(data => {
let productItems = document.getElementById('items');

let productLink = document.createElement('a');
document.querySelector('.items').appendChild(productLink);
productLink.href = "product.html?id=" + data._id;

let productArticle = document.createElement('article');
productLink.appendChild(productArticle);

let productImg = document.createElement('img');
productArticle.appendChild(productImg);
productImg.src = data.imageUrl;
productImg.alt = data.altTxt;

let productName = document.createElement('h3');
productArticle.appendChild(productName);
productName.classList.add("productName");
productName.innerHTML = data.name;


let productDescruption = document.createElement('p');
productArticle.appendChild(productDescruption);
productDescruption.innerHTML = data.description;





console.log(data)
    })
});

}
   
getArtcicle();
    
