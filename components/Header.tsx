import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Home, Crown, AlertTriangle, ShoppingCart, Bell, History, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import LanguageSelector from './LanguageSelector';
import { useTranslations } from '../contexts/LanguageContext';
import { User as UserType } from '../services/dataService';

interface HeaderProps {
  user: UserType | null;
  onLogout: () => void;
  cartItemCount?: number;
  unreadNotifications?: number;
  onCartClick?: () => void;
  onNotificationsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLogout, 
  cartItemCount = 0,
  unreadNotifications = 0,
  onCartClick,
  onNotificationsClick
}) => {
  const location = useLocation();
  const t = useTranslations();

  const getSubscriptionStatus = () => {
    if (!user || user.type !== 'farmer') return null;
    
    switch (user.subscriptionStatus) {
      case 'active':
        return (
          <Badge className="bg-gold/10 text-gold border-gold/20 text-xs font-metropolis font-medium">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="destructive" className="text-xs font-metropolis font-medium">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {t.farmer.subscriptionExpired}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-accent/10 text-accent border-accent/20 text-xs font-metropolis font-medium">
            {t.farmer.subscriptionPending}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs font-metropolis font-medium">
            No Plan
          </Badge>
        );
    }
  };

  const getDaysUntilExpiry = () => {
    if (!user || !user.subscriptionEndDate) return null;
    
    const endDate = new Date(user.subscriptionEndDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <header className="bg-card/95 backdrop-blur-md shadow-premium border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-premium rounded-2xl flex items-center justify-center shadow-premium group-hover:scale-105 transition-transform duration-200">
                <Leaf className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-metropolis text-2xl font-bold text-foreground text-heading">{t.landing.title}</span>
                <span className="text-xs text-muted-foreground font-metropolis">{t.landing.subtitle}</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            {user?.type === 'farmer' && (
              <>
                <Link
                  to="/farmer-dashboard"
                  className={`font-metropolis text-base font-medium transition-colors duration-200 hover:text-primary ${
                    location.pathname === '/farmer-dashboard' 
                      ? 'text-primary border-b-2 border-primary pb-1' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {t.nav.dashboard}
                </Link>
                <Link
                  to="/orders"
                  className={`font-metropolis text-base font-medium transition-colors duration-200 hover:text-primary ${
                    location.pathname === '/orders' 
                      ? 'text-primary border-b-2 border-primary pb-1' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {t.nav.orders}
                </Link>
                {user.subscriptionStatus !== 'active' && (
                  <Link
                    to="/farmer-subscription"
                    className={`font-metropolis text-base font-medium transition-colors duration-200 hover:text-gold ${
                      location.pathname === '/farmer-subscription' 
                        ? 'text-gold border-b-2 border-gold pb-1' 
                        : 'text-gold/70'
                    }`}
                  >
                    {t.farmer.subscription}
                  </Link>
                )}
              </>
            )}
            
            {user?.type === 'consumer' && (
              <>
                <Link
                  to="/marketplace"
                  className={`font-metropolis text-base font-medium transition-colors duration-200 hover:text-primary ${
                    location.pathname === '/marketplace' 
                      ? 'text-primary border-b-2 border-primary pb-1' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {t.nav.marketplace}
                </Link>
                <Link
                  to="/orders"
                  className={`font-metropolis text-base font-medium transition-colors duration-200 hover:text-primary ${
                    location.pathname === '/orders' 
                      ? 'text-primary border-b-2 border-primary pb-1' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {t.orders.orderHistory}
                </Link>
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector variant="compact" />

            {user ? (
              <>
                {/* Consumer Actions */}
                {user.type === 'consumer' && (
                  <>
                    {/* Shopping Cart */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onCartClick}
                      className="relative hover:bg-primary/5 border-border font-metropolis font-medium"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartItemCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 text-xs bg-primary font-metropolis font-medium">
                          {cartItemCount > 99 ? '99+' : cartItemCount}
                        </Badge>
                      )}
                    </Button>
                  </>
                )}

                {/* Notifications */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNotificationsClick}
                  className="relative hover:bg-primary/5 border-border font-metropolis font-medium"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 text-xs bg-destructive font-metropolis font-medium">
                      {unreadNotifications > 99 ? '99+' : unreadNotifications}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-3 px-4 py-2 h-auto border-border hover:bg-primary/5 font-metropolis font-medium">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="hidden sm:block font-medium">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0 border-border shadow-premium-lg">
                    {/* User Info */}
                    <div className="p-6 border-b border-border bg-muted/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <User className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-metropolis text-lg font-semibold text-foreground truncate text-heading">{user.name}</p>
                          <p className="text-sm text-muted-foreground truncate font-body">{user.email}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <Badge variant="outline" className="text-xs font-metropolis font-medium">
                              {user.type === 'farmer' ? t.auth.farmer : t.auth.consumer}
                            </Badge>
                            {user.type === 'farmer' && getSubscriptionStatus()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Subscription Warning */}
                      {user.type === 'farmer' && getDaysUntilExpiry() && getDaysUntilExpiry()! <= 7 && getDaysUntilExpiry()! > 0 && (
                        <div className="mt-4 p-3 bg-gold/10 rounded-lg border border-gold/20">
                          <p className="text-sm text-gold font-metropolis font-medium">
                            <AlertTriangle className="w-4 h-4 inline mr-2" />
                            {t.farmer.subscriptionExpiring} {getDaysUntilExpiry()} days
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {user.type === 'farmer' ? (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/farmer-dashboard" className="flex items-center px-6 py-3 font-metropolis font-medium">
                              <Crown className="w-5 h-5 mr-3" />
                              {t.nav.dashboard}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/orders" className="flex items-center px-6 py-3 font-metropolis font-medium">
                              <History className="w-5 h-5 mr-3" />
                              {t.nav.orders}
                            </Link>
                          </DropdownMenuItem>
                          {user.subscriptionStatus !== 'active' && (
                            <DropdownMenuItem asChild>
                              <Link to="/farmer-subscription" className="flex items-center px-6 py-3 text-gold font-metropolis font-medium">
                                <AlertTriangle className="w-5 h-5 mr-3" />
                                {t.farmer.subscription}
                              </Link>
                            </DropdownMenuItem>
                          )}
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/marketplace" className="flex items-center px-6 py-3 font-metropolis font-medium">
                              <Home className="w-5 h-5 mr-3" />
                              {t.nav.marketplace}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/orders" className="flex items-center px-6 py-3 font-metropolis font-medium">
                              <History className="w-5 h-5 mr-3" />
                              {t.orders.orderHistory}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={onCartClick} className="px-6 py-3 font-metropolis font-medium">
                            <ShoppingCart className="w-5 h-5 mr-3" />
                            {t.nav.cart} ({cartItemCount})
                          </DropdownMenuItem>
                        </>
                      )}
                    </div>

                    <DropdownMenuSeparator className="mx-6" />
                    
                    <div className="py-2">
                      <DropdownMenuItem onClick={onLogout} className="px-6 py-3 text-destructive font-metropolis font-medium">
                        <LogOut className="w-5 h-5 mr-3" />
                        {t.nav.logout}
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-primary hover:bg-primary/90 font-metropolis font-medium px-6 py-2 h-auto shadow-premium">
                  {t.nav.login}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;