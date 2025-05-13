
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllDonations, FoodDonation, toggleDonationClaimed } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { toast } from "@/components/ui/use-toast";

const Donations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'available' | 'claimed'>('all');
  
  useEffect(() => {
    // Load donations
    const loadDonations = () => {
      const allDonations = getAllDonations();
      setDonations(allDonations);
    };
    
    loadDonations();
    
    // Add event listener to refresh data when storage changes
    const handleStorageChange = () => {
      loadDonations();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleToggleClaimed = (donationId: string) => {
    const updated = toggleDonationClaimed(donationId);
    if (updated) {
      setDonations(prev => 
        prev.map(donation => 
          donation.id === donationId ? { ...donation, isClaimed: updated.isClaimed } : donation
        )
      );
      
      // Create a custom event to notify other tabs/windows
      const event = new Event('storage');
      window.dispatchEvent(event);
      
      toast({
        title: updated.isClaimed ? "Donation marked as claimed" : "Donation marked as available",
        description: "Status updated successfully",
      });
    }
  };
  
  const filteredDonations = donations
    .filter(donation => {
      if (filter === 'available') return !donation.isClaimed;
      if (filter === 'claimed') return donation.isClaimed;
      return true;
    })
    .filter(donation => {
      const searchLower = searchTerm.toLowerCase();
      return (
        donation.foodName.toLowerCase().includes(searchLower) ||
        donation.location.toLowerCase().includes(searchLower) ||
        donation.description.toLowerCase().includes(searchLower) ||
        donation.userName.toLowerCase().includes(searchLower)
      );
    });
  
  // Sort donations with most recent first
  const sortedDonations = [...filteredDonations].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Available Donations</h1>
            <p className="mt-2 text-gray-600">
              Find food donations available near you
            </p>
          </div>
          
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for food, location, etc."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'bg-meal-green-600 hover:bg-meal-green-700' : ''}
                >
                  All
                </Button>
                <Button 
                  variant={filter === 'available' ? 'default' : 'outline'} 
                  onClick={() => setFilter('available')}
                  className={filter === 'available' ? 'bg-meal-green-600 hover:bg-meal-green-700' : ''}
                >
                  Available
                </Button>
                <Button 
                  variant={filter === 'claimed' ? 'default' : 'outline'} 
                  onClick={() => setFilter('claimed')}
                  className={filter === 'claimed' ? 'bg-meal-green-600 hover:bg-meal-green-700' : ''}
                >
                  Claimed
                </Button>
              </div>
            </div>
          </div>
          
          {sortedDonations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍲</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No donations found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search terms" : "Be the first to donate food!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDonations.map((donation) => (
                <Card key={donation.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{donation.foodName}</CardTitle>
                        <CardDescription className="text-sm">
                          Donated by {donation.userName}
                        </CardDescription>
                      </div>
                      <Badge 
                        className={donation.isClaimed 
                          ? "bg-gray-500" 
                          : "bg-meal-green-500"
                        }
                      >
                        {donation.isClaimed ? 'Claimed' : 'Available'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Quantity</p>
                      <p>{donation.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p>{donation.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-sm">{donation.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Best Before</p>
                        <p>{new Date(donation.expiryDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Posted</p>
                        <p>{new Date(donation.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t flex justify-between">
                    <p className="text-sm">
                      Contact: <span className="font-medium">{donation.contactInfo}</span>
                    </p>
                    {user && user.id === donation.userId && (
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleClaimed(donation.id)}
                      >
                        Mark as {donation.isClaimed ? 'Available' : 'Claimed'}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Donations;
