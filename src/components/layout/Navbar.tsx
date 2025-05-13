
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Donate Food', href: '/donate' },
    { name: 'Request Food', href: '/request' },
    { name: 'View Donations', href: '/donations' },
    { name: 'View Requests', href: '/requests' },
    { name: 'Our Team', href: '/team' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-meal-green-600 font-bold text-2xl">Meal</span>
              <span className="text-meal-orange-500 font-bold text-2xl">Mitra</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.href
                    ? 'text-meal-green-700 bg-meal-green-50'
                    : 'text-gray-600 hover:text-meal-green-600 hover:bg-meal-green-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-meal-green-600 text-sm">
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <Button 
                  variant="outline" 
                  className="ml-4 text-meal-orange-500 border-meal-orange-500 hover:bg-meal-orange-50"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="text-meal-green-600 border-meal-green-600 hover:bg-meal-green-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-meal-green-600 hover:bg-meal-green-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-meal-green-500 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href
                    ? 'text-meal-green-700 bg-meal-green-50'
                    : 'text-gray-600 hover:text-meal-green-600 hover:bg-meal-green-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3">
                    <p className="text-meal-green-600 font-medium">
                      Hi, {user?.name.split(' ')[0]}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-meal-orange-500 hover:text-meal-orange-700 hover:bg-meal-orange-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-meal-green-600 hover:text-meal-green-700 hover:bg-meal-green-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-meal-green-600 hover:text-meal-green-700 hover:bg-meal-green-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
