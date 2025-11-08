// Cart Management System with localStorage for persistence
let cart = [];

// Load cart from localStorage (persists after browser close)
function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem("modiloCart") || "[]");

  // Migration: older cart entries may lack `id` (pre-change). Try to resolve or migrate them
  const products = JSON.parse(localStorage.getItem("modiloProducts") || "[]");
  let productsChanged = false;
  let cartChanged = false;

  savedCart.forEach((item) => {
    if (!item.id) {
      // Try to match by name or image
      const match = products.find((p) => p.name === item.name || (p.image && item.image && p.image === item.image));
      if (match && match.id) {
        item.id = match.id;
        cartChanged = true;
      } else {
        // Create a legacy product record so cart can reference it by id
        const newId = 'legacy-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
        const newProduct = {
          id: newId,
          name: item.name || 'Legacy Product',
          price: item.price || 0,
          category: 'unknown',
          image: item.image || '../images/placeholder.jpg',
          description: item.description || ''
        };
        products.push(newProduct);
        productsChanged = true;
        item.id = newId;
        cartChanged = true;
      }
    }
  });

  if (productsChanged) {
    localStorage.setItem('modiloProducts', JSON.stringify(products));
  }
  if (cartChanged) {
    localStorage.setItem('modiloCart', JSON.stringify(savedCart));
  }

  cart = savedCart;
  updateCartUI();
}

// Save cart to localStorage (persists after browser close)
function saveCart() {
  localStorage.setItem("modiloCart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(product) {
  // product is expected to contain { id, name, price }
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  try {
    saveCart();
    updateCartUI();
    showAddedNotification(product.name);
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
    alert('Unable to add item to cart: storage full or blocked in this browser. Try using a smaller image or clear some storage.');
  }
}

// Remove item from cart by id
function removeFromCartById(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
}

// Update quantity by id
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCartById(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

// Update all cart UI elements
function updateCartUI() {
  updateCartCount();
  if (window.location.pathname.includes("cart.html")) {
    renderCartPage();
  }
}

// Update cart count badge
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBadges = document.querySelectorAll(".icon-cart .quantity");
  cartBadges.forEach((badge) => {
    badge.textContent = totalItems;
  });
}

// Render cart page
function renderCartPage() {
  const cartContent = document.getElementById("cart-content");
  const cartSummary = document.getElementById("cart-summary");

  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-cart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/>
          </svg>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <a href="../index.html" class="continue-shopping">Continue Shopping</a>
      </div>
    `;
    cartSummary.style.display = "none";
    return;
  }

  cartSummary.style.display = "block";

  // Load products to resolve images (cart stores ids to avoid duplicating base64 images)
  const products = JSON.parse(localStorage.getItem('modiloProducts') || '[]');

  const cartItemsHTML = cart
    .map((item) => {
      const productInfo = products.find((p) => p.id === item.id) || {};
      const imgSrc = productInfo.image || '';
      return `
        <div class="cart-item" data-id="${item.id}">
            <img src="${imgSrc}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>DZ${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button data-action="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button data-action="increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      `;
    })
    .join("");

  cartContent.innerHTML = `<div class="cart-items">${cartItemsHTML}</div>`;

  // Attach event listeners
  cartContent.querySelectorAll(".quantity-controls button").forEach((btn) => {
    const productId = btn.getAttribute("data-id");
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      updateQuantity(productId, action === "increase" ? 1 : -1);
    });
  });

  cartContent.querySelectorAll(".remove-btn").forEach((btn) => {
    const productId = btn.getAttribute("data-id");
    btn.addEventListener("click", () => removeFromCartById(productId));
  });

  // Update summary
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.0;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = `DZ${subtotal.toFixed(2)}`;
  document.getElementById("total").textContent = `DZ${total.toFixed(2)}`;
}

// Show notification when item is added
function showAddedNotification(productName) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
  notification.textContent = `${productName} added to cart!`;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", loadCart);

// Setup add to cart buttons (fallback hookup for pages that render product cards)
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".action-button");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const productCard = this.closest(".product-card");
      if (!productCard) return;
      const productId = productCard.getAttribute('data-id');
      const products = JSON.parse(localStorage.getItem('modiloProducts') || '[]');
      const prod = products.find(p => p.id === productId);
      if (!prod) return;
      addToCart({ id: prod.id, name: prod.name, price: prod.price });
    });
  });
});

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
