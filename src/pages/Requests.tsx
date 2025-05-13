
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
import { getAllRequests, FoodRequest, toggleRequestFulfilled } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { toast } from "@/components/ui/use-toast";

const Requests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<FoodRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'fulfilled'>('all');
  
  useEffect(() => {
    // Load requests
    const loadRequests = () => {
      const allRequests = getAllRequests();
      setRequests(allRequests);
    };
    
    loadRequests();
    
    // Add event listener to refresh data when storage changes
    const handleStorageChange = () => {
      loadRequests();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleToggleFulfilled = (requestId: string) => {
    const updated = toggleRequestFulfilled(requestId);
    if (updated) {
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId ? { ...request, isFulfilled: updated.isFulfilled } : request
        )
      );
      
      // Create a custom event to notify other tabs/windows
      const event = new Event('storage');
      window.dispatchEvent(event);
      
      toast({
        title: updated.isFulfilled ? "Request marked as fulfilled" : "Request marked as open",
        description: "Status updated successfully",
      });
    }
  };
  
  const filteredRequests = requests
    .filter(request => {
      if (filter === 'open') return !request.isFulfilled;
      if (filter === 'fulfilled') return request.isFulfilled;
      return true;
    })
    .filter(request => {
      const searchLower = searchTerm.toLowerCase();
      return (
        request.foodNeeded.toLowerCase().includes(searchLower) ||
        request.location.toLowerCase().includes(searchLower) ||
        request.description.toLowerCase().includes(searchLower) ||
        request.userName.toLowerCase().includes(searchLower)
      );
    });
  
  // Sort requests with most recent first and high urgency at top
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    // First sort by fulfilled status
    if (a.isFulfilled !== b.isFulfilled) {
      return a.isFulfilled ? 1 : -1;
    }
    
    // Then sort by urgency for non-fulfilled requests
    if (!a.isFulfilled && !b.isFulfilled) {
      const urgencyOrder = { high: 0, medium: 1, low: 2 };
      if (a.urgency !== b.urgency) {
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      }
    }
    
    // Finally sort by date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-meal-orange-500';
      case 'low':
        return 'bg-meal-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Food Requests</h1>
            <p className="mt-2 text-gray-600">
              Help fulfill food requests from people in need
            </p>
          </div>
          
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for food needs, location, etc."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'bg-meal-orange-500 hover:bg-meal-orange-600' : ''}
                >
                  All
                </Button>
                <Button 
                  variant={filter === 'open' ? 'default' : 'outline'} 
                  onClick={() => setFilter('open')}
                  className={filter === 'open' ? 'bg-meal-orange-500 hover:bg-meal-orange-600' : ''}
                >
                  Open
                </Button>
                <Button 
                  variant={filter === 'fulfilled' ? 'default' : 'outline'} 
                  onClick={() => setFilter('fulfilled')}
                  className={filter === 'fulfilled' ? 'bg-meal-orange-500 hover:bg-meal-orange-600' : ''}
                >
                  Fulfilled
                </Button>
              </div>
            </div>
          </div>
          
          {sortedRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No requests found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search terms" : "All current requests have been fulfilled!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{request.foodNeeded}</CardTitle>
                        <CardDescription className="text-sm">
                          Requested by {request.userName}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        {!request.isFulfilled && (
                          <Badge className={getUrgencyColor(request.urgency)}>
                            {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Urgency
                          </Badge>
                        )}
                        <Badge 
                          className={request.isFulfilled 
                            ? "bg-gray-500" 
                            : "bg-blue-500"
                          }
                        >
                          {request.isFulfilled ? 'Fulfilled' : 'Open'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Quantity</p>
                      <p>{request.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p>{request.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-sm">{request.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Posted</p>
                      <p>{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t flex justify-between">
                    <p className="text-sm">
                      Contact: <span className="font-medium">{request.contactInfo}</span>
                    </p>
                    {user && user.id === request.userId && (
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFulfilled(request.id)}
                      >
                        Mark as {request.isFulfilled ? 'Open' : 'Fulfilled'}
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

export default Requests;
