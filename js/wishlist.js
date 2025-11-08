// Wishlist Management System with localStorage for persistence
let wishlist = [];

// Load wishlist from localStorage
function loadWishlist() {
  const savedWishlist = JSON.parse(
    localStorage.getItem("modiloWishlist") || "[]"
  );

  // Migration: ensure all wishlist items have IDs
  const products = JSON.parse(localStorage.getItem("modiloProducts") || "[]");
  let productsChanged = false;
  let wishlistChanged = false;

  savedWishlist.forEach((item) => {
    if (!item.id) {
      const match = products.find(
        (p) =>
          p.name === item.name ||
          (p.image && item.image && p.image === item.image)
      );
      if (match && match.id) {
        item.id = match.id;
        wishlistChanged = true;
      } else {
        const newId =
          "legacy-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
        const newProduct = {
          id: newId,
          name: item.name || "Legacy Product",
          price: item.price || 0,
          category: "unknown",
          image: item.image || "../images/placeholder.jpg",
          description: item.description || "",
        };
        products.push(newProduct);
        productsChanged = true;
        item.id = newId;
        wishlistChanged = true;
      }
    }
  });

  if (productsChanged) {
    localStorage.setItem("modiloProducts", JSON.stringify(products));
  }
  if (wishlistChanged) {
    localStorage.setItem("modiloWishlist", JSON.stringify(savedWishlist));
  }

  wishlist = savedWishlist;
  updateWishlistUI();
}

// Save wishlist to localStorage
function saveWishlist() {
  localStorage.setItem("modiloWishlist", JSON.stringify(wishlist));
}

// Add item to wishlist
function addToWishlist(product) {
  const existingItem = wishlist.find((item) => item.id === product.id);

  if (existingItem) {
    showWishlistNotification(
      product.name + " is already in your wishlist!",
      "info"
    );
    return;
  }

  wishlist.push({
    id: product.id,
    name: product.name,
    price: product.price,
    addedAt: new Date().toISOString(),
  });

  try {
    saveWishlist();
    updateWishlistUI();
    showWishlistNotification(product.name + " added to wishlist!", "success");
  } catch (err) {
    console.error("Failed to save wishlist to localStorage", err);
    alert(
      "Unable to add item to wishlist: storage full or blocked in this browser."
    );
  }
}

// Remove item from wishlist by id
function removeFromWishlist(productId) {
  const item = wishlist.find((w) => w.id === productId);
  wishlist = wishlist.filter((item) => item.id !== productId);
  saveWishlist();
  updateWishlistUI();
  if (item) {
    showWishlistNotification(item.name + " removed from wishlist!", "info");
  }
}

// Check if item is in wishlist
function isInWishlist(productId) {
  return wishlist.some((item) => item.id === productId);
}

// Update all wishlist UI elements
function updateWishlistUI() {
  updateWishlistCount();
  if (window.location.pathname.includes("wishlist.html")) {
    renderWishlistPage();
  }
  // Update wishlist button states on product pages
  updateWishlistButtons();
}

// Update wishlist count badge
function updateWishlistCount() {
  const totalItems = wishlist.length;
  const wishlistBadges = document.querySelectorAll(".icon-wishlist .quantity");
  wishlistBadges.forEach((badge) => {
    badge.textContent = totalItems;
  });
}

// Update wishlist button states (filled/unfilled hearts)
function updateWishlistButtons() {
  document.querySelectorAll(".wishlist-button").forEach((btn) => {
    const productId = btn.getAttribute("data-id");
    const heartIcon = btn.querySelector(".heart-icon");
    if (isInWishlist(productId)) {
      heartIcon?.classList.add("filled");
    } else {
      heartIcon?.classList.remove("filled");
    }
  });
}

// Toggle wishlist (add or remove)
function toggleWishlist(productId) {
  const products = JSON.parse(localStorage.getItem("modiloProducts") || "[]");
  const prod = products.find((p) => p.id === productId);

  if (!prod) return;

  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
  } else {
    addToWishlist({ id: prod.id, name: prod.name, price: prod.price });
  }
}

