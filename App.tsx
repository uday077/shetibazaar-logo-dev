import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import FarmerDashboard from './components/FarmerDashboard';
import ConsumerMarketplace from './components/ConsumerMarketplace';
import ProductDetails from './components/ProductDetails';
import FarmerProfile from './components/FarmerProfile';
import FarmerSubscription from './components/FarmerSubscription';
import ShoppingCart from './components/ShoppingCart';
import NotificationCenter from './components/NotificationCenter';
import OrderHistory from './components/OrderHistory';
import { dataService, User, Product, Farmer } from './services/dataService';
import { toast, Toaster } from 'sonner@2.0.3';

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserData();
      // Set up periodic data refresh
      const interval = setInterval(loadUserData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  const initializeApp = async () => {
    try {
      setLoading(true);
      
      // Initialize sample data
      await dataService.initializeSampleData();
      
      // Load current user if logged in
      const currentUser = await dataService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }

      // Load initial products and farmers
      const [productsData, farmersData] = await Promise.all([
        dataService.getProducts(),
        loadFarmers()
      ]);
      
      setProducts(productsData);
      setFarmers(farmersData);
    } catch (error) {
      console.error('Failed to initialize app:', error);
      toast.error('Failed to load application data');
    } finally {
      setLoading(false);
    }
  };

  const loadFarmers = async (): Promise<Farmer[]> => {
    // In a real app, this would be a separate API call
    // For now, we'll simulate farmers data based on products
    return [
      {
        id: '1',
        name: 'Green Valley Farm',
        email: 'contact@greenvalley.com',
        location: 'Punjab, India',
        description: 'Family-owned organic farm specializing in fresh vegetables and herbs. We use sustainable farming practices and have been certified organic for over 10 years.',
        avatar: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=300&fit=crop',
        farmSize: '50 acres',
        certifications: ['USDA Organic', 'Non-GMO Project'],
        rating: 4.8,
        reviews: 124,
        products: [],
        subscriptionStatus: 'active'
      }
    ];
  };

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Load cart count
      const cartItems = await dataService.getCart(user.id);
      setCartItemCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));

      // Load unread notifications count
      const notifications = await dataService.getNotifications(user.id);
      setUnreadNotifications(notifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleLogin = async (email: string, password: string, userData?: Omit<User, 'id' | 'joinedDate' | 'lastLogin'>) => {
    try {
      setLoading(true);
      
      let authenticatedUser: User | null = null;
      
      if (userData) {
        // Registration
        authenticatedUser = await dataService.registerUser(userData);
        toast.success('Account created successfully!');
        
        // Add welcome notification
        await dataService.addNotification({
          userId: authenticatedUser.id,
          type: 'system',
          title: 'Welcome to FarmConnect!',
          message: userData.type === 'farmer' 
            ? 'Start listing your organic products and connect with customers directly.'
            : 'Discover fresh organic produce from local farmers in your area.',
          read: false
        });
      } else {
        // Login
        authenticatedUser = await dataService.authenticateUser(email, password);
        if (!authenticatedUser) {
          toast.error('Invalid email or password');
          return false;
        }
        toast.success('Welcome back!');
      }

      setUser(authenticatedUser);
      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      toast.error('Authentication failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await dataService.logoutUser();
      setUser(null);
      setCartItemCount(0);
      setUnreadNotifications(0);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSubscriptionUpdate = async (subscriptionData: { status: 'active' | 'expired' | 'pending' | 'none'; endDate?: string }) => {
    if (user) {
      const updatedUser = await dataService.updateUser(user.id, {
        subscriptionStatus: subscriptionData.status,
        subscriptionEndDate: subscriptionData.endDate
      });
      
      if (updatedUser) {
        setUser(updatedUser);
        
        // Add subscription notification
        await dataService.addNotification({
          userId: user.id,
          type: 'subscription',
          title: 'Subscription Updated',
          message: `Your farmer subscription is now ${subscriptionData.status}`,
          read: false
        });
      }
    }
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProduct = await dataService.addProduct(productData);
      const updatedProducts = await dataService.getProducts();
      setProducts(updatedProducts);
      toast.success('Product added successfully!');
      return newProduct;
    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error('Failed to add product');
      throw error;
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    try {
      await dataService.updateProduct(productId, updates);
      const updatedProducts = await dataService.getProducts();
      setProducts(updatedProducts);
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to update product');
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await dataService.deleteProduct(productId);
      const updatedProducts = await dataService.getProducts();
      setProducts(updatedProducts);
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user || user.type !== 'consumer') {
      toast.error('Please login as a consumer to add items to cart');
      return;
    }

    try {
      await dataService.addToCart(user.id, productId, quantity);
      loadUserData(); // Refresh cart count
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const canAccessFarmerFeatures = (user: User | null): boolean => {
    if (!user || user.type !== 'farmer') return false;
    return user.subscriptionStatus === 'active';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-gradient-premium rounded-3xl flex items-center justify-center animate-pulse shadow-premium-lg">
            <div className="w-10 h-10 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-2 text-heading">Loading FarmConnect</h2>
            <p className="text-muted-foreground font-body text-body">Connecting farmers and consumers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header 
          user={user} 
          onLogout={handleLogout}
          cartItemCount={cartItemCount}
          unreadNotifications={unreadNotifications}
          onCartClick={() => setCartOpen(true)}
          onNotificationsClick={() => setNotificationsOpen(true)}
        />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={
            user ? (
              <Navigate to={
                user.type === 'farmer' 
                  ? (canAccessFarmerFeatures(user) ? '/farmer-dashboard' : '/farmer-subscription')
                  : '/marketplace'
              } />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />
          <Route path="/farmer-subscription" element={
            user?.type === 'farmer' ? (
              <FarmerSubscription 
                user={user} 
                onSubscriptionUpdate={handleSubscriptionUpdate}
              />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/farmer-dashboard" element={
            user?.type === 'farmer' ? (
              canAccessFarmerFeatures(user) ? (
                <FarmerDashboard 
                  user={user} 
                  products={products.filter(p => p.farmerId === user.id)}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                />
              ) : (
                <Navigate to="/farmer-subscription" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/marketplace" element={
            user?.type === 'consumer' ? (
              <ConsumerMarketplace 
                farmers={farmers} 
                products={products}
                onAddToCart={addToCart}
              />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/orders" element={
            user ? (
              <OrderHistory user={user} />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/product/:id" element={
            <ProductDetails 
              products={products} 
              farmers={farmers}
              user={user}
              onAddToCart={addToCart}
            />
          } />
          <Route path="/farmer/:id" element={
            <FarmerProfile 
              farmers={farmers} 
              products={products}
              onAddToCart={addToCart}
            />
          } />
          
          {/* Catch-all route for unmatched URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Shopping Cart */}
        {user?.type === 'consumer' && (
          <ShoppingCart
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            user={user}
            onCartUpdate={loadUserData}
          />
        )}

        {/* Notification Center */}
        {user && (
          <NotificationCenter
            user={user}
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />
        )}

        {/* Toast Notifications */}
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;