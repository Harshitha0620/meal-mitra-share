
// Simple browser-based database using localStorage
import { toast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface FoodDonation {
  id: string;
  userId: string;
  userName: string;
  foodName: string;
  quantity: string;
  location: string;
  description: string;
  expiryDate: string;
  contactInfo: string;
  createdAt: string;
  isClaimed: boolean;
}

export interface FoodRequest {
  id: string;
  userId: string;
  userName: string;
  foodNeeded: string;
  quantity: string;
  location: string;
  description: string;
  urgency: "low" | "medium" | "high";
  contactInfo: string;
  createdAt: string;
  isFulfilled: boolean;
}

// Helper function to generate IDs
const generateId = (): string => Math.random().toString(36).substring(2, 15);

// Helper function to get current timestamp
const getCurrentTimestamp = (): string => new Date().toISOString();

// Initialize database if it doesn't exist
const initDB = () => {
  if (!localStorage.getItem("mealMitra_users")) {
    localStorage.setItem("mealMitra_users", JSON.stringify([]));
  }
  if (!localStorage.getItem("mealMitra_donations")) {
    localStorage.setItem("mealMitra_donations", JSON.stringify([]));
  }
  if (!localStorage.getItem("mealMitra_requests")) {
    localStorage.setItem("mealMitra_requests", JSON.stringify([]));
  }
  if (!localStorage.getItem("mealMitra_currentUser")) {
    localStorage.setItem("mealMitra_currentUser", JSON.stringify(null));
  }
};

// Initialize DB when this module loads
initDB();

// Auth functions
export const registerUser = (name: string, email: string, password: string): boolean => {
  const users: User[] = JSON.parse(localStorage.getItem("mealMitra_users") || "[]");
  if (users.find(user => user.email === email)) {
    toast({
      title: "Registration failed",
      description: "Email already exists",
      variant: "destructive"
    });
    return false;
  }

  const newUser: User = {
    id: generateId(),
    name,
    email,
    password // In a real app, we would hash the password
  };

  users.push(newUser);
  localStorage.setItem("mealMitra_users", JSON.stringify(users));
  toast({
    title: "Registration successful",
    description: "You can now log in with your credentials",
  });
  return true;
};

export const loginUser = (email: string, password: string): User | null => {
  const users: User[] = JSON.parse(localStorage.getItem("mealMitra_users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem("mealMitra_currentUser", JSON.stringify(user));
    toast({
      title: "Login successful",
      description: `Welcome back, ${user.name}!`,
    });
    return user;
  }
  
  toast({
    title: "Login failed",
    description: "Invalid email or password",
    variant: "destructive"
  });
  return null;
};

export const logoutUser = (): void => {
  localStorage.setItem("mealMitra_currentUser", JSON.stringify(null));
  toast({
    title: "Logged out",
    description: "You have been successfully logged out",
  });
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("mealMitra_currentUser");
  if (!userJson || userJson === "null") return null;
  return JSON.parse(userJson) as User;
};

// Food Donation functions
export const createDonation = (donation: Omit<FoodDonation, "id" | "createdAt" | "isClaimed">): FoodDonation => {
  const donations: FoodDonation[] = JSON.parse(localStorage.getItem("mealMitra_donations") || "[]");
  
  const newDonation: FoodDonation = {
    ...donation,
    id: generateId(),
    createdAt: getCurrentTimestamp(),
    isClaimed: false
  };
  
  donations.push(newDonation);
  localStorage.setItem("mealMitra_donations", JSON.stringify(donations));
  toast({
    title: "Donation added",
    description: "Thank you for your generosity!",
  });
  
  return newDonation;
};

export const getAllDonations = (): FoodDonation[] => {
  return JSON.parse(localStorage.getItem("mealMitra_donations") || "[]");
};

export const getUserDonations = (userId: string): FoodDonation[] => {
  const donations: FoodDonation[] = JSON.parse(localStorage.getItem("mealMitra_donations") || "[]");
  return donations.filter(donation => donation.userId === userId);
};

export const toggleDonationClaimed = (donationId: string): FoodDonation | null => {
  const donations: FoodDonation[] = JSON.parse(localStorage.getItem("mealMitra_donations") || "[]");
  const index = donations.findIndex(d => d.id === donationId);
  
  if (index !== -1) {
    donations[index].isClaimed = !donations[index].isClaimed;
    localStorage.setItem("mealMitra_donations", JSON.stringify(donations));
    return donations[index];
  }
  
  return null;
};

// Food Request functions
export const createRequest = (request: Omit<FoodRequest, "id" | "createdAt" | "isFulfilled">): FoodRequest => {
  const requests: FoodRequest[] = JSON.parse(localStorage.getItem("mealMitra_requests") || "[]");
  
  const newRequest: FoodRequest = {
    ...request,
    id: generateId(),
    createdAt: getCurrentTimestamp(),
    isFulfilled: false
  };
  
  requests.push(newRequest);
  localStorage.setItem("mealMitra_requests", JSON.stringify(requests));
  toast({
    title: "Request added",
    description: "Your request has been posted.",
  });
  
  return newRequest;
};

export const getAllRequests = (): FoodRequest[] => {
  return JSON.parse(localStorage.getItem("mealMitra_requests") || "[]");
};

export const getUserRequests = (userId: string): FoodRequest[] => {
  const requests: FoodRequest[] = JSON.parse(localStorage.getItem("mealMitra_requests") || "[]");
  return requests.filter(request => request.userId === userId);
};

export const toggleRequestFulfilled = (requestId: string): FoodRequest | null => {
  const requests: FoodRequest[] = JSON.parse(localStorage.getItem("mealMitra_requests") || "[]");
  const index = requests.findIndex(r => r.id === requestId);
  
  if (index !== -1) {
    requests[index].isFulfilled = !requests[index].isFulfilled;
    localStorage.setItem("mealMitra_requests", JSON.stringify(requests));
    return requests[index];
  }
  
  return null;
};

// Add some sample data if database is empty
export const initSampleData = () => {
  const users = JSON.parse(localStorage.getItem("mealMitra_users") || "[]");
  const donations = JSON.parse(localStorage.getItem("mealMitra_donations") || "[]");
  const requests = JSON.parse(localStorage.getItem("mealMitra_requests") || "[]");
  
  // Only add sample data if the database is empty
  if (users.length === 0 && donations.length === 0 && requests.length === 0) {
    // Add sample users
    const sampleUsers: User[] = [
      { id: "user1", name: "Rahul Sharma", email: "rahul@example.com", password: "password123" },
      { id: "user2", name: "Priya Patel", email: "priya@example.com", password: "password123" }
    ];
    localStorage.setItem("mealMitra_users", JSON.stringify(sampleUsers));
    
    // Add sample donations
    const sampleDonations: FoodDonation[] = [
      {
        id: "donation1",
        userId: "user1",
        userName: "Rahul Sharma",
        foodName: "Vegetable Biryani",
        quantity: "5 servings",
        location: "Sector 18, Noida",
        description: "Freshly made vegetable biryani. Can be picked up today.",
        expiryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        contactInfo: "9876543210",
        createdAt: getCurrentTimestamp(),
        isClaimed: false
      },
      {
        id: "donation2",
        userId: "user2",
        userName: "Priya Patel",
        foodName: "Fresh Fruits",
        quantity: "2 kg",
        location: "Bandra, Mumbai",
        description: "Assortment of fresh fruits including apples, bananas, and oranges.",
        expiryDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
        contactInfo: "8765432109",
        createdAt: getCurrentTimestamp(),
        isClaimed: false
      }
    ];
    localStorage.setItem("mealMitra_donations", JSON.stringify(sampleDonations));
    
    // Add sample requests
    const sampleRequests: FoodRequest[] = [
      {
        id: "request1",
        userId: "user2",
        userName: "Priya Patel",
        foodNeeded: "Dry Rations",
        quantity: "For 3 people",
        location: "Andheri, Mumbai",
        description: "Need basic dry rations like rice, dal, and flour for a family.",
        urgency: "medium",
        contactInfo: "8765432109",
        createdAt: getCurrentTimestamp(),
        isFulfilled: false
      },
      {
        id: "request2",
        userId: "user1",
        userName: "Rahul Sharma",
        foodNeeded: "Ready-to-eat meals",
        quantity: "10 meals",
        location: "Sector 62, Noida",
        description: "Need ready-to-eat meals for a small community shelter.",
        urgency: "high",
        contactInfo: "9876543210",
        createdAt: getCurrentTimestamp(),
        isFulfilled: false
      }
    ];
    localStorage.setItem("mealMitra_requests", JSON.stringify(sampleRequests));
  }
};
