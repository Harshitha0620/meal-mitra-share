
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { initSampleData } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  useEffect(() => {
    // Initialize sample data on first load
    initSampleData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-meal-green-500 to-meal-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Share Food, Spread Love
              </h1>
              <p className="text-xl mb-8">
                Meal Mitra connects food donors with those in need. Help us build a world where no one goes hungry.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/donate">
                  <Button className="bg-white text-meal-green-700 hover:bg-gray-100 px-8 py-6 text-lg">
                    Donate Food
                  </Button>
                </Link>
                <Link to="/request">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                    Request Food
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative h-80">
              <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-3 shadow-xl"></div>
              <div className="absolute inset-0 bg-white/20 rounded-lg transform -rotate-3 shadow-xl"></div>
              <div className="relative h-full rounded-lg bg-meal-orange-500 flex items-center justify-center p-6 shadow-xl">
                <p className="text-2xl font-bold text-center">
                  Together, we can reduce food waste and fight hunger at the same time.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-meal-green-50 p-6 rounded-lg text-center">
              <div className="w-20 h-20 bg-meal-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-4 text-meal-green-700">Donate or Request</h3>
              <p className="text-gray-600">Register on our platform and create a donation or request for food assistance.</p>
            </div>
            
            <div className="bg-meal-orange-50 p-6 rounded-lg text-center">
              <div className="w-20 h-20 bg-meal-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-4 text-meal-orange-700">Connect</h3>
              <p className="text-gray-600">Our platform connects donors with those in need based on location and requirements.</p>
            </div>
            
            <div className="bg-meal-green-50 p-6 rounded-lg text-center">
              <div className="w-20 h-20 bg-meal-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-4 text-meal-green-700">Share</h3>
              <p className="text-gray-600">Coordinate the food handover directly and make a difference in someone's life.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Impact
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-meal-green-600 mb-2">500+</div>
              <p className="text-gray-600">Meals Donated</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-meal-green-600 mb-2">200+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-meal-green-600 mb-2">50+</div>
              <p className="text-gray-600">Cities Covered</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-meal-green-600 mb-2">1000+</div>
              <p className="text-gray-600">People Fed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-meal-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community today and help us fight hunger together. Whether you want to donate food or are in need of assistance, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-meal-orange-700 hover:bg-gray-100 px-8 py-6 text-lg">
                Join Now
              </Button>
            </Link>
            <Link to="/team">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
