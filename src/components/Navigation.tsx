import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavButton } from './NavButton';
import { ThemeToggle } from './theme/ThemeToggle';
import { 
  CheckCircle2, 
  Utensils, 
  Calendar, 
  Activity, 
  Target, 
  Settings 
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate?: () => void;
  onThemeChange?: (theme: 'morning' | 'evening') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  onNavigate,
  onThemeChange 
}) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onNavigate?.();
  };
  
  const navItems = [
    { id: 'tasks', Icon: CheckCircle2, label: 'Tasks & Chores', path: '/tasks' },
    { id: 'meals', Icon: Utensils, label: 'Meal Planning', path: '/meals' },
    { id: 'calendar', Icon: Calendar, label: 'Calendar', path: '/calendar' },
    { id: 'health', Icon: Activity, label: 'Health Tracking', path: '/health' },
    { id: 'habits', Icon: Target, label: 'Habits', path: '/habits' },
    { id: 'settings', Icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <NavButton
          key={item.id}
          Icon={item.Icon}
          label={item.label}
          isActive={activeSection === item.id}
          onClick={() => handleNavigation(item.path)}
        />
      ))}

      {onThemeChange && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="text-sm text-white/50 mb-2 px-4">Theme Preview</div>
          <ThemeToggle onThemeChange={onThemeChange} />
        </div>
      )}
    </nav>
  );
};