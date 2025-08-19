import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard, MapPin, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { dataService, CartItem, User } from '../services/dataService';
import { toast } from 'sonner@2.0.3';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onCartUpdate: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose, user, onCartUpdate }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [deliveryAddress, setDeliveryAddress] = useState(user.address || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen, user.id]);

  const loadCart = async () => {
    try {
      const items = await dataService.getCart(user.id);
      setCartItems(items);
    } catch (error) {
      toast.error('Failed to load cart');
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      setLoading(true);
      await dataService.updateCartItem(user.id, itemId, newQuantity);
      await loadCart();
      onCartUpdate();
    } catch (error) {
      toast.error('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setLoading(true);
      await dataService.removeFromCart(user.id, itemId);
      await loadCart();
      onCartUpdate();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    const total = calculateTotal();
    return total > 500 ? 0 : 50; // Free delivery above ₹500
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateDeliveryFee();
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setStep('checkout');
  };

  const placeOrder = async () => {
    if (!deliveryAddress.trim()) {
      toast.error('Please enter delivery address');
      return;
    }

    try {
      setLoading(true);

      // Group items by farmer
      const itemsByFarmer = cartItems.reduce((acc, item) => {
        const farmerId = item.product.farmerId;
        if (!acc[farmerId]) {
          acc[farmerId] = [];
        }
        acc[farmerId].push(item);
        return acc;
      }, {} as Record<string, CartItem[]>);

      // Create separate orders for each farmer
      const orderPromises = Object.entries(itemsByFarmer).map(([farmerId, items]) => {
        const farmerTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        
        return dataService.createOrder({
          customerId: user.id,
          farmerId,
          items,
          total: farmerTotal,
          status: 'pending',
          paymentMethod,
          deliveryAddress,
          notes
        });
      });

      const orders = await Promise.all(orderPromises);
      
      // For demo, we'll use the first order ID
      setOrderId(orders[0].id);
      setStep('confirmation');
      onCartUpdate();

      // Add notifications
      await Promise.all(orders.map(order => 
        dataService.addNotification({
          userId: order.farmerId,
          type: 'order',
          title: 'New Order Received',
          message: `You have received a new order worth ₹${order.total}`,
          read: false,
          actionUrl: `/farmer-dashboard`
        })
      ));

      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const resetCart = () => {
    setStep('cart');
    setDeliveryAddress(user.address || '');
    setPaymentMethod('cod');
    setNotes('');
    setOrderId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-green-600" />
            <h2 className="text-xl">
              {step === 'cart' && 'Shopping Cart'}
              {step === 'checkout' && 'Checkout'}
              {step === 'confirmation' && 'Order Confirmed'}
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Cart Step */}
        {step === 'cart' && (
          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some fresh organic products to get started!</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-1">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">{item.product.farmerName}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{item.product.category}</Badge>
                              {item.product.organic && (
                                <Badge className="bg-green-100 text-green-800">Organic</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={loading || item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={loading || item.quantity >= item.product.inventory}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg text-gray-900">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">₹{item.product.price}/{item.product.unit}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            disabled={loading}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Cart Summary */}
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span>₹{calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>
                          {calculateDeliveryFee() === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${calculateDeliveryFee()}`
                          )}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span>Total</span>
                        <span>₹{calculateGrandTotal().toFixed(2)}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4"
                      onClick={proceedToCheckout}
                      disabled={loading}
                    >
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Checkout Step */}
        {step === 'checkout' && (
          <div className="p-6 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your complete address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="upi">UPI Payment</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Special Instructions (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special delivery instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({cartItems.length})</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{calculateDeliveryFee()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span>Total Amount</span>
                    <span>₹{calculateGrandTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('cart')}
                    className="flex-1"
                  >
                    Back to Cart
                  </Button>
                  <Button 
                    onClick={placeOrder}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Confirmation Step */}
        {step === 'confirmation' && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Order Placed Successfully!</h3>
            <p className="text-gray-600 mb-4">
              Your order #{orderId} has been placed and will be processed soon.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Estimated Delivery:</strong> 2-3 business days
              </p>
              <p className="text-sm text-gray-600">
                <strong>Payment Method:</strong> {paymentMethod.toUpperCase()}
              </p>
            </div>
            <Button onClick={resetCart} className="w-full">
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;