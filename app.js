let cartCards = document.querySelector("#product-cart");
console.log("🚀 ~ file: app.js:2 ~ cartCards:", cartCards);
let productImage = document.querySelector("#image");
let productName = document.querySelector("#product-name");
let productDescription = document.querySelector("#product-display");
let cartPrice = document.querySelector("#price");
let cartQuantity = document.querySelector("#quantity");
let totalPriceCalc = document.querySelector(".total-price");


let cartProductTable = document.querySelector("#cart-items");

let allProduct = "";
let createItem = function (item) {
  let newRow = document.createElement("tr");
  let newProduct = document.createElement("td");
  let image = document.createElement("img");
  let name = document.createElement("h4");
  let description = document.createElement("p");
  let price = document.createElement("td");
  let quantity = document.createElement("td");
  let quantityInput = document.createElement("input");

  name.innerText = item;
  quantityInput.type = "number";

  newProduct.appendChild(image);
  newProduct.appendChild(name);
  newProduct.appendChild(description);

  quantity.appendChild(quantityInput);

  newRow.appendChild(newProduct);
  newRow.appendChild(price);
  newRow.appendChild(quantity);

  return newRow;
};
let totalPrice = 0;

const cartProductRemove = (e) => {
  let upperNode = e.parentNode;
  console.log(upperNode.parentNode.querySelector(".cart-p-price").textContent);
  let removedPrice = Number(
    upperNode.parentNode.querySelector(".cart-p-price").textContent
  );

  totalPrice -= removedPrice;

  totalPriceCalc.innerText = "Total Price: " + totalPrice;
  upperNode.parentNode.remove();
};

let AddToCart = (event) => {
  // event.preventDefault()
  let pId = event.closest(".card-body").dataset.productid;
  let pImage = event.closest(".card").querySelector("#img").dataset.productimg;
  let pTitle = event
    .closest(".card-body")
    .querySelector(".card-title").textContent;

  let pPrice = Number(
    event.closest(".card-body").querySelector("#price").dataset.price
  );
  let pQuantities = Number(
    event.closest(".card-body").querySelector("#quantity").dataset.quantities
  );

  totalPrice += pPrice;

  let productCart = `
    <tr>
      <td data-th="Product">
        <div class="row">
          <div class="col-md-3 text-left">
            <img
              src="/images/${pImage}"
              alt=""
              class="img-fluid d-none d-md-block rounded mb-2 shadow"
            />
          </div>
          <div class="col-md-9 text-left mt-sm-2">
            <h4 id="product-name">${pTitle}</h4>
            <p id="product-description" class="font-weight-light">
              Description
            </p>
          </div>
        </div>
      </td>
      <td id="price" data-th="Price"><span class="cart-p-price">${pPrice}</span></td>
      <td id="quantity" data-th="Quantity">
        <input
          type="number"
          class="form-control form-control-lg text-center"
          value="1"
        />
      </td>
      <td class="actions" data-th="">
        
          <button onclick="cartProductRemove(this)" class="btn btn-danger border-secondary btn-md mb-2">
            Remove
          </button>
        
      </td>
    </tr>`;

    cartProductTable.innerHTML += productCart;

  let productToCart = `<div>
    <img src="/images/${pImage}">
    <h2>${pTitle}</h2>
    <p>Price: <span class="cart-p-price">${pPrice}</span></p>
    <p>Quantities : ${pQuantities}</p>
    <button onclick="cartProductRemove(this)">Remove</button>
    </div>`;

  //cartCards.innerHTML += productToCart;

  //let cartItem = createItem(cartProductName);
  // cartCards.appendChild(cartItem);
  //newTask.value = "";
  // bind the new list item to the incomplete list
  //bindInCompleteItems(listItem, completeTask);
  totalPriceCalc.innerText = "Total Price: " + totalPrice;
};

let allProducts = [];

const allProductHandler = () => {
  allProducts.map((i) => {
    // allProducts = {...allProducts, i}
    console.log(i);
  });
};

let productCards = document.querySelector("#product-display");
//for (i = 0; i <= 5; i++) {

const addToCart = (e, pId) => {
  // e.preventDefault()

  const container = e.target;
  console.log(e.parentNode);
  console.log(pId);
};

const displayProduct = (item) => {
  productCards.innerHTML += `
  <div class="col-4">
        <div class="card">
      <img id="img" data-productimg="${item.img_source}"
        src="/images/${item.img_source}" 
        class="card-img-top"
        alt="..."
      />
      <div class="card-body" data-productid=${item.id}>
        <h5 id="name" data-name="${item.product_name}" class="card-title">${item.product_name}</h5>
        <p id="description" class="card-text">
        ${item.product_description}
        </p>
        <p id="price" class="card-text" data-price="${item.prices}">Price : ${item.prices}
        </p>
        <p id="quantity" class="card-text" data-quantities="${item.quantities}">Quantity : ${item.quantities}
        </p>
        <button class="btn btn-primary" onclick="AddToCart(this, ${item.id})">Add to Cart</button>
       </div>
      </div>
     </div>`;
};
const getAllProduct = async () => {
  const res = await fetch("/data/products.json");
  const data = await res.json();

  data.map((i) => {
    displayProduct(i);
  });

  //allProducts.push(...data)
};

getAllProduct();

if (allProducts) {
  console.log(
    "🚀 ~ file: app.js:114 ~ allProducts:",
    Array.isArray(allProducts)
  );
  // const array = Object.entries(allProducts)
  allProducts.forEach((i) => {
    console.log("🚀 ~ file: app.js:116 ~ allProducts.map ~ i:", i);
    productCards.innerHTML += i.product_name;
  });
}
