
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-10 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-meal-green-600 font-bold text-2xl">Meal</span>
              <span className="text-meal-orange-500 font-bold text-2xl">Mitra</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Connecting food donors with those in need. Together we can reduce food waste and hunger.
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MealMitra. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-gray-700 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-meal-green-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-600 hover:text-meal-green-600">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-gray-600 hover:text-meal-green-600">
                  Request Food
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-600 hover:text-meal-green-600">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-700 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Email:</span> info@mealmitra.org
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Phone:</span> +91 9876543210
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Address:</span> Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-6">
          <p className="text-sm text-gray-500 text-center">
            Made with ❤️ to fight hunger and reduce food waste
          </p>
        </div>
      </div>
    </footer>
  );
};
