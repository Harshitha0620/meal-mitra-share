
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { createDonation } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';
import { AuthGuard } from '@/components/layout/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Donate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    location: '',
    description: '',
    expiryDate: '',
    contactInfo: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (user) {
      createDonation({
        userId: user.id,
        userName: user.name,
        ...formData
      });
      
      navigate('/donations');
    }
    
    setIsLoading(false);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Donate Food</h1>
              <p className="mt-2 text-gray-600">
                Share your excess food with those who need it most
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Food Donation Form</CardTitle>
                <CardDescription>
                  Please fill in the details about the food you wish to donate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="foodName">Food Name</Label>
                    <Input
                      id="foodName"
                      name="foodName"
                      placeholder="e.g., Vegetable Curry, Rice, etc."
                      value={formData.foodName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      placeholder="e.g., 5 servings, 2kg, etc."
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Pickup Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Andheri East, Mumbai"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Provide details about the food, including any special storage requirements, ingredients, etc."
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Best Before Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo">Contact Information</Label>
                    <Input
                      id="contactInfo"
                      name="contactInfo"
                      placeholder="Phone number or alternate contact method"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-meal-green-600 hover:bg-meal-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Donate Food'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-meal-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-meal-green-700 mb-4">Donation Guidelines</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Make sure the food is properly packaged and safe to consume</li>
                <li>Be accurate about the expiry date and quantity</li>
                <li>Provide clear pickup instructions and contact information</li>
                <li>Respond promptly when someone contacts you about your donation</li>
                <li>If possible, include information about ingredients for allergy concerns</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Donate;
