import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Users, CreditCard, AlertCircle, Leaf } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useLanguage } from '../contexts/LanguageContext';
import { User as UserType } from '../services/dataService';
import LanguageSelector from './LanguageSelector';

interface LoginProps {
  onLogin: (email: string, password: string, userData?: Omit<UserType, 'id' | 'joinedDate' | 'lastLogin'>) => Promise<boolean>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t: translations, isRTL, formatCurrency, isLoading } = useLanguage();
  const [activeTab, setActiveTab] = useState('consumer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show loading state while translations are loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-premium rounded-3xl flex items-center justify-center animate-pulse">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="text-center">
            <div className="w-32 h-4 bg-muted rounded animate-pulse mb-2"></div>
            <div className="w-24 h-3 bg-muted/60 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Ensure translations object exists
  if (!translations || !translations.auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-premium rounded-3xl flex items-center justify-center mb-6 mx-auto">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-metropolis text-3xl font-semibold text-foreground mb-4 text-heading">Loading...</h1>
          <p className="text-muted-foreground font-body">Initializing FarmConnect</p>
        </div>
      </div>
    );
  }

  const t = translations;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        // Registration
        const userData: Omit<UserType, 'id' | 'joinedDate' | 'lastLogin'> = {
          name: name || (activeTab === 'farmer' ? 'Demo Farmer' : 'Demo Consumer'),
          email,
          type: activeTab as 'farmer' | 'consumer',
          location: location || (activeTab === 'farmer' ? 'Punjab, India' : 'Mumbai, India'),
          phone,
          subscriptionStatus: activeTab === 'farmer' ? 'none' : undefined
        };

        await onLogin(email, password, userData);
      } else {
        // Login
        await onLogin(email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (type: 'farmer' | 'consumer') => {
    setLoading(true);
    try {
      if (type === 'farmer') {
        await onLogin('demo@greenvalley.com', 'password');
      } else {
        await onLogin('consumer@example.com', 'password');
      }
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-lg relative">
        {/* Language Selector */}
        <div className="flex justify-center mb-8">
          <LanguageSelector variant="default" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-premium rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-premium-lg">
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-metropolis text-4xl font-bold text-foreground mb-3 text-heading">{t.auth.welcome}</h1>
          <p className="text-xl text-muted-foreground font-metropolis">{t.landing.subtitle}</p>
        </div>

        <Card className="shadow-premium-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-center font-metropolis text-2xl font-semibold text-heading">
              {isSignup ? t.auth.signupTitle : t.auth.loginTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 h-12">
                <TabsTrigger value="consumer" className="flex items-center space-x-2 font-metropolis font-medium data-[state=active]:bg-card data-[state=active]:shadow-premium">
                  <User className="w-4 h-4" />
                  <span>{t.auth.consumer}</span>
                </TabsTrigger>
                <TabsTrigger value="farmer" className="flex items-center space-x-2 font-metropolis font-medium data-[state=active]:bg-card data-[state=active]:shadow-premium">
                  <Users className="w-4 h-4" />
                  <span>{t.auth.farmer}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="consumer" className="mt-6">
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-accent-foreground text-center font-metropolis leading-relaxed">
                    {t.auth.consumerDescription}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="farmer" className="mt-6">
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-primary-foreground text-center font-metropolis leading-relaxed">
                      {t.auth.farmerDescription}
                    </p>
                  </div>
                  {isSignup && (
                    <Alert className="border-gold/20 bg-gold/10">
                      <CreditCard className="h-4 w-4 text-gold" />
                      <AlertDescription className="text-gold font-metropolis">
                        {t.auth.subscriptionNote}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignup && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-metropolis text-base font-medium">
                      {activeTab === 'farmer' ? t.auth.farmName : t.auth.name}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={activeTab === 'farmer' 
                        ? (isRTL ? 'اپنے کھیت کا نام درج کریں' : 'Enter your farm name')
                        : (isRTL ? 'اپنا پورا نام درج کریں' : 'Enter your full name')
                      }
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className="h-12 bg-input-background border-border font-metropolis text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-metropolis text-base font-medium">{t.auth.location}</Label>
                    <Input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={isRTL ? 'اپنا مقام درج کریں' : 'Enter your location'}
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className="h-12 bg-input-background border-border font-metropolis text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-metropolis text-base font-medium">{t.auth.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={isRTL ? 'اپنا فون نمبر درج کریں' : 'Enter your phone number'}
                      required
                      dir="ltr"
                      className="h-12 bg-input-background border-border font-metropolis text-base"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="font-metropolis text-base font-medium">{t.auth.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRTL ? 'اپنا ای میل درج کریں' : 'Enter your email'}
                  required
                  dir="ltr"
                  className="h-12 bg-input-background border-border font-metropolis text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-metropolis text-base font-medium">{t.auth.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRTL ? 'اپنا پاس ورڈ درج کریں' : 'Enter your password'}
                  required
                  dir="ltr"
                  className="h-12 bg-input-background border-border font-metropolis text-base"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 font-metropolis font-medium text-base shadow-premium" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>{t.common.loading}</span>
                  </div>
                ) : (
                  isSignup ? 
                    (activeTab === 'farmer' 
                      ? (isRTL ? 'اکاؤنٹ بنائیں اور سبسکرپشن لیں' : 'Create Account & Subscribe')
                      : t.auth.signupTitle
                    ) : 
                    t.auth.loginTitle
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-sm text-primary hover:text-primary/80 font-metropolis font-medium transition-colors"
                disabled={loading}
              >
                {isSignup ? t.auth.alreadyHaveAccount : t.auth.dontHaveAccount}
              </button>
            </div>

            {activeTab === 'farmer' && isSignup && (
              <div className="mt-6 p-4 bg-gold/5 rounded-lg border border-gold/20">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gold font-metropolis space-y-2">
                    <p>
                      {isRTL 
                        ? 'اکاؤنٹ بنانے کے بعد، آپ کو کسان پلان کی سدستری کے لیے بھیجا جائے گا۔'
                        : 'After creating your account, you\'ll be redirected to subscribe to our farmer plan.'
                      }
                    </p>
                    <p className="font-medium">
                      {isRTL 
                        ? '7 دن کی مفت آزمائش شروع کریں، پھر ₹99/ماہ۔'
                        : 'Start with 7-day free trial, then ₹99/month.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4 font-metropolis">
                {isRTL ? 'ڈیمو رسائی' : 'Try Demo Access'}
              </p>
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-accent text-accent hover:bg-accent/10 font-metropolis font-medium"
                  onClick={() => handleDemoLogin('consumer')}
                  disabled={loading}
                >
                  {isRTL ? 'صارف کے طور پر ڈیمو' : 'Demo as Consumer'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-primary text-primary hover:bg-primary/10 font-metropolis font-medium"
                  onClick={() => handleDemoLogin('farmer')}
                  disabled={loading}
                >
                  {isRTL 
                    ? 'کسان کے طور پر ڈیمو (فعال سبسکرپشن)'
                    : 'Demo as Farmer (Active Subscription)'
                  }
                </Button>
              </div>
            </div>

            {/* Multi-language welcome message */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-center text-xs text-muted-foreground space-y-2 font-metropolis">
                <p>🇮🇳 भारत के सभी क्षेत्रीय भाषाओं में उपलब्ध</p>
                <p>Available in all Indian regional languages</p>
                {isRTL && <p>تمام ہندوستانی علاقائی زبانوں میں دستیاب</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;