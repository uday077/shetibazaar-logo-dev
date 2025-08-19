import React, { useState } from 'react';
import { Check, CreditCard, Calendar, Shield, Users, TrendingUp, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { User } from '../App';

interface FarmerSubscriptionProps {
  user: User;
  onSubscriptionUpdate: (subscriptionData: { status: 'active' | 'expired' | 'pending' | 'none'; endDate?: string }) => void;
}

const FarmerSubscription: React.FC<FarmerSubscriptionProps> = ({ user, onSubscriptionUpdate }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subscriptionFeatures = [
    'List unlimited organic products',
    'Direct customer communication',
    'Real-time inventory management',
    'Analytics and sales reports',
    'Priority customer support',
    'Featured farm profile',
    'Mobile app access',
    'Marketing tools and promotion'
  ];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      
      onSubscriptionUpdate({
        status: 'active',
        endDate: endDate.toISOString()
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const getSubscriptionStatusDisplay = () => {
    switch (user.subscriptionStatus) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Active Subscription
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="destructive">
            <X className="w-3 h-3 mr-1" />
            Subscription Expired
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Calendar className="w-3 h-3 mr-1" />
            Payment Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            No Active Subscription
          </Badge>
        );
    }
  };

  if (user.subscriptionStatus === 'active') {
    const endDate = user.subscriptionEndDate ? new Date(user.subscriptionEndDate) : null;
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-gray-900 mb-4">Subscription Active</h1>
          <div className="flex justify-center mb-4">
            {getSubscriptionStatusDisplay()}
          </div>
          <p className="text-gray-600">
            Your farmer subscription is active and you have full access to all features.
          </p>
          {endDate && (
            <p className="text-sm text-gray-500 mt-2">
              Next billing date: {endDate.toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Active Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subscriptionFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
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
                <span className="text-green-600">Active</span>
              </div>
              {endDate && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Payment</span>
                  <span className="text-gray-900">
                    {endDate.toLocaleDateString('en-IN', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
              <Separator />
              <Button variant="outline" className="w-full">
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button size="lg">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl text-gray-900 mb-4">Join FarmConnect as a Farmer</h1>
        <p className="text-xl text-gray-600 mb-6">
          Start selling your organic produce directly to consumers with our farmer subscription
        </p>
        <div className="flex justify-center">
          {getSubscriptionStatusDisplay()}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Subscription Plan */}
        <div>
          <Card className="border-2 border-green-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-600 text-white px-4 py-1">
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl">Farmer Pro Plan</CardTitle>
              <div className="mt-4">
                <span className="text-4xl text-green-600">₹99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Everything you need to sell organic produce online</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                {subscriptionFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              {!showPaymentForm ? (
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setShowPaymentForm(true)}
                >
                  Subscribe Now
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setShowPaymentForm(false)}>
                  Back to Plan Details
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Form or Benefits */}
        <div>
          {showPaymentForm ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      value={paymentData.cardholderName}
                      onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                      required
                    />
                  </div>

                  <Separator />

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Farmer Pro Plan</span>
                      <span className="text-gray-900">₹99.00</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="text-gray-900">₹17.82</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-900">Total</span>
                      <span className="text-lg text-green-600">₹116.82</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Your subscription will auto-renew monthly. Cancel anytime.
                  </p>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Why Choose FarmConnect?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Direct Customer Access</h4>
                      <p className="text-gray-600 text-sm">Connect directly with customers who value organic, locally-sourced produce.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Fair Pricing</h4>
                      <p className="text-gray-600 text-sm">Set your own prices and keep more of your profits without middlemen.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Grow Your Business</h4>
                      <p className="text-gray-600 text-sm">Use our analytics and marketing tools to expand your customer base.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600">
                    "FarmConnect helped us reach customers directly and increase our revenue by 40% in just 3 months. The subscription pays for itself!"
                  </blockquote>
                  <p className="text-sm text-gray-500 mt-2">- Rajesh Kumar, Organic Valley Farm</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerSubscription;