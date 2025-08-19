export type SupportedLanguage = 
  | 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'ur' | 'kn' 
  | 'or' | 'ml' | 'pa' | 'as' | 'sa' | 'ks' | 'sd' | 'ne' | 'kok' 
  | 'mni' | 'brx' | 'sat' | 'mai' | 'doi';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  rtl?: boolean;
  flag: string;
}

export const supportedLanguages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳', rtl: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर', flag: '🇮🇳' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', flag: '🇮🇳', rtl: true },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇮🇳' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', flag: '🇮🇳' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', flag: '🇮🇳' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', flag: '🇮🇳' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', flag: '🇮🇳' }
];

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    add: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    sort: string;
    clear: string;
    submit: string;
    close: string;
    open: string;
    yes: string;
    no: string;
    ok: string;
    total: string;
    subtotal: string;
    quantity: string;
    price: string;
    free: string;
  };

  // Navigation
  nav: {
    home: string;
    marketplace: string;
    dashboard: string;
    orders: string;
    profile: string;
    settings: string;
    logout: string;
    login: string;
    signup: string;
    cart: string;
    notifications: string;
  };

  // Landing Page
  landing: {
    title: string;
    subtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    getStarted: string;
    learnMore: string;
    forFarmers: string;
    forConsumers: string;
    features: {
      directConnect: string;
      freshProduce: string;
      fairPrices: string;
      organicCertified: string;
    };
  };

  // Authentication
  auth: {
    welcome: string;
    loginTitle: string;
    signupTitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    farmName: string;
    location: string;
    phone: string;
    forgotPassword: string;
    rememberMe: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    farmer: string;
    consumer: string;
    farmerDescription: string;
    consumerDescription: string;
    demoLogin: string;
    subscriptionNote: string;
  };

  // Products
  products: {
    title: string;
    addProduct: string;
    editProduct: string;
    productName: string;
    category: string;
    description: string;
    price: string;
    unit: string;
    inventory: string;
    organic: string;
    certifications: string;
    harvestDate: string;
    expiryDate: string;
    nutritionInfo: string;
    addToCart: string;
    outOfStock: string;
    lowStock: string;
    inStock: string;
    featured: string;
    categories: {
      all: string;
      vegetables: string;
      fruits: string;
      herbs: string;
      grains: string;
      dairy: string;
      pulses: string;
      spices: string;
    };
  };

  // Shopping Cart
  cart: {
    title: string;
    empty: string;
    emptyMessage: string;
    continueShopping: string;
    checkout: string;
    items: string;
    delivery: string;
    deliveryFree: string;
    deliveryAddress: string;
    paymentMethod: string;
    specialInstructions: string;
    orderSummary: string;
    placeOrder: string;
    orderPlaced: string;
    orderSuccess: string;
    estimatedDelivery: string;
    cod: string;
    upi: string;
    card: string;
    netbanking: string;
  };

  // Orders
  orders: {
    title: string;
    orderHistory: string;
    orderManagement: string;
    orderNumber: string;
    orderDate: string;
    status: string;
    pending: string;
    confirmed: string;
    shipped: string;
    delivered: string;
    cancelled: string;
    viewDetails: string;
    trackOrder: string;
    confirm: string;
    cancel: string;
    markShipped: string;
    markDelivered: string;
    noOrders: string;
    noOrdersMessage: string;
  };

  // Farmer Dashboard
  farmer: {
    dashboard: string;
    totalProducts: string;
    revenue: string;
    avgRating: string;
    addYourFirst: string;
    farmProfile: string;
    farmSize: string;
    subscription: string;
    subscriptionActive: string;
    subscriptionExpired: string;
    subscriptionPending: string;
    monthlyFee: string;
    nextPayment: string;
    manageSubscription: string;
    proFeatures: string;
    subscriptionExpiring: string;
    renewNow: string;
  };

  // Subscription
  subscription: {
    title: string;
    subtitle: string;
    planName: string;
    mostPopular: string;
    subscribeNow: string;
    paymentDetails: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    gst: string;
    completePayment: string;
    processingPayment: string;
    whyChoose: string;
    successStories: string;
    features: {
      unlimitedProducts: string;
      directCommunication: string;
      inventoryManagement: string;
      analytics: string;
      prioritySupport: string;
      featuredProfile: string;
      mobileApp: string;
      marketingTools: string;
    };
    benefits: {
      directAccess: string;
      fairPricing: string;
      growBusiness: string;
    };
  };

  // Notifications
  notifications: {
    title: string;
    noNotifications: string;
    allCaughtUp: string;
    markAllRead: string;
    newOrder: string;
    orderUpdate: string;
    welcome: string;
    subscriptionUpdate: string;
  };

  // Marketplace
  marketplace: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    noProducts: string;
    adjustFilters: string;
    clearFilters: string;
    productsFound: string;
    featuredFarmers: string;
    meetFarmers: string;
    viewFarm: string;
    organicOnly: string;
    priceRange: string;
    sortBy: {
      name: string;
      priceLow: string;
      priceHigh: string;
      rating: string;
    };
  };

  // Profile
  profile: {
    title: string;
    personalInfo: string;
    contactInfo: string;
    preferences: string;
    updateProfile: string;
    changePassword: string;
    deleteAccount: string;
  };

  // Messages
  messages: {
    success: {
      productAdded: string;
      productUpdated: string;
      productDeleted: string;
      addedToCart: string;
      orderPlaced: string;
      loginSuccess: string;
      logoutSuccess: string;
      accountCreated: string;
    };
    error: {
      productNotFound: string;
      invalidCredentials: string;
      addToCartFailed: string;
      orderFailed: string;
      loadDataFailed: string;
      loginRequired: string;
      consumerOnly: string;
    };
  };

  // Currency and Numbers
  currency: {
    symbol: string;
    code: string;
  };
}

