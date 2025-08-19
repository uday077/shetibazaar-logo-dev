export interface User {
  id: string;
  name: string;
  email: string;
  type: 'farmer' | 'consumer';
  location?: string;
  avatar?: string;
  subscriptionStatus?: 'active' | 'expired' | 'pending' | 'none';
  subscriptionEndDate?: string;
  phone?: string;
  address?: string;
  preferences?: string[];
  joinedDate: string;
  lastLogin: string;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  image: string;
  inventory: number;
  location: string;
  organic: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
  isAvailable: boolean;
  harvestDate?: string;
  expiryDate?: string;
  nutritionInfo?: string;
  certifications: string[];
}

export interface CartItem {
  id: string;
  customerId: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  farmerId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  paymentMethod: string;
  deliveryAddress: string;
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'order' | 'inquiry';
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'message' | 'subscription' | 'review' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  location: string;
  description: string;
  avatar: string;
  farmSize: string;
  certifications: string[];
  rating: number;
  reviews: number;
  products: Product[];
  subscriptionStatus?: 'active' | 'expired' | 'pending' | 'none';
}

// Simple date utility functions to replace date-fns
export const formatDistanceToNow = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

export const format = (date: Date, formatStr: string): string => {
  if (formatStr === 'MMM dd, yyyy') {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  }
  return date.toLocaleDateString();
};

class DataService {
  private storageKey = 'farmconnect_data';

  private defaultData = {
    users: [],
    products: [],
    orders: [],
    messages: [],
    reviews: [],
    notifications: [],
    cart: [],
    currentUser: null
  };

