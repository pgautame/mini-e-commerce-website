// Fetching data and displaying products
fetch("utils/data.json")
  .then((response) => response.json())
  .then((products) => {
    const productList = document.getElementById("product-list");
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="details">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart('${product.name}', ${
        product.price
      })">Add to Cart</button>
                </div>
            `;
      productList.appendChild(productCard);
    });
  });

// Adding products to the shopping cart
let cart = [];

function addToCart(name, price) {
  const existingProduct = cart.find((item) => item.name === name);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartVisibility();
  displayCart();
}

function updateCartVisibility() {
  const cartSection = document.getElementById("shopping-cart");
  const checkoutBtn = document.getElementById("checkout-btn");
  if (cart.length > 0) {
    cartSection.classList.remove("hidden");
    checkoutBtn.style.display = "block";
  } else {
    cartSection.classList.add("hidden");
    checkoutBtn.style.display = "none";
  }
}

// Displaying the cart items
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="item-quantity">
                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.name}', 1)">+</button>
            </div>
            <div class="item-remove" onclick="removeFromCart('${
              item.name
            }')">Remove</div>
        `;
    cartItems.appendChild(cartItem);
  });
  document.getElementById("cart-total").innerText = `Total: $${total.toFixed(
    2
  )}`;
}

// Updating the quantity of items in the cart
function updateQuantity(name, change) {
  const product = cart.find((item) => item.name === name);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      removeFromCart(name);
    }
    updateCartVisibility();
    displayCart();
  }
}

// Removing items from the cart
function removeFromCart(name) {
  const productIndex = cart.findIndex((item) => item.name === name);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    updateCartVisibility();
    displayCart();
  }
}

// Checkout Form
function displayCheckoutForm() {
  document.getElementById("shopping-cart").classList.add("hidden");
  document.getElementById("checkout-form-section").classList.remove("hidden");
}

function submitCheckout(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const paymentDetails = document.getElementById("payment-details").value;

  const confirmationMessage = `Thank you, ${name}! Your order has been placed and will be shipped to ${address}.`;
  document.getElementById("confirmation-message").innerText =
    confirmationMessage;

  document.getElementById("checkout-form-section").classList.add("hidden");
  document.getElementById("confirmation-section").classList.remove("hidden");
}

function buyMore() {
  cart = [];
  updateCartVisibility();
  displayCart();
  document.getElementById("confirmation-section").classList.add("hidden");
}

updateCartVisibility();
