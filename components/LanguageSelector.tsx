import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { supportedLanguages, SupportedLanguage } from '../services/languageService';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact' | 'icon-only';
  showFlag?: boolean;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'default',
  showFlag = true,
  className = ''
}) => {
  const { currentLanguage, languageInfo, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const renderTriggerContent = () => {
    switch (variant) {
      case 'icon-only':
        return (
          <Globe className="w-4 h-4" />
        );
      
      case 'compact':
        return (
          <>
            {showFlag && <span className="text-sm">{languageInfo.flag}</span>}
            <span className="text-sm">{languageInfo.code.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3" />
          </>
        );

      default:
        return (
          <>
            <Globe className="w-4 h-4" />
            {showFlag && <span>{languageInfo.flag}</span>}
            <span className="hidden sm:inline">{languageInfo.nativeName}</span>
            <span className="sm:hidden">{languageInfo.code.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3" />
          </>
        );
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={variant === 'icon-only' ? 'icon' : 'sm'}
          className={`flex items-center space-x-2 ${variant === 'icon-only' ? 'w-10 h-10 p-2' : ''} ${className}`}
        >
          {renderTriggerContent()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isRTL ? "start" : "end"} 
        className="w-64 max-h-96 overflow-y-auto"
        side="bottom"
      >
        <div className="p-2">
          <div className="text-sm text-gray-600 mb-2 px-2">
            Select Language / भाषा चुनें
          </div>
          
          {/* Popular languages first */}
          <div className="space-y-1">
            {['en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu'].map((langCode) => {
              const lang = supportedLanguages.find(l => l.code === langCode);
              if (!lang) return null;
              
              return (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 ${
                    currentLanguage === lang.code ? 'bg-green-50 border-green-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <div className="text-sm font-medium">{lang.nativeName}</div>
                      <div className="text-xs text-gray-500">{lang.name}</div>
                    </div>
                  </div>
                  {currentLanguage === lang.code && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </div>

          {/* Separator */}
          <div className="border-t my-2"></div>
          <div className="text-xs text-gray-500 mb-2 px-2">
            Other Languages / अन्य भाषाएं
          </div>

          {/* Other languages */}
          <div className="space-y-1">
            {supportedLanguages
              .filter(lang => !['en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu'].includes(lang.code))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 ${
                    currentLanguage === lang.code ? 'bg-green-50 border-green-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <div className="text-sm font-medium">{lang.nativeName}</div>
                      <div className="text-xs text-gray-500">{lang.name}</div>
                    </div>
                  </div>
                  {currentLanguage === lang.code && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </DropdownMenuItem>
              ))}
          </div>

          {/* Language completion note */}
          <div className="border-t mt-2 pt-2">
            <div className="text-xs text-gray-500 px-2">
              {currentLanguage === 'en' 
                ? 'Some languages may have limited translations'
                : 'कुछ भाषाओं में सीमित अनुवाद हो सकते हैं'
              }
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;