  private loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : this.defaultData;
    } catch {
      return this.defaultData;
    }
  }

  private saveData(data: any) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  // User Management
  async authenticateUser(email: string, password: string): Promise<User | null> {
    const data = this.loadData();
    const user = data.users.find((u: User) => u.email === email);
    
    if (user) {
      user.lastLogin = new Date().toISOString();
      data.currentUser = user;
      this.saveData(data);
      return user;
    }
    return null;
  }

  async registerUser(userData: Omit<User, 'id' | 'joinedDate' | 'lastLogin'>): Promise<User> {
    const data = this.loadData();
    const user: User = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    data.users.push(user);
    data.currentUser = user;
    this.saveData(data);
    return user;
  }

  async getCurrentUser(): Promise<User | null> {
    const data = this.loadData();
    return data.currentUser;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const data = this.loadData();
    const userIndex = data.users.findIndex((u: User) => u.id === userId);
    
    if (userIndex !== -1) {
      data.users[userIndex] = { ...data.users[userIndex], ...updates };
      if (data.currentUser?.id === userId) {
        data.currentUser = data.users[userIndex];
      }
      this.saveData(data);
      return data.users[userIndex];
    }
    return null;
  }

  async logoutUser(): Promise<void> {
    const data = this.loadData();
    data.currentUser = null;
    this.saveData(data);
  }

  // Product Management
  async getProducts(filters?: {
    category?: string;
    location?: string;
    priceRange?: [number, number];
    organic?: boolean;
    available?: boolean;
    farmerId?: string;
  }): Promise<Product[]> {
    const data = this.loadData();
    let products = data.products;

    if (filters) {
      if (filters.category && filters.category !== 'all') {
        products = products.filter((p: Product) => p.category === filters.category);
      }
      if (filters.location) {
        products = products.filter((p: Product) => 
          p.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.priceRange) {
        products = products.filter((p: Product) => 
          p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
        );
      }
      if (filters.organic !== undefined) {
        products = products.filter((p: Product) => p.organic === filters.organic);
      }
      if (filters.available !== undefined) {
        products = products.filter((p: Product) => p.isAvailable === filters.available);
      }
      if (filters.farmerId) {
        products = products.filter((p: Product) => p.farmerId === filters.farmerId);
      }
    }

    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    const data = this.loadData();
    return data.products.find((p: Product) => p.id === id) || null;
  }

  async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const data = this.loadData();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    data.products.push(newProduct);
    this.saveData(data);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const data = this.loadData();
    const productIndex = data.products.findIndex((p: Product) => p.id === id);
    
    if (productIndex !== -1) {
      data.products[productIndex] = {
        ...data.products[productIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData(data);
      return data.products[productIndex];
    }
    return null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const data = this.loadData();
    const productIndex = data.products.findIndex((p: Product) => p.id === id);
    
    if (productIndex !== -1) {
      data.products.splice(productIndex, 1);
      this.saveData(data);
      return true;
    }
    return false;
  }

  // Cart Management
  async getCart(userId: string): Promise<CartItem[]> {
    const data = this.loadData();
    return data.cart.filter((item: CartItem) => item.customerId === userId) || [];
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<CartItem> {
    const data = this.loadData();
    const product = await this.getProductById(productId);
    
    if (!product) throw new Error('Product not found');

    const existingItem = data.cart.find((item: CartItem) => 
      item.customerId === userId && item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      this.saveData(data);
      return existingItem;
    }

    const cartItem: CartItem = {
      id: Date.now().toString(),
      customerId: userId,
      productId,
      product,
      quantity,
      addedAt: new Date().toISOString()
    };

    data.cart.push(cartItem);
    this.saveData(data);
    return cartItem;
  }

  async updateCartItem(userId: string, itemId: string, quantity: number): Promise<CartItem | null> {
    const data = this.loadData();
    const itemIndex = data.cart.findIndex((item: CartItem) => 
      item.id === itemId && item.customerId === userId
    );

    if (itemIndex !== -1) {
      if (quantity <= 0) {
        data.cart.splice(itemIndex, 1);
        this.saveData(data);
        return null;
      }
      
      data.cart[itemIndex].quantity = quantity;
      this.saveData(data);
      return data.cart[itemIndex];
    }
    return null;
  }

  async removeFromCart(userId: string, itemId: string): Promise<boolean> {
    const data = this.loadData();
    const itemIndex = data.cart.findIndex((item: CartItem) => 
      item.id === itemId && item.customerId === userId
    );

    if (itemIndex !== -1) {
      data.cart.splice(itemIndex, 1);
      this.saveData(data);
      return true;
    }
    return false;
  }

  async clearCart(userId: string): Promise<void> {
    const data = this.loadData();
    data.cart = data.cart.filter((item: CartItem) => item.customerId !== userId);
    this.saveData(data);
  }

  // Order Management
  async createOrder(orderData: Omit<Order, 'id' | 'orderDate'>): Promise<Order> {
    const data = this.loadData();
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderDate: new Date().toISOString()
    };

    data.orders.push(order);
    
    // Clear cart items for this order
    if (orderData.customerId) {
      await this.clearCart(orderData.customerId);
    }

    this.saveData(data);
    return order;
  }

  async getOrders(userId: string, userType: 'farmer' | 'consumer'): Promise<Order[]> {
    const data = this.loadData();
    return data.orders.filter((order: Order) => 
      userType === 'farmer' ? order.farmerId === userId : order.customerId === userId
    );
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order | null> {
    const data = this.loadData();
    const orderIndex = data.orders.findIndex((o: Order) => o.id === orderId);

    if (orderIndex !== -1) {
      data.orders[orderIndex].status = status;
      if (status === 'delivered') {
        data.orders[orderIndex].deliveryDate = new Date().toISOString();
      }
      this.saveData(data);
      return data.orders[orderIndex];
    }
    return null;
  }

  // Reviews Management
  async addReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const data = this.loadData();
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    data.reviews.push(newReview);
    this.saveData(data);

    // Update product rating
    await this.updateProductRating(review.productId);
    
    return newReview;
  }

  async getReviews(productId: string): Promise<Review[]> {
    const data = this.loadData();
    return data.reviews.filter((r: Review) => r.productId === productId);
  }

  private async updateProductRating(productId: string): Promise<void> {
    const reviews = await this.getReviews(productId);
    if (reviews.length === 0) return;

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await this.updateProduct(productId, { 
      rating: Math.round(avgRating * 10) / 10,
      reviews: reviews.length 
    });
  }

  // Notifications
  async addNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const data = this.loadData();
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    data.notifications.push(newNotification);
    this.saveData(data);
    return newNotification;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    const data = this.loadData();
    return data.notifications
      .filter((n: Notification) => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const data = this.loadData();
    const notification = data.notifications.find((n: Notification) => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveData(data);
    }
  }

  // Initialize with sample data
  async initializeSampleData(): Promise<void> {
    const data = this.loadData();
    
    if (data.users.length === 0) {
      // Sample users
      const sampleUsers: User[] = [
        {
          id: '1',
          name: 'Green Valley Farm',
          email: 'demo@greenvalley.com',
          type: 'farmer',
          location: 'Punjab, India',
          phone: '+91 98765 43210',
          address: 'Village Kharar, Punjab 140301',
          subscriptionStatus: 'active',
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          joinedDate: '2023-01-15T00:00:00.000Z',
          lastLogin: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Rajesh Kumar',
          email: 'consumer@example.com',
          type: 'consumer',
          location: 'Mumbai, India',
          phone: '+91 87654 32109',
          address: 'Bandra West, Mumbai 400050',
          preferences: ['organic', 'local', 'vegetables'],
          joinedDate: '2023-03-20T00:00:00.000Z',
          lastLogin: new Date().toISOString()
        }
      ];

      // Sample products
      const sampleProducts: Product[] = [
        {
          id: '1',
          farmerId: '1',
          farmerName: 'Green Valley Farm',
          name: 'Organic Tomatoes',
          category: 'Vegetables',
          price: 45,
          unit: 'kg',
          description: 'Fresh, vine-ripened organic tomatoes. Rich in vitamins and perfect for daily cooking.',
          image: 'https://images.unsplash.com/photo-1546470427-e5380b6d8833?w=400&h=300&fit=crop',
          inventory: 50,
          location: 'Punjab, India',
          organic: true,
          rating: 4.7,
          reviews: 23,
          isAvailable: true,
          harvestDate: '2024-01-10T00:00:00.000Z',
          expiryDate: '2024-01-25T00:00:00.000Z',
          nutritionInfo: 'High in Vitamin C, Lycopene, and Potassium',
          certifications: ['USDA Organic', 'FSSAI Certified'],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          farmerId: '1',
          farmerName: 'Green Valley Farm',
          name: 'Fresh Spinach',
          category: 'Vegetables',
          price: 25,
          unit: 'kg',
          description: 'Freshly harvested organic spinach leaves. Rich in iron and perfect for healthy meals.',
          image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
          inventory: 30,
          location: 'Punjab, India',
          organic: true,
          rating: 4.9,
          reviews: 15,
          isAvailable: true,
          harvestDate: '2024-01-12T00:00:00.000Z',
          expiryDate: '2024-01-20T00:00:00.000Z',
          nutritionInfo: 'High in Iron, Vitamin K, and Folate',
          certifications: ['USDA Organic', 'FSSAI Certified'],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: new Date().toISOString()
        }
      ];

      data.users = sampleUsers;
      data.products = sampleProducts;
      this.saveData(data);
    }
  }
}

export const dataService = new DataService();