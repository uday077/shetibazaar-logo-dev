import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, Truck, XCircle, Eye, MessageCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { dataService, Order, User, formatDistanceToNow, format } from '../services/dataService';
import { toast } from 'sonner';

interface OrderHistoryProps {
  user: User;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, [user.id]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const userOrders = await dataService.getOrders(user.id, user.type);
      setOrders(userOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await dataService.updateOrderStatus(orderId, status);
      await loadOrders();
      
      // Add notification to customer
      const order = orders.find(o => o.id === orderId);
      if (order) {
        await dataService.addNotification({
          userId: order.customerId,
          type: 'order',
          title: 'Order Status Updated',
          message: `Your order #${orderId} is now ${status}`,
          read: false,
          actionUrl: '/orders'
        });
      }
      
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg text-gray-900 mb-1">Order #{order.id}</h3>
            <p className="text-sm text-gray-600">
              {format(new Date(order.orderDate), 'MMM dd, yyyy')} • 
              {formatDistanceToNow(new Date(order.orderDate))}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(order.status)}>
              {getStatusIcon(order.status)}
              <span className="ml-1 capitalize">{order.status}</span>
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm text-gray-600 mb-1">Items ({order.items.length})</h4>
            <div className="space-y-1">
              {order.items.slice(0, 3).map((item) => (
                <p key={item.id} className="text-sm text-gray-900">
                  {item.quantity}x {item.product.name}
                </p>
              ))}
              {order.items.length > 3 && (
                <p className="text-sm text-gray-600">
                  +{order.items.length - 3} more items
                </p>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm text-gray-600 mb-1">Total Amount</h4>
            <p className="text-xl text-gray-900">₹{order.total.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{order.paymentMethod.toUpperCase()}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details #{order.id}</DialogTitle>
                </DialogHeader>
                <OrderDetailsModal order={order} />
              </DialogContent>
            </Dialog>

            {user.type === 'consumer' && order.status === 'delivered' && (
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-1" />
                Review
              </Button>
            )}
          </div>

          {user.type === 'farmer' && (
            <div className="flex space-x-2">
              {order.status === 'pending' && (
                <>
                  <Button 
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'confirmed')}
                  >
                    Confirm
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {order.status === 'confirmed' && (
                <Button 
                  size="sm"
                  onClick={() => updateOrderStatus(order.id, 'shipped')}
                >
                  Mark as Shipped
                </Button>
              )}
              {order.status === 'shipped' && (
                <Button 
                  size="sm"
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                >
                  Mark as Delivered
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const OrderDetailsModal: React.FC<{ order: Order }> = ({ order }) => (
    <div className="space-y-6">
      {/* Order Status Timeline */}
      <div>
        <h4 className="text-lg text-gray-900 mb-3">Order Status</h4>
        <div className="flex items-center space-x-4">
          {['pending', 'confirmed', 'shipped', 'delivered'].map((status, index) => {
            const isActive = order.status === status;
            const isPassed = ['pending', 'confirmed', 'shipped', 'delivered'].indexOf(order.status) >= index;
            
            return (
              <div key={status} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isPassed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {getStatusIcon(status as Order['status'])}
                </div>
                {index < 3 && (
                  <div className={`w-12 h-0.5 ${isPassed ? 'bg-green-300' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Order Items */}
      <div>
        <h4 className="text-lg text-gray-900 mb-3">Items Ordered</h4>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h5 className="text-gray-900">{item.product.name}</h5>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity} {item.product.unit}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-600">₹{item.product.price}/{item.product.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Order Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg text-gray-900 mb-3">Delivery Information</h4>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-gray-600">Address:</span><br />
              <span className="text-gray-900">{order.deliveryAddress}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Payment Method:</span> 
              <span className="text-gray-900 ml-1">{order.paymentMethod.toUpperCase()}</span>
            </p>
            {order.notes && (
              <p className="text-sm">
                <span className="text-gray-600">Notes:</span><br />
                <span className="text-gray-900">{order.notes}</span>
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-lg text-gray-900 mb-3">Order Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">₹0.00</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">
          {user.type === 'farmer' ? 'Order Management' : 'Order History'}
        </h1>
        <p className="text-gray-600">
          {user.type === 'farmer' 
            ? 'Manage customer orders and track deliveries'
            : 'Track your orders and delivery status'
          }
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">
              {user.type === 'farmer' 
                ? 'Orders from customers will appear here once you start receiving them.'
                : 'Your orders will appear here once you make a purchase.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">
              All ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({getOrdersByStatus('pending').length})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({getOrdersByStatus('confirmed').length})
            </TabsTrigger>
            <TabsTrigger value="shipped">
              Shipped ({getOrdersByStatus('shipped').length})
            </TabsTrigger>
            <TabsTrigger value="delivered">
              Delivered ({getOrdersByStatus('delivered').length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({getOrdersByStatus('cancelled').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <TabsContent key={status} value={status}>
              {getOrdersByStatus(status as Order['status']).map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default OrderHistory;