// Create a helper function to create a translation object with fallbacks
const createTranslations = (overrides: Partial<Translations> = {}): Translations => {
  const baseTranslations: Translations = {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      clear: 'Clear',
      submit: 'Submit',
      close: 'Close',
      open: 'Open',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      total: 'Total',
      subtotal: 'Subtotal',
      quantity: 'Quantity',
      price: 'Price',
      free: 'FREE'
    },
    nav: {
      home: 'Home',
      marketplace: 'Marketplace',
      dashboard: 'Dashboard',
      orders: 'Orders',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      login: 'Login',
      signup: 'Sign Up',
      cart: 'Cart',
      notifications: 'Notifications'
    },
    landing: {
      title: 'FarmConnect',
      subtitle: 'Direct from Farm to Table',
      heroTitle: 'Connect Directly with Local Organic Farmers',
      heroSubtitle: 'Fresh, organic produce delivered straight from the farm to your doorstep',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      forFarmers: 'For Farmers',
      forConsumers: 'For Consumers',
      features: {
        directConnect: 'Direct connection with farmers',
        freshProduce: 'Fresh organic produce',
        fairPrices: 'Fair prices for everyone',
        organicCertified: 'Certified organic products'
      }
    },
    auth: {
      welcome: 'Welcome to FarmConnect',
      loginTitle: 'Sign In',
      signupTitle: 'Create Account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      farmName: 'Farm Name',
      location: 'Location',
      phone: 'Phone Number',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember Me',
      alreadyHaveAccount: 'Already have an account? Sign in',
      dontHaveAccount: "Don't have an account? Sign up",
      farmer: 'Farmer',
      consumer: 'Consumer',
      farmerDescription: 'Sell your organic produce directly to consumers',
      consumerDescription: 'Browse and buy fresh organic produce from local farmers',
      demoLogin: 'Demo Login',
      subscriptionNote: 'Farmer subscription: ₹99/month for access to all features'
    },
    products: {
      title: 'Products',
      addProduct: 'Add Product',
      editProduct: 'Edit Product',
      productName: 'Product Name',
      category: 'Category',
      description: 'Description',
      price: 'Price',
      unit: 'Unit',
      inventory: 'Inventory',
      organic: 'Organic',
      certifications: 'Certifications',
      harvestDate: 'Harvest Date',
      expiryDate: 'Expiry Date',
      nutritionInfo: 'Nutrition Information',
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      lowStock: 'Low Stock',
      inStock: 'In Stock',
      featured: 'Featured',
      categories: {
        all: 'All Categories',
        vegetables: 'Vegetables',
        fruits: 'Fruits',
        herbs: 'Herbs',
        grains: 'Grains',
        dairy: 'Dairy',
        pulses: 'Pulses',
        spices: 'Spices'
      }
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      emptyMessage: 'Add some fresh organic products to get started!',
      continueShopping: 'Continue Shopping',
      checkout: 'Checkout',
      items: 'items',
      delivery: 'Delivery Fee',
      deliveryFree: 'FREE',
      deliveryAddress: 'Delivery Address',
      paymentMethod: 'Payment Method',
      specialInstructions: 'Special Instructions (Optional)',
      orderSummary: 'Order Summary',
      placeOrder: 'Place Order',
      orderPlaced: 'Order Placed Successfully!',
      orderSuccess: 'Your order has been placed and will be processed soon.',
      estimatedDelivery: 'Estimated Delivery: 2-3 business days',
      cod: 'Cash on Delivery',
      upi: 'UPI Payment',
      card: 'Credit/Debit Card',
      netbanking: 'Net Banking'
    },
    orders: {
      title: 'Orders',
      orderHistory: 'Order History',
      orderManagement: 'Order Management',
      orderNumber: 'Order',
      orderDate: 'Order Date',
      status: 'Status',
      pending: 'Pending',
      confirmed: 'Confirmed',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      viewDetails: 'View Details',
      trackOrder: 'Track Order',
      confirm: 'Confirm',
      cancel: 'Cancel',
      markShipped: 'Mark as Shipped',
      markDelivered: 'Mark as Delivered',
      noOrders: 'No orders yet',
      noOrdersMessage: 'Your orders will appear here once you make a purchase.'
    },
    farmer: {
      dashboard: 'Farmer Dashboard',
      totalProducts: 'Total Products',
      revenue: 'Est. Revenue',
      avgRating: 'Avg Rating',
      addYourFirst: 'Add Your First Product',
      farmProfile: 'Farm Profile',
      farmSize: 'Farm Size',
      subscription: 'Subscription',
      subscriptionActive: 'Active',
      subscriptionExpired: 'Expired',
      subscriptionPending: 'Pending',
      monthlyFee: 'per month',
      nextPayment: 'Next billing date',
      manageSubscription: 'Manage Subscription',
      proFeatures: 'Pro Features',
      subscriptionExpiring: 'Subscription expires in',
      renewNow: 'Renew now'
    },
    subscription: {
      title: 'Join FarmConnect as a Farmer',
      subtitle: 'Start selling your organic produce directly to consumers with our farmer subscription',
      planName: 'Farmer Pro Plan',
      mostPopular: 'Most Popular',
      subscribeNow: 'Subscribe Now',
      paymentDetails: 'Payment Details',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      cardholderName: 'Cardholder Name',
      gst: 'GST (18%)',
      completePayment: 'Complete Payment',
      processingPayment: 'Processing Payment...',
      whyChoose: 'Why Choose FarmConnect?',
      successStories: 'Success Stories',
      features: {
        unlimitedProducts: 'List unlimited organic products',
        directCommunication: 'Direct customer communication',
        inventoryManagement: 'Real-time inventory management',
        analytics: 'Analytics and sales reports',
        prioritySupport: 'Priority customer support',
        featuredProfile: 'Featured farm profile',
        mobileApp: 'Mobile app access',
        marketingTools: 'Marketing tools and promotion'
      },
      benefits: {
        directAccess: 'Connect directly with customers who value organic, locally-sourced produce.',
        fairPricing: 'Set your own prices and keep more of your profits without middlemen.',
        growBusiness: 'Use our analytics and marketing tools to expand your customer base.'
      }
    },
    notifications: {
      title: 'Notifications',
      noNotifications: 'No notifications',
      allCaughtUp: "You're all caught up!",
      markAllRead: 'Mark all read',
      newOrder: 'New Order Received',
      orderUpdate: 'Order Status Updated',
      welcome: 'Welcome to FarmConnect!',
      subscriptionUpdate: 'Subscription Updated'
    },
    marketplace: {
      title: 'Organic Marketplace',
      subtitle: 'Discover fresh organic produce from local farmers',
      searchPlaceholder: 'Search products, farmers, or categories...',
      noProducts: 'No products found',
      adjustFilters: 'Try adjusting your search criteria',
      clearFilters: 'Clear Filters',
      productsFound: 'products found',
      featuredFarmers: 'Featured Farmers',
      meetFarmers: 'Meet the farmers who grow your food',
      viewFarm: 'View Farm',
      organicOnly: 'Organic Only',
      priceRange: 'Price Range',
      sortBy: {
        name: 'Name',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        rating: 'Highest Rated'
      }
    },
    profile: {
      title: 'Profile',
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      preferences: 'Preferences',
      updateProfile: 'Update Profile',
      changePassword: 'Change Password',
      deleteAccount: 'Delete Account'
    },
    messages: {
      success: {
        productAdded: 'Product added successfully!',
        productUpdated: 'Product updated successfully!',
        productDeleted: 'Product deleted successfully!',
        addedToCart: 'Item added to cart!',
        orderPlaced: 'Order placed successfully!',
        loginSuccess: 'Welcome back!',
        logoutSuccess: 'Logged out successfully',
        accountCreated: 'Account created successfully!'
      },
      error: {
        productNotFound: 'Product not found',
        invalidCredentials: 'Invalid email or password',
        addToCartFailed: 'Failed to add item to cart',
        orderFailed: 'Failed to place order',
        loadDataFailed: 'Failed to load application data',
        loginRequired: 'Please login to continue',
        consumerOnly: 'Please login as a consumer to add items to cart'
      }
    },
    currency: {
      symbol: '₹',
      code: 'INR'
    }
  };

  // Deep merge overrides with base translations
  return {
    ...baseTranslations,
    ...overrides,
    common: { ...baseTranslations.common, ...overrides.common },
    nav: { ...baseTranslations.nav, ...overrides.nav },
    landing: { ...baseTranslations.landing, ...overrides.landing },
    auth: { ...baseTranslations.auth, ...overrides.auth },
    products: { ...baseTranslations.products, ...overrides.products },
    cart: { ...baseTranslations.cart, ...overrides.cart },
    orders: { ...baseTranslations.orders, ...overrides.orders },
    farmer: { ...baseTranslations.farmer, ...overrides.farmer },
    subscription: { ...baseTranslations.subscription, ...overrides.subscription },
    notifications: { ...baseTranslations.notifications, ...overrides.notifications },
    marketplace: { ...baseTranslations.marketplace, ...overrides.marketplace },
    profile: { ...baseTranslations.profile, ...overrides.profile },
    messages: { ...baseTranslations.messages, ...overrides.messages },
    currency: { ...baseTranslations.currency, ...overrides.currency }
  };
};