// Render wishlist page
function renderWishlistPage() {
  const wishlistContent = document.getElementById("wishlist-content");

  if (!wishlistContent) return;

  if (wishlist.length === 0) {
    wishlistContent.innerHTML = `
      <div class="empty-wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144z"/>
          </svg>
          <h2 data-translate="yourWishlistEmpty">Your wishlist is empty</h2>
          <p data-translate="addProductsWishlist">Add some products you love!</p>
          <a href="../index.html" class="continue-shopping" data-translate="continueShopping">Continue Shopping</a>
      </div>
    `;
    return;
  }

  // Load products to resolve images and details
  const products = JSON.parse(localStorage.getItem("modiloProducts") || "[]");

  const wishlistItemsHTML = wishlist
    .map((item) => {
      const productInfo = products.find((p) => p.id === item.id) || {};
      const imgSrc = productInfo.image || "";
      return `
        <div class="wishlist-item" data-id="${item.id}">
            <img src="${imgSrc}" alt="${item.name}">
            <div class="wishlist-item-details">
                <h3>${item.name}</h3>
                <p class="price">DZ${item.price.toFixed(2)}</p>
                ${
                  productInfo.description
                    ? `<p class="description">${productInfo.description}</p>`
                    : ""
                }
            </div>
            <div class="wishlist-actions">
                <button class="add-to-cart-btn" onclick="addToCartFromWishlist('${
                  item.id
                }')">
                    <i class="fas fa-shopping-cart"></i> <span data-translate="addToCart">Add to Cart</span>
                </button>
                <button class="remove-from-wishlist-btn" onclick="removeFromWishlist('${
                  item.id
                }')">
                    <i class="fas fa-trash"></i> <span data-translate="remove">Remove</span>
                </button>
            </div>
        </div>
      `;
    })
    .join("");

  wishlistContent.innerHTML = `<div class="wishlist-items">${wishlistItemsHTML}</div>`;
}

// Add to cart from wishlist
function addToCartFromWishlist(productId) {
  const products = JSON.parse(localStorage.getItem("modiloProducts") || "[]");
  const prod = products.find((p) => p.id === productId);

  if (!prod) return;

  // Use the existing addToCart function from cart.js
  if (typeof addToCart === "function") {
    addToCart({ id: prod.id, name: prod.name, price: prod.price });
  }
}

// Show notification when item is added/removed from wishlist
function showWishlistNotification(message, type = "success") {
  const notification = document.createElement("div");
  const bgColor =
    type === "success" ? "#28a745" : type === "info" ? "#17a2b8" : "#ffc107";

  notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Initialize wishlist on page load
document.addEventListener("DOMContentLoaded", loadWishlist);

// Add CSS for wishlist button states
const wishlistStyle = document.createElement("style");
wishlistStyle.textContent = `
    .heart-icon {
        transition: fill 0.3s, transform 0.2s;
    }
    
    .heart-icon.filled {
        fill: #dc3545 !important;
        transform: scale(1.1);
    }
    
    .wishlist-button:hover .heart-icon {
        transform: scale(1.2);
    }
    
    .product-actions {
        display: flex;
        gap: 10px;
        margin-top: 15px;
    }
    
    .product-actions button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .wishlist-button {
        background-color: #fff;
        color: #dc3545;
        border: 2px solid #dc3545;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s;
    }
    
    .wishlist-button:hover {
        background-color: #dc3545;
        color: #fff;
    }
    
    .wishlist-button .heart-icon {
        width: 18px;
        height: 18px;
        fill: currentColor;
    }
    
    .wishlist-items {
        display: grid;
        gap: 20px;
    }
    
    .wishlist-item {
        display: grid;
        grid-template-columns: 150px 1fr auto;
        gap: 20px;
        align-items: center;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .wishlist-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .wishlist-item img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .wishlist-item-details h3 {
        margin-bottom: 10px;
        font-size: 1.3rem;
        color: #333;
    }
    
    .wishlist-item-details .price {
        color: #007BFF;
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 10px;
    }
    
    .wishlist-item-details .description {
        color: #777;
        font-size: 0.9rem;
    }
    
    .wishlist-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .add-to-cart-btn {
        background-color: #28a745;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .add-to-cart-btn:hover {
        background-color: #218838;
    }
    
    .remove-from-wishlist-btn {
        background-color: #dc3545;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .remove-from-wishlist-btn:hover {
        background-color: #c82333;
    }
    
    .empty-wishlist {
        text-align: center;
        padding: 60px 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .empty-wishlist svg {
        width: 100px;
        height: 100px;
        fill: #ccc;
        margin-bottom: 20px;
    }
    
    .empty-wishlist h2 {
        font-family: 'DM Serif Text', serif;
        font-size: 2rem;
        margin-bottom: 10px;
    }
    
    .empty-wishlist .continue-shopping {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007BFF;
        color: #fff;
        border-radius: 5px;
        text-decoration: none;
        transition: background-color 0.3s;
    }
    
    .empty-wishlist .continue-shopping:hover {
        background-color: #0056b3;
    }
    
    .icon-wishlist {
        cursor: pointer;
        position: relative;
    }
    
    .icon-wishlist .quantity {
        position: absolute;
        background-color: #dc3545;
        color: #fff;
        border-radius: 50%;
        right: -15px;
        top: 50%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 15px;
        width: 15px;
        text-align: center;
        font-size: 0.75rem;
        font-weight: bold;
    }
    
    @media (max-width: 768px) {
        .wishlist-item {
            grid-template-columns: 100px 1fr;
            gap: 15px;
        }
        
        .wishlist-actions {
            grid-column: 1 / -1;
            flex-direction: row;
        }
        
        .product-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(wishlistStyle);