import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, BarChart3, Star, MapPin, Crown, AlertTriangle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import AddProductModal from './AddProductModal';
import { User, Product } from '../App';

interface FarmerDashboardProps {
  user: User;
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  user,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const totalRevenue = products.reduce((sum, product) => sum + (product.price * (50 - product.inventory)), 0);
  const totalProducts = products.length;
  const avgRating = products.length > 0 ? products.reduce((sum, p) => sum + p.rating, 0) / products.length : 0;

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    onAddProduct({
      ...productData,
      farmerId: user.id,
      farmerName: user.name,
      location: user.location || 'Unknown Location'
    });
    setShowAddModal(false);
  };

  const getSubscriptionEndDate = () => {
    if (user.subscriptionEndDate) {
      return new Date(user.subscriptionEndDate);
    }
    return null;
  };

  const getDaysUntilExpiry = () => {
    const endDate = getSubscriptionEndDate();
    if (!endDate) return null;
    
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getSubscriptionStatusCard = () => {
    const endDate = getSubscriptionEndDate();
    const daysUntilExpiry = getDaysUntilExpiry();

    return (
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900">Farmer Pro Plan</h3>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                  {daysUntilExpiry && daysUntilExpiry <= 7 && (
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      {daysUntilExpiry} days left
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl text-green-600">₹99</p>
              <p className="text-sm text-gray-500">per month</p>
            </div>
          </div>
          
          {endDate && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Next billing date:</span>
                <span className="text-gray-900">
                  {endDate.toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Farmer Dashboard</h1>
            <p className="text-gray-600">Manage your farm profile and products</p>
          </div>
          <div className="text-right">
            <Badge className="bg-green-100 text-green-800 mb-2">
              <Crown className="w-3 h-3 mr-1" />
              Pro Member
            </Badge>
          </div>
        </div>
      </div>

      {/* Subscription Status Alert */}
      {getDaysUntilExpiry() && getDaysUntilExpiry()! <= 7 && (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700">
            Your subscription expires in {getDaysUntilExpiry()} days. 
            <Button variant="link" className="p-0 ml-1 h-auto text-orange-700 underline">
              Renew now
            </Button> to continue accessing all features.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="md:col-span-2">
          {getSubscriptionStatusCard()}
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl text-gray-900">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Est. Revenue</p>
                <p className="text-2xl text-gray-900">₹{totalRevenue.toFixed(0)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl text-gray-900">{avgRating.toFixed(1)}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="profile">Farm Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-gray-900">Your Products</h2>
            <Button onClick={() => setShowAddModal(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Button>
          </div>

          {products.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-600 mb-6">Start by adding your first organic product to the marketplace.</p>
                <Button onClick={() => setShowAddModal(true)}>
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg text-gray-900">{product.name}</h3>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                      <p className="text-2xl text-green-600 mb-2">
                        ₹{product.price.toFixed(2)} / {product.unit}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Stock: {product.inventory}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Farm Name</label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Location</label>
                    <p className="text-gray-900">{user.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Farm Size</label>
                    <p className="text-gray-900">50 acres</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Certifications</label>
                    <div className="flex space-x-2 mt-1">
                      <Badge>USDA Organic</Badge>
                      <Badge>Non-GMO Project</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Description</label>
                    <p className="text-gray-900">
                      Family-owned organic farm specializing in fresh vegetables and herbs. 
                      We use sustainable farming practices and have been certified organic for over 10 years.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-green-600" />
                  <span>Current Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan</span>
                  <span className="text-gray-900">Farmer Pro</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Fee</span>
                  <span className="text-gray-900">₹99/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                {getSubscriptionEndDate() && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Next Payment</span>
                    <span className="text-gray-900">
                      {getSubscriptionEndDate()!.toLocaleDateString('en-IN', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
                <Button variant="outline" className="w-full">
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  Cancel Subscription
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pro Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'List unlimited organic products',
                  'Direct customer communication',
                  'Real-time inventory management',
                  'Analytics and sales reports',
                  'Priority customer support',
                  'Featured farm profile',
                  'Mobile app access',
                  'Marketing tools and promotion'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600">Orders will appear here once customers start purchasing your products.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAddProduct={handleAddProduct}
        />
      )}
    </div>
  );
};

export default FarmerDashboard;