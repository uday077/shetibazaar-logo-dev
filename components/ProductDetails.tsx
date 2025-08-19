import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Calendar, Shield, Plus, Minus, ShoppingCart, Leaf, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Product, Farmer, User as UserType } from '../services/dataService';
import { toast } from 'sonner';

interface ProductDetailsProps {
  products: Product[];
  farmers: Farmer[];
  user: UserType | null;
  onAddToCart: (productId: string, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  products, 
  farmers, 
  user, 
  onAddToCart 
}) => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id);
  const farmer = farmers.find(f => f.id === product?.farmerId);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Product not found</h1>
          <Link to="/marketplace">
            <Button variant="outline">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.inventory) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!user || user.type !== 'consumer') {
      toast.error('Please login as a consumer to add items to cart');
      return;
    }
    
    onAddToCart(product.id, quantity);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          to="/marketplace"
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {product.organic && (
                <Badge className="bg-green-100 text-green-800">
                  <Leaf className="w-3 h-3 mr-1" />
                  Organic
                </Badge>
              )}
              <Badge variant="secondary">{product.category}</Badge>
              {product.inventory < 10 && (
                <Badge className="bg-orange-100 text-orange-800">
                  Low Stock ({product.inventory} left)
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg text-gray-700">{product.rating}</span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{product.location}</span>
            </div>
          </div>

          <div className="text-4xl text-green-600">
            ₹{product.price}
            <span className="text-lg text-gray-500">/{product.unit}</span>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Farmer Info */}
          {farmer && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <Link 
                      to={`/farmer/${farmer.id}`}
                      className="text-lg text-gray-900 hover:text-green-600 transition-colors"
                    >
                      {farmer.name}
                    </Link>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {farmer.rating} ({farmer.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <Link to={`/farmer/${farmer.id}`}>
                    <Button variant="outline" size="sm">
                      View Farm
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Product Info */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Harvest Date</span>
                </div>
                <p className="text-gray-900">
                  {product.harvestDate ? formatDate(product.harvestDate) : 'Recently harvested'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Stock Available</span>
                </div>
                <p className="text-gray-900">{product.inventory} {product.unit}s</p>
              </CardContent>
            </Card>
          </div>

          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div>
              <h3 className="text-lg text-gray-900 mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <Badge key={cert} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition Info */}
          {product.nutritionInfo && (
            <div>
              <h3 className="text-lg text-gray-900 mb-2">Nutrition Information</h3>
              <p className="text-gray-700">{product.nutritionInfo}</p>
            </div>
          )}

          {/* Add to Cart */}
          {user?.type === 'consumer' && product.inventory > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg text-gray-900">Quantity</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.inventory}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg text-gray-900">Total</span>
                  <span className="text-2xl text-green-600">
                    ₹{(product.price * quantity).toFixed(2)}
                  </span>
                </div>

                <Button 
                  className="w-full"
                  onClick={handleAddToCart}
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          )}

          {user?.type !== 'consumer' && (
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-gray-600 mb-4">Please login as a consumer to purchase this product</p>
                <Link to="/login">
                  <Button>Login as Consumer</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {product.inventory === 0 && (
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-red-600 text-lg">Currently out of stock</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;