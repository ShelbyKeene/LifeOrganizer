import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Menu, X } from 'lucide-react';
import { PageHeader } from './Typography';
import { useUserSettings } from '../contexts/UserSettingsContext';
import { Greeting } from './Greeting';

interface LayoutProps {
  children: React.ReactNode;
  onThemeChange?: (theme: 'morning' | 'afternoon' | 'evening' | null) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onThemeChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useUserSettings();

  return (
    <div className="min-h-screen max-h-screen overflow-hidden">
      <div className="h-screen flex">
        {/* Navigation Sidebar */}
        <aside
          className={`
            fixed lg:relative
            w-64 flex-shrink-0
            transition-all duration-300 ease-in-out
            z-30 lg:z-auto
            ${isMenuOpen ? 'left-0' : '-left-64 lg:left-0'}
            top-0 h-screen
            bg-white/5 backdrop-blur-sm
          `}
        >
          <div className="h-full overflow-y-auto scrollbar-hide p-4">
            <Navigation
              activeSection={location.pathname.slice(1) || 'tasks'}
              onNavigate={() => setIsMenuOpen(false)}
              onThemeChange={onThemeChange}
            />
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Section */}
          <header className="flex-shrink-0 px-6 py-4 lg:py-6">
            <div className="container mx-auto relative">
              <div className="flex items-center justify-between lg:justify-center">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>

                {/* Centered Title and Subtitle */}
                <div className="text-center">
                  <PageHeader className="text-3xl md:text-4xl lg:text-5xl mb-1">
                    Life Organizer
                  </PageHeader>
                  <Greeting
                    name={settings.name}
                    className="text-sm md:text-base lg:text-lg"
                  />
                </div>

                {/* Empty div to maintain centering */}
                <div className="w-10 lg:hidden"></div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pb-6 px-6 scrollbar-hide">
            <div className="container mx-auto animate-fadeIn">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};