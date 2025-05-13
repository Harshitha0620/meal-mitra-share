
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createRequest } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';
import { AuthGuard } from '@/components/layout/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Request = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    foodNeeded: '',
    quantity: '',
    location: '',
    description: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    contactInfo: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      urgency: value as 'low' | 'medium' | 'high'
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (user) {
      createRequest({
        userId: user.id,
        userName: user.name,
        ...formData
      });
      
      navigate('/requests');
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
              <h1 className="text-3xl font-bold text-gray-800">Request Food</h1>
              <p className="mt-2 text-gray-600">
                Let us know what food assistance you need
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Food Request Form</CardTitle>
                <CardDescription>
                  Please fill in the details about the food assistance you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="foodNeeded">Food Needed</Label>
                    <Input
                      id="foodNeeded"
                      name="foodNeeded"
                      placeholder="e.g., Cooked meals, Dry rations, etc."
                      value={formData.foodNeeded}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      placeholder="e.g., For 5 people, 2kg rice, etc."
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Dadar, Mumbai"
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
                      placeholder="Provide additional details about your food request"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select
                      value={formData.urgency}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Within a week</SelectItem>
                        <SelectItem value="medium">Medium - Within a few days</SelectItem>
                        <SelectItem value="high">High - Urgent, today or tomorrow</SelectItem>
                      </SelectContent>
                    </Select>
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
                      className="w-full bg-meal-orange-500 hover:bg-meal-orange-600"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-meal-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-meal-orange-700 mb-4">Request Guidelines</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Be specific about the type and quantity of food needed</li>
                <li>Provide accurate location information for easier coordination</li>
                <li>Indicate the urgency level appropriately</li>
                <li>Provide working contact information so donors can reach you</li>
                <li>Update your request if it has been fulfilled or is no longer needed</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Request;
