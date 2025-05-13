
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imagePlaceholder: string;
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Harshitha R",
      role: "Founder & Director",
      bio: "Priya has over 10 years of experience in food policy and community service. She founded Meal Mitra to address the dual issues of food waste and hunger in urban communities.",
      imagePlaceholder: "H"
    },
    {
      name: "Bhavana",
      role: "Operations Manager",
      bio: "Vikram oversees the day-to-day operations of Meal Mitra, ensuring smooth coordination between donors and recipients. He has a background in logistics and supply chain management.",
      imagePlaceholder: "B"
    },
    {
      name: "PRANATHI",
      role: "Community Outreach",
      bio: "Ananya builds and maintains relationships with community organizations, food businesses, and volunteers. She is passionate about grassroots community development.",
      imagePlaceholder: "AG"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-meal-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Meet the passionate individuals behind Meal Mitra who are dedicated to fighting food waste and hunger.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At Meal Mitra, we believe that no one should go hungry while edible food goes to waste. 
                Our mission is to create a sustainable food sharing ecosystem that connects those with excess food to those in need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-meal-green-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-meal-green-600 mb-2">30%</div>
                <p className="text-gray-700">of food produced in India is wasted</p>
              </div>
              
              <div className="bg-meal-orange-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-meal-orange-600 mb-2">190M</div>
                <p className="text-gray-700">people in India are undernourished</p>
              </div>
              
              <div className="bg-meal-green-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-meal-green-600 mb-2">1000+</div>
                <p className="text-gray-700">meals redistributed through our platform</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Members */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              Meet Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[3/2] bg-meal-green-100 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-meal-green-600 text-white flex items-center justify-center text-3xl font-bold">
                      {member.imagePlaceholder}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-meal-green-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              Our Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="text-xl font-semibold mb-2 text-meal-green-700">Sustainability</h3>
                <p className="text-gray-600">
                  We believe in creating sustainable solutions to address food waste and hunger.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-2 text-meal-green-700">Community</h3>
                <p className="text-gray-600">
                  We foster a sense of community and mutual support through food sharing.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-xl font-semibold mb-2 text-meal-green-700">Equality</h3>
                <p className="text-gray-600">
                  We believe everyone deserves access to nutritious food regardless of their circumstances.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-2 text-meal-green-700">Safety</h3>
                <p className="text-gray-600">
                  We prioritize food safety and the wellbeing of all our users and community members.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-meal-orange-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you want to donate food, request assistance, or volunteer with us, 
              there are many ways to be part of the Meal Mitra community.
            </p>
            <div className="inline-flex rounded-md shadow">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-meal-orange-600 bg-white hover:bg-gray-50"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Team;