const translations: Record<SupportedLanguage, Translations> = {
  en: createTranslations(),
  
  hi: createTranslations({
    auth: {
      welcome: 'फार्म कनेक्ट में आपका स्वागत है',
      loginTitle: 'साइन इन',
      signupTitle: 'खाता बनाएं',
      email: 'ईमेल',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      name: 'पूरा नाम',
      farmName: 'खेत का नाम',
      location: 'स्थान',
      phone: 'फोन नंबर',
      forgotPassword: 'पासवर्ड भूल गए?',
      rememberMe: 'मुझे याद रखें',
      alreadyHaveAccount: 'पहले से खाता है? साइन इन करें',
      dontHaveAccount: 'खाता नहीं है? साइन अप करें',
      farmer: 'किसान',
      consumer: 'उपभोक्ता',
      farmerDescription: 'अपना जैविक उत्पाद सीधे उपभोक्ताओं को बेचें',
      consumerDescription: 'स्थानीय किसानों से ताज़ा जैविक उत्पाद खरीदें',
      demoLogin: 'डेमो लॉगिन',
      subscriptionNote: 'किसान सदस्यता: सभी सुविधाओं के लिए ₹99/माह'
    },
    landing: {
      title: 'फार्म कनेक्ट',
      subtitle: 'सीधे खेत से आपकी मेज़ तक',
      heroTitle: 'स्थानीय जैविक किसानों से सीधे जुड़ें',
      heroSubtitle: 'ताज़ा, जैविक उत्पाद सीधे खेत से आपके दरवाज़े तक',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें',
      forFarmers: 'किसानों के लिए',
      forConsumers: 'उपभोक्ताओं के लिए',
      features: {
        directConnect: 'किसानों से सीधा संपर्क',
        freshProduce: 'ताज़ा जैविक उत्पाद',
        fairPrices: 'सभी के लिए उचित कीमत',
        organicCertified: 'प्रमाणित जैविक उत्पाद'
      }
    }
  }),

  bn: createTranslations({
    auth: {
      welcome: 'ফার্ম কানেক্টে আপনাকে স্বাগতম',
      loginTitle: 'সাইন ইন',
      signupTitle: 'অ্যাকাউন্ট তৈরি করুন',
      email: 'ইমেইল',
      password: 'পাসওয়ার্ড',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      name: 'পূর্ণ নাম',
      farmName: 'খামারের নাম',
      location: 'অবস্থান',
      phone: 'ফোন নম্বর',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      rememberMe: 'আমাকে মনে রাখুন',
      alreadyHaveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে? সাইন ইন করুন',
      dontHaveAccount: 'অ্যাকাউন্ট নেই? সাইন আপ করুন',
      farmer: 'কৃষক',
      consumer: 'ভোক্তা',
      farmerDescription: 'আপনার জৈব পণ্য সরাসরি ভোক্তাদের কাছে বিক্রি করুন',
      consumerDescription: 'স্থানীয় কৃষকদের থেকে তাজা জৈব পণ্য কিনুন',
      demoLogin: 'ডেমো লগইন',
      subscriptionNote: 'কৃষক সদস্যতা: সমস্ত বৈশিষ্ট্যের জন্য ₹৯৯/মাস'
    }
  }),

  // Create basic translations for other languages using English as fallback
  te: createTranslations(),
  mr: createTranslations(),
  ta: createTranslations(),
  gu: createTranslations(),
  ur: createTranslations(),
  kn: createTranslations(),
  or: createTranslations(),
  ml: createTranslations(),
  pa: createTranslations(),
  as: createTranslations(),
  sa: createTranslations(),
  ks: createTranslations(),
  sd: createTranslations(),
  ne: createTranslations(),
  kok: createTranslations(),
  mni: createTranslations(),
  brx: createTranslations(),
  sat: createTranslations(),
  mai: createTranslations(),
  doi: createTranslations()
};

