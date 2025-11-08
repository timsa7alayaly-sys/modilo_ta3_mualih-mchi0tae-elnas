// Language Translator for Modilo Website
// Add this script to all HTML pages

// Translation dictionary
const translations = {
  en: {
    // Header
    home: "Home",
    men: "Men",
    women: "Women",
    kids: "Kids",

    // Hero Section
    heroTitle: "Modilo Special Offers",
    heroSubtitle: "Discover our exclusive deals and discounts!",
    shopNow: "Shop Now",

    // Search
    searchPlaceholder: "Search...",
    searchButton: "Search",

    // Categories
    categories: "Categories",

    // Products
    featuredProducts: "Featured Products",
    addToCart: "ADD TO CART",
    price: "DZ",

    // Cart
    shoppingCart: "Shopping Cart",
    yourCartEmpty: "Your cart is empty",
    addProducts: "Add some products to get started!",
    continueShopping: "Continue Shopping",
    orderSummary: "Order Summary",
    subtotal: "Subtotal:",
    shipping: "Shipping:",
    total: "Total:",
    proceedCheckout: "Proceed to Checkout",
    remove: "Remove",

    // Admin
    productManagement: "Product Management",
    addNewProduct: "Add New Product",
    addProduct: "Add Product",
    manageProducts: "Manage Products",
    productName: "Product Name",
    category: "Category",
    description: "Description",
    imageFile: "Image File (or paste URL below)",
    imageUrl: "Or Image URL (optional)",
    selectCategory: "Select a category",
    noProductsYet: "No products yet",
    startAdding: "Start by adding your first product!",
    deleteProduct: "Delete Product",

    // Login
    welcomeBack: "Welcome Back",
    loginCreate: "Login or create an account to continue",
    login: "Login",
    register: "Register",
    email: "Email Address",
    password: "Password",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot password?",
    createAccount: "Create Account",

    // Footer
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactUs: "Contact Us",
    backToTop: "Back to Top",

    // Breadcrumbs
    breadcrumbHome: "Home",
  },

  fr: {
    // Header
    home: "Accueil",
    men: "Hommes",
    women: "Femmes",
    kids: "Enfants",

    // Hero Section
    heroTitle: "Offres Spéciales Modilo",
    heroSubtitle: "Découvrez nos offres et réductions exclusives !",
    shopNow: "Acheter Maintenant",

    // Search
    searchPlaceholder: "Rechercher...",
    searchButton: "Rechercher",

    // Categories
    categories: "Catégories",

    // Products
    featuredProducts: "Produits en Vedette",
    addToCart: "AJOUTER AU PANIER",
    price: "DA",

    // Cart
    shoppingCart: "Panier d'Achat",
    yourCartEmpty: "Votre panier est vide",
    addProducts: "Ajoutez des produits pour commencer !",
    continueShopping: "Continuer les Achats",
    orderSummary: "Résumé de la Commande",
    subtotal: "Sous-total:",
    shipping: "Livraison:",
    total: "Total:",
    proceedCheckout: "Passer à la Caisse",
    remove: "Retirer",

    // Admin
    productManagement: "Gestion des Produits",
    addNewProduct: "Ajouter un Nouveau Produit",
    addProduct: "Ajouter un Produit",
    manageProducts: "Gérer les Produits",
    productName: "Nom du Produit",
    category: "Catégorie",
    description: "Description",
    imageFile: "Fichier Image (ou collez l'URL ci-dessous)",
    imageUrl: "Ou URL de l'Image (facultatif)",
    selectCategory: "Sélectionnez une catégorie",
    noProductsYet: "Pas encore de produits",
    startAdding: "Commencez par ajouter votre premier produit !",
    deleteProduct: "Supprimer le Produit",

    // Login
    welcomeBack: "Bon Retour",
    loginCreate: "Connectez-vous ou créez un compte pour continuer",
    login: "Connexion",
    register: "S'inscrire",
    email: "Adresse E-mail",
    password: "Mot de Passe",
    fullName: "Nom Complet",
    confirmPassword: "Confirmer le Mot de Passe",
    forgotPassword: "Mot de passe oublié ?",
    createAccount: "Créer un Compte",

    // Footer
    allRightsReserved: "Tous droits réservés.",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation",
    contactUs: "Contactez-Nous",
    backToTop: "Retour en Haut",

    // Breadcrumbs
    breadcrumbHome: "Accueil",
  },

  ar: {
    // Header
    home: "الرئيسية",
    men: "رجال",
    women: "نساء",
    kids: "أطفال",

    // Hero Section
    heroTitle: "عروض موديلو الخاصة",
    heroSubtitle: "اكتشف عروضنا وخصوماتنا الحصرية!",
    shopNow: "تسوق الآن",

    // Search
    searchPlaceholder: "بحث...",
    searchButton: "بحث",

    // Categories
    categories: "الفئات",

    // Products
    featuredProducts: "المنتجات المميزة",
    addToCart: "أضف إلى السلة",
    price: "دج",

    // Cart
    shoppingCart: "سلة التسوق",
    yourCartEmpty: "سلتك فارغة",
    addProducts: "أضف بعض المنتجات للبدء!",
    continueShopping: "متابعة التسوق",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي:",
    shipping: "الشحن:",
    total: "المجموع:",
    proceedCheckout: "المتابعة للدفع",
    remove: "إزالة",

    // Admin
    productManagement: "إدارة المنتجات",
    addNewProduct: "إضافة منتج جديد",
    addProduct: "إضافة منتج",
    manageProducts: "إدارة المنتجات",
    productName: "اسم المنتج",
    category: "الفئة",
    description: "الوصف",
    imageFile: "ملف الصورة (أو الصق الرابط أدناه)",
    imageUrl: "أو رابط الصورة (اختياري)",
    selectCategory: "اختر فئة",
    noProductsYet: "لا توجد منتجات بعد",
    startAdding: "ابدأ بإضافة منتجك الأول!",
    deleteProduct: "حذف المنتج",

    // Login
    welcomeBack: "مرحباً بعودتك",
    loginCreate: "تسجيل الدخول أو إنشاء حساب للمتابعة",
    login: "تسجيل الدخول",
    register: "التسجيل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    fullName: "الاسم الكامل",
    confirmPassword: "تأكيد كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    createAccount: "إنشاء حساب",

    // Footer
    allRightsReserved: "جميع الحقوق محفوظة.",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    contactUs: "اتصل بنا",
    backToTop: "العودة للأعلى",

    // Breadcrumbs
    breadcrumbHome: "الرئيسية",
  },
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
  return localStorage.getItem("modiloLanguage") || "en";
}

