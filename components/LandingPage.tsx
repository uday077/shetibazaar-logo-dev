import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, ShoppingCart, Leaf, Star, MapPin, Shield, Award, TrendingUp, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useTranslations, useLanguage } from '../contexts/LanguageContext';

const LandingPage: React.FC = () => {
  const t = useTranslations();
  const { isRTL } = useLanguage();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: t.landing.features.directConnect,
      description: isRTL ? 'بغیر کسی درمیانی کے براہ راست کسانوں سے جڑیں' : 'Connect with passionate farmers who care about quality and sustainability'
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: t.landing.features.freshProduce,
      description: isRTL ? 'تازہ اور صحت مند نامیاتی اجناس' : 'Farm-fresh organic produce harvested at peak ripeness'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: t.landing.features.fairPrices,
      description: isRTL ? 'کسانوں اور صارفین دونوں کے لیے منصفانہ قیمتیں' : 'Transparent pricing that benefits both farmers and consumers'
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: t.landing.features.organicCertified,
      description: isRTL ? 'تمام مصنوعات کی جانچ اور تصدیق' : 'Rigorously verified organic certifications and quality standards'
    }
  ];

  const testimonials = [
    {
      name: isRTL ? 'راجیش کمار' : 'राजेश कुमार',
      nameEn: 'Rajesh Kumar',
      role: isRTL ? 'نامیاتی کسان' : 'जैविक किसान',
      roleEn: 'Organic Farmer',
      location: isRTL ? 'پنجاب، بھارت' : 'पंजाब, भारत',
      locationEn: 'Punjab, India',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      content: isRTL 
        ? 'فارم کنیکٹ نے مجھے اپنی پیداوار براہ راست صارفین کو بیچنے میں مدد کی ہے۔' 
        : 'FarmConnect ने मुझे अपनी उपज सीधे उपभोक्ताओं को बेचने में मदद की है। अब मुझे बेहतर कीमت मिलती है।',
      contentEn: 'FarmConnect has helped me connect directly with customers who truly value organic farming. My income has increased by 40%.',
      rating: 5
    },
    {
      name: isRTL ? 'سنیتا شرما' : 'सुनीता शर्मा',
      nameEn: 'Sunita Sharma',
      role: isRTL ? 'صارف' : 'उपभोक्ता',
      roleEn: 'Health Conscious Consumer',
      location: isRTL ? 'دلی، بھارت' : 'दिल्ली, भारत',
      locationEn: 'Delhi, India',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=200&h=200&fit=crop&crop=face',
      content: isRTL 
        ? 'مجھے یہاں بہترین کوالٹی کے نامیاتی پھل اور سبزیاں ملتی ہیں۔' 
        : 'मुझे यहां सबसे अच्छी गुणवत्ता के जैविक फल और सब्जियां मिलती हैं। स्वाद भी बेहतरीन है।',
      contentEn: 'The quality and freshness of produce here is exceptional. I can taste the difference that organic farming makes.',
      rating: 5
    },
    {
      name: isRTL ? 'امیت پٹیل' : 'अमित पटेल',
      nameEn: 'Amit Patel',
      role: isRTL ? 'کسان' : 'किसान',
      roleEn: 'Sustainable Farmer',
      location: isRTL ? 'گجرات، بھارت' : 'गुजरात, भारत',
      locationEn: 'Gujarat, India',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      content: isRTL 
        ? 'یہ پلیٹ فارم نے میری زندگی بدل دی ہے۔' 
        : 'इस प्लेटफॉर्म ने मेरी जिंदगी बदल दी है। अब मैं अपने परिवार का बेहतर खयाल रख सकता हूं।',
      contentEn: 'This platform has transformed my farming business. I now have a stable income and direct relationships with customers.',
      rating: 5
    }
  ];

  const stats = [
    { number: '2,500+', label: isRTL ? 'کسان' : 'Farmers', labelHi: 'किसान' },
    { number: '15,000+', label: isRTL ? 'خوش صارف' : 'Happy Customers', labelHi: 'खुश ग्राहक' },
    { number: '50+', label: isRTL ? 'شہر' : 'Cities', labelHi: 'शहर' },
    { number: '98%', label: isRTL ? 'اطمینان کی شرح' : 'Satisfaction Rate', labelHi: 'संतुष्टि दर' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-secondary/30 to-muted/50 pt-20 pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-8 px-6 py-2 bg-gold/10 text-gold border-gold/20 font-ui text-sm font-medium text-ui">
              🌱 {isRTL ? 'بھارت کا سب سے بڑا نامیاتی بازار' : 'India\'s Premier Organic Marketplace'}
            </Badge>
            
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-tight text-display text-[64px]">
              {t.landing.heroTitle}
            </h1>
            
            <p className="lead text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-body text-body">
              {t.landing.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/login">
                <Button size="lg" className="text-lg px-10 py-4 h-auto bg-primary hover:bg-primary/90 font-ui font-medium shadow-premium text-ui">
                  {t.landing.getStarted}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-3 rotate-180' : 'ml-3'}`} />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-10 py-4 h-auto border-2 font-ui font-medium text-ui">
                {t.landing.learnMore}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2 text-display">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-body text-body">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-semibold text-foreground mb-6 text-heading">
              {isRTL ? 'کیوں FarmConnect چیوں؟' : 'Why Choose FarmConnect?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body text-body">
              {isRTL ? 'کسانوں اور صارفین کے لیے بہترین پلیٹ فارم' : 'Connecting conscious consumers with passionate organic farmers across India'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-premium-lg transition-all duration-300 border-0 bg-background hover-lift">
                <CardContent className="p-0">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4 text-heading">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-body text-body">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-semibold text-foreground mb-6 text-heading">
              {isRTL ? 'آپ کے لیے بنایا گیا' : 'Built for Everyone'}
            </h2>
            <p className="text-xl text-muted-foreground font-body text-body">
              {isRTL ? 'کسان ہوں یا صارف، ہم آپ کی ضروریات پوری کرتے ہیں' : 'Whether you\'re a farmer or consumer, we have the perfect solution for you'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* For Farmers */}
            <Card className="p-10 hover:shadow-premium-lg transition-all duration-300 border-0 bg-card hover-lift">
              <CardContent className="p-0">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl font-semibold text-foreground text-heading">{t.landing.forFarmers}</h3>
                    <Badge className="bg-gold/10 text-gold border-gold/20 mt-3 font-ui font-medium text-ui">
                      {isRTL ? '₹۹۹/ماہ' : '₹99/month'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-body text-body">
                  {t.auth.farmerDescription}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    isRTL ? 'لامحدود مصنوعات کی فہرست' : 'List unlimited organic products',
                    isRTL ? 'براہ راست صارف رابطہ' : 'Direct customer communication',
                    isRTL ? 'تجزیات اور رپورٹس' : 'Analytics and insights',
                    isRTL ? 'فیچرڈ پروفائل' : 'Featured profile placement'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-foreground font-body text-body">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/login">
                  <Button className="w-full bg-primary hover:bg-primary/90 font-ui font-medium text-lg py-3 text-ui">
                    {isRTL ? 'کسان کے طور پر شروع کریں' : 'Start as a Farmer'}
                    <TrendingUp className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* For Consumers */}
            <Card className="p-10 hover:shadow-premium-lg transition-all duration-300 border-0 bg-card hover-lift">
              <CardContent className="p-0">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center">
                    <ShoppingCart className="w-10 h-10 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl font-semibold text-foreground text-heading">{t.landing.forConsumers}</h3>
                    <Badge className="bg-accent/10 text-accent border-accent/20 mt-3 font-ui font-medium text-ui">
                      {isRTL ? 'مفت رجسٹریشن' : 'Free Registration'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-body text-body">
                  {t.auth.consumerDescription}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    isRTL ? 'تازہ نامیاتی پیداوار' : 'Fresh organic produce',
                    isRTL ? 'گھر پر ڈلیوری' : 'Home delivery',
                    isRTL ? 'محفوظ ادائیگی' : 'Secure payments',
                    isRTL ? 'کسانوں سے ملاقات' : 'Meet your farmers'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                      <span className="text-foreground font-body text-body">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/login">
                  <Button variant="outline" className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-ui font-medium text-lg py-3 text-ui">
                    {isRTL ? 'خریداری شروع کریں' : 'Start Shopping'}
                    <Heart className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-semibold text-foreground mb-6 text-heading">
              {isRTL ? 'ہمارے صارفین کیا کہتے ہیں' : 'Stories from Our Community'}
            </h2>
            <p className="text-xl text-muted-foreground font-body text-body">
              {isRTL ? 'حقیقی تجربات، حقیقی نتائج' : 'Real experiences from farmers and consumers across India'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-premium-lg transition-all duration-300 border-0 bg-background hover-lift">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/10"
                    />
                    <div>
                      <h4 className="font-subheading text-lg font-semibold text-foreground text-subheading">{testimonial.nameEn}</h4>
                      <p className="text-sm text-muted-foreground font-body text-body">{testimonial.roleEn}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-body text-body">{testimonial.locationEn}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-foreground leading-relaxed mb-6 italic font-body text-body">
                    "{testimonial.contentEn}"
                  </p>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-6 sm:px-8 lg:px-12 relative">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-8 text-display">
            {isRTL ? 'آج ہی شروع کریں' : 'Join the Revolution'}
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed font-body text-body">
            {isRTL 
              ? 'تازہ، نامیاتی پیداوار کی دنیا میں شامل ہوں' 
              : 'Be part of India\'s organic farming revolution. Connect, trade, and grow sustainably.'
            }
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-ui font-medium text-xl px-12 py-4 h-auto shadow-premium-lg text-ui">
              {t.landing.getStarted}
              <ArrowRight className={`w-6 h-6 ${isRTL ? 'mr-3 rotate-180' : 'ml-3'}`} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;