// Language service class
class LanguageService {
  private storageKey = 'farmconnect_language';
  private currentLanguage: SupportedLanguage = 'en';
  private listeners: Array<(language: SupportedLanguage) => void> = [];

  constructor() {
    this.loadLanguage();
  }

  private loadLanguage() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved && this.isValidLanguage(saved)) {
        this.currentLanguage = saved as SupportedLanguage;
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.isValidLanguage(browserLang)) {
          this.currentLanguage = browserLang as SupportedLanguage;
        }
      }
    } catch (error) {
      console.warn('Failed to load language preference:', error);
    }
  }

  private isValidLanguage(lang: string): boolean {
    return supportedLanguages.some(l => l.code === lang);
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  setLanguage(language: SupportedLanguage) {
    if (!this.isValidLanguage(language)) {
      console.warn(`Unsupported language: ${language}`);
      return;
    }

    this.currentLanguage = language;
    try {
      localStorage.setItem(this.storageKey, language);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(language));
  }

  getTranslations(): Translations {
    const translations_for_lang = translations[this.currentLanguage];
    if (!translations_for_lang) {
      console.warn(`Translations not found for language: ${this.currentLanguage}, falling back to English`);
      return translations.en;
    }
    return translations_for_lang;
  }

  subscribe(callback: (language: SupportedLanguage) => void) {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Utility methods for formatting
  formatCurrency(amount: number): string {
    const { symbol } = this.getTranslations().currency;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      currencyDisplay: 'symbol'
    }).format(amount).replace('₹', symbol);
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('en-IN').format(num);
  }

  isRTL(): boolean {
    const langInfo = supportedLanguages.find(l => l.code === this.currentLanguage);
    return langInfo?.rtl || false;
  }

  getLanguageInfo(): LanguageInfo {
    return supportedLanguages.find(l => l.code === this.currentLanguage) || supportedLanguages[0];
  }
}

export const languageService = new LanguageService();