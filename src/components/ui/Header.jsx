import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Clients',
      path: '/client-dashboard',
      icon: 'Users',
      tooltip: 'Client management and portfolio oversight'
    },
    {
      label: 'Properties',
      path: '/property-management',
      icon: 'Building2',
      tooltip: 'Property portfolio management and operations'
    },
    {
      label: 'Onboarding',
      path: '/client-onboarding',
      icon: 'UserPlus',
      tooltip: 'New client registration and setup'
    },
    {
      label: 'Administration',
      path: '/employee-management',
      icon: 'Settings',
      tooltip: 'Team and operational management'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
    setIsProfileOpen(false);
  };

  const defaultUser = {
    name: 'Rajesh Kumar',
    role: 'Portfolio Manager',
    email: 'rajesh.kumar@realtywealth.com',
    avatar: null
  };

  const currentUser = user || defaultUser;

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-[1000] shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Building2" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              RealtyWealth
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-secondary-foreground">
                  {currentUser?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-medium text-foreground">{currentUser?.name}</div>
                <div className="text-xs text-muted-foreground">{currentUser?.role}</div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-md shadow-elevation-3 z-[1010]">
                <div className="p-4 border-b border-border">
                  <div className="text-sm font-medium text-popover-foreground">{currentUser?.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser?.email}</div>
                  <div className="text-xs text-muted-foreground mt-1">{currentUser?.role}</div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-sm transition-smooth"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-sm transition-smooth"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>
                  <div className="border-t border-border my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-muted rounded-sm transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-2 z-[1020]">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-[1015] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Overlay for profile dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-[1005]"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;