// Set language and save to localStorage
function setLanguage(lang) {
  localStorage.setItem("modiloLanguage", lang);
  applyTranslations(lang);

  // Update direction for Arabic
  if (lang === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", lang);
  }
}

// Apply translations to the page
function applyTranslations(lang) {
  const t = translations[lang];

  // Translate elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (t[key]) {
      if (element.tagName === "INPUT" && element.placeholder !== undefined) {
        element.placeholder = t[key];
      } else {
        element.textContent = t[key];
      }
    }
  });

  // Update language selector display
  updateLanguageDisplay(lang);
}

// Update language selector to show current language
function updateLanguageDisplay(lang) {
  const languageNames = {
    en: "English",
    fr: "Français",
    ar: "العربية",
  };

  const currentLangElement = document.getElementById("current-language");
  if (currentLangElement) {
    currentLangElement.textContent = languageNames[lang];
  }
}

// Toggle language dropdown
function toggleLanguageDropdown() {
  const dropdown = document.getElementById("language-dropdown");
  dropdown.classList.toggle("show");
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const languageSelector = document.querySelector(".language-selector");
  const dropdown = document.getElementById("language-dropdown");

  if (languageSelector && !languageSelector.contains(event.target)) {
    dropdown?.classList.remove("show");
  }
});

// Initialize language on page load
document.addEventListener("DOMContentLoaded", function () {
  const currentLang = getCurrentLanguage();
  setLanguage(currentLang);
});
