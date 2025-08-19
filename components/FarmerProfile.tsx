import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Award, Calendar, Users, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Farmer, Product } from '../services/dataService';

interface FarmerProfileProps {
  farmers: Farmer[];
  products: Product[];
}

const FarmerProfile: React.FC<FarmerProfileProps> = ({ farmers, products }) => {
  const { id } = useParams<{ id: string }>();
  
  const farmer = farmers.find(f => f.id === id);
  const farmerProducts = products.filter(p => p.farmerId === id);

  if (!farmer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Farmer not found</h1>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/marketplace">
          <Button variant="outline" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Button>
        </Link>
      </div>

      {/* Farmer Header */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl text-gray-900 mb-2">{farmer.name}</h1>
            <div className="flex items-center space-x-1 mb-4">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{farmer.location}</span>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(farmer.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{farmer.rating}</span>
              <span className="text-gray-400">({farmer.reviews} reviews)</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-gray-900 mb-2">About Our Farm</h3>
            <p className="text-gray-600 leading-relaxed">{farmer.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg text-gray-900 mb-3">Farm Details</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Farm Size: {farmer.farmSize}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{farmerProducts.length} Products Available</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg text-gray-900 mb-3">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {farmer.certifications.map((cert) => (
                  <Badge key={cert} className="bg-green-100 text-green-800">
                    <Award className="w-3 h-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl text-green-600 mb-1">{farmerProducts.length}</div>
            <div className="text-gray-600">Products</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl text-green-600 mb-1">{farmer.rating}</div>
            <div className="text-gray-600">Rating</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl text-green-600 mb-1">{farmer.reviews}</div>
            <div className="text-gray-600">Reviews</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl text-green-600 mb-1">{farmer.farmSize}</div>
            <div className="text-gray-600">Farm Size</div>
          </CardContent>
        </Card>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl text-gray-900">Our Products</h2>
          <Badge variant="outline" className="text-sm">
            {farmerProducts.length} products available
          </Badge>
        </div>

        {farmerProducts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500 mb-4">No products available at the moment</div>
              <p className="text-gray-400">Check back soon for fresh produce!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {farmerProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg text-gray-900">{product.name}</h3>
                        {product.organic && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Organic
                          </Badge>
                        )}
                      </div>
                      
                      <Badge variant="outline" className="mb-2">{product.category}</Badge>

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                          <span className="text-sm text-gray-400">({product.reviews})</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xl text-green-600">₹{product.price.toFixed(2)}</span>
                          <span className="text-sm text-gray-500">/{product.unit}</span>
                        </div>
                        <Button size="sm" className="flex items-center space-x-1">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add</span>
                        </Button>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        {product.inventory} {product.unit}s available
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Contact {farmer.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">
                Have questions about our products or farming practices? We'd love to hear from you!
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900">{farmer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{farmer.location}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Button className="w-full">Send Message</Button>
              <Button variant="outline" className="w-full">Visit Farm</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerProfile;