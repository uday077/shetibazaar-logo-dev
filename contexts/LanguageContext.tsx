import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { languageService, SupportedLanguage, Translations, LanguageInfo } from '../services/languageService';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  translations: Translations;
  languageInfo: LanguageInfo;
  setLanguage: (language: SupportedLanguage) => void;
  t: Translations;
  formatCurrency: (amount: number) => string;
  formatNumber: (num: number) => string;
  isRTL: boolean;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize language service
    try {
      const initialLanguage = languageService.getCurrentLanguage();
      const initialTranslations = languageService.getTranslations();
      
      setCurrentLanguage(initialLanguage);
      setTranslations(initialTranslations);
      
      // Set up document attributes
      const isRTL = languageService.isRTL();
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = initialLanguage;
      
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize language service:', error);
      // Fallback to English
      setCurrentLanguage('en');
      setTranslations(languageService.getTranslations());
      setIsLoading(false);
    }

    // Subscribe to language changes
    const unsubscribe = languageService.subscribe((newLanguage) => {
      try {
        setCurrentLanguage(newLanguage);
        const newTranslations = languageService.getTranslations();
        setTranslations(newTranslations);
        
        // Update document direction for RTL languages
        const isRTL = languageService.isRTL();
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = newLanguage;
      } catch (error) {
        console.error('Failed to update language:', error);
      }
    });

    return unsubscribe;
  }, []);

  const setLanguage = (language: SupportedLanguage) => {
    try {
      languageService.setLanguage(language);
    } catch (error) {
      console.error('Failed to set language:', error);
    }
  };

  // Provide fallback translations if still loading
  const safeTranslations = translations || {
    common: { loading: 'Loading...', error: 'Error', success: 'Success', cancel: 'Cancel', save: 'Save', delete: 'Delete', edit: 'Edit', add: 'Add', back: 'Back', next: 'Next', previous: 'Previous', search: 'Search', filter: 'Filter', sort: 'Sort', clear: 'Clear', submit: 'Submit', close: 'Close', open: 'Open', yes: 'Yes', no: 'No', ok: 'OK', total: 'Total', subtotal: 'Subtotal', quantity: 'Quantity', price: 'Price', free: 'FREE' },
    nav: { home: 'Home', marketplace: 'Marketplace', dashboard: 'Dashboard', orders: 'Orders', profile: 'Profile', settings: 'Settings', logout: 'Logout', login: 'Login', signup: 'Sign Up', cart: 'Cart', notifications: 'Notifications' },
    landing: { title: 'FarmConnect', subtitle: 'Direct from Farm to Table', heroTitle: 'Connect Directly with Local Organic Farmers', heroSubtitle: 'Fresh, organic produce delivered straight from the farm to your doorstep', getStarted: 'Get Started', learnMore: 'Learn More', forFarmers: 'For Farmers', forConsumers: 'For Consumers', features: { directConnect: 'Direct connection with farmers', freshProduce: 'Fresh organic produce', fairPrices: 'Fair prices for everyone', organicCertified: 'Certified organic products' } },
    auth: { welcome: 'Welcome to FarmConnect', loginTitle: 'Sign In', signupTitle: 'Create Account', email: 'Email', password: 'Password', confirmPassword: 'Confirm Password', name: 'Full Name', farmName: 'Farm Name', location: 'Location', phone: 'Phone Number', forgotPassword: 'Forgot Password?', rememberMe: 'Remember Me', alreadyHaveAccount: 'Already have an account? Sign in', dontHaveAccount: "Don't have an account? Sign up", farmer: 'Farmer', consumer: 'Consumer', farmerDescription: 'Sell your organic produce directly to consumers', consumerDescription: 'Browse and buy fresh organic produce from local farmers', demoLogin: 'Demo Login', subscriptionNote: 'Farmer subscription: ₹99/month for access to all features' },
    products: { title: 'Products', addProduct: 'Add Product', editProduct: 'Edit Product', productName: 'Product Name', category: 'Category', description: 'Description', price: 'Price', unit: 'Unit', inventory: 'Inventory', organic: 'Organic', certifications: 'Certifications', harvestDate: 'Harvest Date', expiryDate: 'Expiry Date', nutritionInfo: 'Nutrition Information', addToCart: 'Add to Cart', outOfStock: 'Out of Stock', lowStock: 'Low Stock', inStock: 'In Stock', featured: 'Featured', categories: { all: 'All Categories', vegetables: 'Vegetables', fruits: 'Fruits', herbs: 'Herbs', grains: 'Grains', dairy: 'Dairy', pulses: 'Pulses', spices: 'Spices' } },
    cart: { title: 'Shopping Cart', empty: 'Your cart is empty', emptyMessage: 'Add some fresh organic products to get started!', continueShopping: 'Continue Shopping', checkout: 'Checkout', items: 'items', delivery: 'Delivery Fee', deliveryFree: 'FREE', deliveryAddress: 'Delivery Address', paymentMethod: 'Payment Method', specialInstructions: 'Special Instructions (Optional)', orderSummary: 'Order Summary', placeOrder: 'Place Order', orderPlaced: 'Order Placed Successfully!', orderSuccess: 'Your order has been placed and will be processed soon.', estimatedDelivery: 'Estimated Delivery: 2-3 business days', cod: 'Cash on Delivery', upi: 'UPI Payment', card: 'Credit/Debit Card', netbanking: 'Net Banking' },
    orders: { title: 'Orders', orderHistory: 'Order History', orderManagement: 'Order Management', orderNumber: 'Order', orderDate: 'Order Date', status: 'Status', pending: 'Pending', confirmed: 'Confirmed', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled', viewDetails: 'View Details', trackOrder: 'Track Order', confirm: 'Confirm', cancel: 'Cancel', markShipped: 'Mark as Shipped', markDelivered: 'Mark as Delivered', noOrders: 'No orders yet', noOrdersMessage: 'Your orders will appear here once you make a purchase.' },
    farmer: { dashboard: 'Farmer Dashboard', totalProducts: 'Total Products', revenue: 'Est. Revenue', avgRating: 'Avg Rating', addYourFirst: 'Add Your First Product', farmProfile: 'Farm Profile', farmSize: 'Farm Size', subscription: 'Subscription', subscriptionActive: 'Active', subscriptionExpired: 'Expired', subscriptionPending: 'Pending', monthlyFee: 'per month', nextPayment: 'Next billing date', manageSubscription: 'Manage Subscription', proFeatures: 'Pro Features', subscriptionExpiring: 'Subscription expires in', renewNow: 'Renew now' },
    subscription: { title: 'Join FarmConnect as a Farmer', subtitle: 'Start selling your organic produce directly to consumers with our farmer subscription', planName: 'Farmer Pro Plan', mostPopular: 'Most Popular', subscribeNow: 'Subscribe Now', paymentDetails: 'Payment Details', cardNumber: 'Card Number', expiryDate: 'Expiry Date', cvv: 'CVV', cardholderName: 'Cardholder Name', gst: 'GST (18%)', completePayment: 'Complete Payment', processingPayment: 'Processing Payment...', whyChoose: 'Why Choose FarmConnect?', successStories: 'Success Stories', features: { unlimitedProducts: 'List unlimited organic products', directCommunication: 'Direct customer communication', inventoryManagement: 'Real-time inventory management', analytics: 'Analytics and sales reports', prioritySupport: 'Priority customer support', featuredProfile: 'Featured farm profile', mobileApp: 'Mobile app access', marketingTools: 'Marketing tools and promotion' }, benefits: { directAccess: 'Connect directly with customers who value organic, locally-sourced produce.', fairPricing: 'Set your own prices and keep more of your profits without middlemen.', growBusiness: 'Use our analytics and marketing tools to expand your customer base.' } },
    notifications: { title: 'Notifications', noNotifications: 'No notifications', allCaughtUp: "You're all caught up!", markAllRead: 'Mark all read', newOrder: 'New Order Received', orderUpdate: 'Order Status Updated', welcome: 'Welcome to FarmConnect!', subscriptionUpdate: 'Subscription Updated' },
    marketplace: { title: 'Organic Marketplace', subtitle: 'Discover fresh organic produce from local farmers', searchPlaceholder: 'Search products, farmers, or categories...', noProducts: 'No products found', adjustFilters: 'Try adjusting your search criteria', clearFilters: 'Clear Filters', productsFound: 'products found', featuredFarmers: 'Featured Farmers', meetFarmers: 'Meet the farmers who grow your food', viewFarm: 'View Farm', organicOnly: 'Organic Only', priceRange: 'Price Range', sortBy: { name: 'Name', priceLow: 'Price: Low to High', priceHigh: 'Price: High to Low', rating: 'Highest Rated' } },
    profile: { title: 'Profile', personalInfo: 'Personal Information', contactInfo: 'Contact Information', preferences: 'Preferences', updateProfile: 'Update Profile', changePassword: 'Change Password', deleteAccount: 'Delete Account' },
    messages: { success: { productAdded: 'Product added successfully!', productUpdated: 'Product updated successfully!', productDeleted: 'Product deleted successfully!', addedToCart: 'Item added to cart!', orderPlaced: 'Order placed successfully!', loginSuccess: 'Welcome back!', logoutSuccess: 'Logged out successfully', accountCreated: 'Account created successfully!' }, error: { productNotFound: 'Product not found', invalidCredentials: 'Invalid email or password', addToCartFailed: 'Failed to add item to cart', orderFailed: 'Failed to place order', loadDataFailed: 'Failed to load application data', loginRequired: 'Please login to continue', consumerOnly: 'Please login as a consumer to add items to cart' } },
    currency: { symbol: '₹', code: 'INR' }
  } as Translations;

  const contextValue: LanguageContextType = {
    currentLanguage,
    translations: safeTranslations,
    languageInfo: languageService.getLanguageInfo(),
    setLanguage,
    t: safeTranslations, // Shorthand for translations
    formatCurrency: languageService.formatCurrency.bind(languageService),
    formatNumber: languageService.formatNumber.bind(languageService),
    isRTL: languageService.isRTL(),
    isLoading
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Hook for easy access to translations
export const useTranslations = () => {
  const { translations } = useLanguage();
  return translations;
};

// Hook for easy access to t function
export const useT = () => {
  const { t } = useLanguage();
  return t;
};