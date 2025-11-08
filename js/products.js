// products.js - Dynamically load products from localStorage
// Add this script to men.html, women.html, and kids.html

// products.js - Dynamically load products from localStorage with Wishlist support
// Add this script to men.html, women.html, and kids.html

document.addEventListener("DOMContentLoaded", function () {
  // Determine the current page by filename to avoid substring collisions
  const currentPage = window.location.pathname.split('/').pop();
  let category = "";

  if (currentPage === "men.html") {
    category = "men";
  } else if (currentPage === "women.html") {
    category = "women";
  } else if (currentPage === "kids.html") {
    category = "kids";
  } else if (currentPage === "index.html" || currentPage === "" || currentPage === undefined) {
    category = "home";
  }

  // Load products from localStorage
  const allProducts = JSON.parse(
    localStorage.getItem("modiloProducts") || "[]"
  );

  // Filter products by category
  let products = [];
  if (category === "home") {
    // Show first 4 products on home page
    products = allProducts.slice(0, 4);
  } else {
    // Filter by category for specific pages
    products = allProducts.filter((p) => p.category === category);
  }

  // Get the products container
  const productsContainer =
    document.getElementById("products") ||
    document.getElementById("home-products");

  if (!productsContainer) return;

  // Clear existing products
  productsContainer.innerHTML = "";

  // If no products, show empty state
  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <h2 style="font-family: 'DM Serif Text', serif; font-size: 2rem; color: #777; margin-bottom: 15px;">
          <span data-translate="noProductsAvailable">No products available yet</span>
        </h2>
        <p style="color: #999; font-size: 1.1rem; margin-bottom: 20px;">
          <span data-translate="productsWillAppear">Products will appear here once they are added by the admin.</span>
        </p>
        <a href="${window.location.pathname.includes('/html/') ? './admin.html' : 'html/admin.html'}" style="display: inline-block; padding: 12px 25px; background-color: #007BFF; color: #fff; border-radius: 8px; text-decoration: none;">
          <span data-translate="goToAdmin">Go to Admin Panel</span>
        </a>
      </div>
    `;
    return;
  }

  // Render products
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.dataset.id = product.id;
    
    // Check if product is in wishlist
    const inWishlist = typeof isInWishlist === 'function' ? isInWishlist(product.id) : false;
    
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onerror="this.src='../images/placeholder.jpg'">
      <h3>${product.name}</h3>
      <p class="price">DZ${product.price.toFixed(2)}</p>
      ${
        product.description
          ? `<p style="color: #777; font-size: 0.9rem; margin-bottom: 10px;">${product.description}</p>`
          : ""
      }
      <div class="product-actions">
        <button class="action-button" data-translate="addToCart">ADD TO CART</button>
        <button class="wishlist-button" data-id="${product.id}" onclick="toggleWishlist('${product.id}')" title="Add to Wishlist">
          <svg class="heart-icon ${inWishlist ? 'filled' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144z"/>
          </svg>
        </button>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });

  // Re-attach cart event listeners to new buttons
  const addToCartButtons = productsContainer.querySelectorAll(".action-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const productCard = this.closest(".product-card");
      const productId = productCard.dataset.id;
      const prod = allProducts.find((p) => p.id === productId);
      if (!prod) return;

      if (typeof addToCart === 'function') {
        addToCart({ id: prod.id, name: prod.name, price: prod.price });
      }
    });
  });
});