import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, ShoppingCart, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Link } from 'react-router-dom';
import { Product, Farmer } from '../services/dataService';

interface ConsumerMarketplaceProps {
  farmers: Farmer[];
  products: Product[];
  onAddToCart: (productId: string, quantity?: number) => void;
}

const ConsumerMarketplace: React.FC<ConsumerMarketplaceProps> = ({ 
  farmers, 
  products, 
  onAddToCart 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const categories = ['all', 'Vegetables', 'Fruits', 'Herbs', 'Grains', 'Dairy'];

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange, organicOnly, locationFilter, sortBy]);

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Organic filter
    if (organicOnly) {
      filtered = filtered.filter(product => product.organic);
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(product =>
        product.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (productId: string) => {
    onAddToCart(productId, 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Organic Marketplace</h1>
        <p className="text-gray-600">Discover fresh organic produce from local farmers</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search products, farmers, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Location Filter */}
          <Input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />

          {/* Price Range */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600 mb-2 block">
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* Organic Only */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="organic"
              checked={organicOnly}
              onCheckedChange={setOrganicOnly}
            />
            <label htmlFor="organic" className="text-sm text-gray-700">
              Organic Only
            </label>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange([0, 1000]);
              setOrganicOnly(false);
              setLocationFilter('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex space-x-1">
                  {product.organic && (
                    <Badge className="bg-green-100 text-green-800">
                      <Leaf className="w-3 h-3 mr-1" />
                      Organic
                    </Badge>
                  )}
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                {product.inventory < 10 && (
                  <Badge className="absolute top-2 right-2 bg-orange-100 text-orange-800">
                    Low Stock
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Link 
                    to={`/product/${product.id}`}
                    className="text-lg text-gray-900 hover:text-green-600 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <Link 
                    to={`/farmer/${product.farmerId}`}
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors block"
                  >
                    by {product.farmerName}
                  </Link>
                </div>

                <div className="flex items-center space-x-1 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{product.location}</span>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl text-green-600">₹{product.price}</span>
                    <span className="text-sm text-gray-500">/{product.unit}</span>
                    <p className="text-xs text-gray-500">Stock: {product.inventory}</p>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.inventory === 0}
                    className="flex items-center space-x-1"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Farmers Section */}
      {farmers.length > 0 && (
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl text-gray-900 mb-2">Featured Farmers</h2>
            <p className="text-gray-600">Meet the farmers who grow your food</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmers.slice(0, 6).map((farmer) => (
              <Card key={farmer.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    className="w-full h-32 object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Link 
                    to={`/farmer/${farmer.id}`}
                    className="text-lg text-gray-900 hover:text-green-600 transition-colors mb-1 block"
                  >
                    {farmer.name}
                  </Link>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{farmer.location}</span>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {farmer.rating} ({farmer.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {farmer.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {farmer.certifications.slice(0, 2).map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  <Link to={`/farmer/${farmer.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Farm
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerMarketplace;