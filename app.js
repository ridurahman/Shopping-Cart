let cartCards = document.querySelector("#product-cart");
console.log("🚀 ~ file: app.js:2 ~ cartCards:", cartCards)
let productImage = document.querySelector("#image");
let productName = document.querySelector("#product-name");
let productDescription = document.querySelector("#product-display");
let cartPrice = document.querySelector("#price");
let cartQuantity = document.querySelector("#quantity");
let totalPriceCalc = document.querySelector(".total-price")

//let cartCards = document.querySelector("#product-cart");
let cartProductImage = document.querySelector("#img");
let cartProductName = document.querySelector("#name");
let cartProductDescription = document.querySelector("#description");
let cartProductPrice = document.querySelector("#P");
let cartProductQuantity = document.querySelector("#Q");

let allProduct = ""
let createItem = function(item) {
    let newRow = document.createElement('tr');
    let newProduct = document.createElement('td');
    let image = document.createElement('img');
    let name = document.createElement('h4');
    let description = document.createElement('p');
    let price = document.createElement('td');
    let quantity = document.createElement('td');
    let quantityInput = document.createElement('input');

    name.innerText = item;
    quantityInput.type = 'number';

    newProduct.appendChild(image);
    newProduct.appendChild(name);
    newProduct.appendChild(description);

    quantity.appendChild(quantityInput);

    newRow.appendChild(newProduct);
    newRow.appendChild(price);
    newRow.appendChild(quantity);


    return newRow;
}
let totalPrice = 0

const cartProductRemove = (e) => {
  console.log(e.parentNode.querySelector(".cart-p-price").textContent)
  
  let removedPrice = Number(e.parentNode.querySelector(".cart-p-price").textContent);
  console.log(totalPrice);
  totalPrice -= removedPrice;
  console.log(totalPrice);

  totalPriceCalc.innerText = totalPrice
  e.parentNode.remove()


}



let AddToCart = (event) => {
    // event.preventDefault()

      
    console.log("Product name : ", event.closest(".card-body").querySelector(".card-title").textContent)
    console.log("Price : ", event.closest(".card-body").querySelector("#Q").dataset.price)
    console.log("Quantities : ", event.closest(".card-body").querySelector("#P").dataset.quantities)

    let pId = event.closest(".card-body").dataset.productid;
    let pTitle = event.closest(".card-body").querySelector(".card-title").textContent;
    let pPrice = Number(event.closest(".card-body").querySelector("#Q").dataset.price);
    let pQuantities = Number(event.closest(".card-body").querySelector("#P").dataset.quantities);

    totalPrice += pPrice

    

    let productToCart = `<div>
    <h2>${pTitle}</h2>
    <p>Price: <span class="cart-p-price">${pPrice}</span></p>
    <p>Quantities : ${pQuantities}</p>
    <button onclick="cartProductRemove(this)">Remove</button>
    </div>`

  
      
    cartCards.innerHTML += productToCart;
    
    let cartItem = createItem(cartProductName);
    // cartCards.appendChild(cartItem);
    //newTask.value = "";
    // bind the new list item to the incomplete list
    //bindInCompleteItems(listItem, completeTask);
    totalPriceCalc.innerText = totalPrice;
}






let allProducts = []


const allProductHandler = () => {
  allProducts.map((i) => {
    // allProducts = {...allProducts, i}
    console.log(i)
  })
}



let productCards = document.querySelector("#product-display");
//for (i = 0; i <= 5; i++) {

const addToCart = (e, pId) => {
  // e.preventDefault()

  const container = e.target;
  console.log(e.parentNode)
  console.log(pId)
}

const displayProduct = (item) => {
  productCards.innerHTML += `
  <div class="col-4">
        <div class="card">
      <img id="img" value="/images/${item.img_source}"
        src="/images/${item.img_source}" 
        class="card-img-top"
        alt="..."
      />
      <div class="card-body" value="${item.id}" data-productid=${item.id}>
        <h5 id="name" data-name="${item.product_name}" class="card-title">${item.product_name}</h5>
        <p id="description" class="card-text">
        ${item.product_description}
        </p>
        <p id="Q" class="card-text" data-price="${item.prices}">Price : ${item.prices}
        </p>
        <p id="P" class="card-text" data-quantities="${item.quantities}">Quantity : ${item.quantities}
        </p>
        <button class="btn btn-primary" onclick="AddToCart(this, ${item.id})">Add to Cart</button>
       </div>
      </div>
     </div>`
}
const getAllProduct = async () => {
  const res = await fetch("/data/products.json")
  const data = await res.json()
  
  data.map((i) => {
    displayProduct(i)
  })
 
  //allProducts.push(...data)
  
}

getAllProduct()

if(allProducts){
  console.log("🚀 ~ file: app.js:114 ~ allProducts:", Array.isArray(allProducts))
  // const array = Object.entries(allProducts)
  allProducts.forEach((i) => {
    console.log("🚀 ~ file: app.js:116 ~ allProducts.map ~ i:", i);
    productCards.innerHTML += i.product_name;
  });

 
}


