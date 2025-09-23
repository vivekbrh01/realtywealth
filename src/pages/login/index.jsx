import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import PlatformBenefits from './components/PlatformBenefits';
import Image from '../../components/AppImage';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const session = JSON.parse(userSession);
        // Redirect based on user role
        if (session?.role === 'manager') {
          navigate('/client-dashboard');
        } else if (session?.role === 'admin') {
          navigate('/employee-management');
        } else if (session?.role === 'client') {
          navigate('/property-management');
        }
      } catch (error) {
        // Clear invalid session
        localStorage.removeItem('userSession');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">RW</span>
                </div>
                <div>
                  <h1 className="text-xl font-heading font-bold text-foreground">RealtyWealth</h1>
                  <p className="text-xs text-muted-foreground">Real Estate Wealth Management</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <span>📞</span>
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>✉️</span>
                  <span>support@realtywealth.com</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Login Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <div className="max-w-md mx-auto lg:mx-0">
                <LoginForm />
              </div>
            </div>

            {/* Right Column - Platform Benefits & Trust Signals */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Featured Image */}
              <div className="hidden lg:block">
                <div className="relative h-64 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop"
                    alt="Modern real estate office with professionals working"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-xl font-heading font-semibold mb-2">
                      Professional Real Estate Management
                    </h2>
                    <p className="text-sm opacity-90">
                      Streamline your wealth management operations with our comprehensive platform
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform Benefits - Desktop */}
              <div className="hidden lg:block">
                <PlatformBenefits />
              </div>

              {/* Trust Signals - Mobile */}
              <div className="lg:hidden">
                <TrustSignals />
              </div>
            </div>
          </div>

          {/* Trust Signals - Desktop */}
          <div className="hidden lg:block mt-12">
            <TrustSignals />
          </div>

          {/* Platform Benefits - Mobile */}
          <div className="lg:hidden mt-8">
            <PlatformBenefits />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card/80 backdrop-blur-sm border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">RW</span>
                  </div>
                  <span className="font-heading font-semibold text-foreground">RealtyWealth</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive real estate wealth management platform for Indian market professionals and investors.
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>RERA Certified</span>
                  <span>•</span>
                  <span>ISO 27001</span>
                  <span>•</span>
                  <span>RBI Compliant</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">Quick Links</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>About RealtyWealth</p>
                  <p>Privacy Policy</p>
                  <p>Terms of Service</p>
                  <p>Security & Compliance</p>
                  <p>API Documentation</p>
                </div>
              </div>

              {/* Contact & Support */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">Contact & Support</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📧 support@realtywealth.com</p>
                  <p>📞 +91 98765 43210</p>
                  <p>🏢 Mumbai, Delhi, Bangalore</p>
                  <p>⏰ 24/7 Technical Support</p>
                  <p>💬 Live Chat Available</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} RealtyWealth. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-muted-foreground">
                <span>Made in India 🇮🇳</span>
                <span>•</span>
                <span>Secure Platform</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;