import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    'manager@realtywealth.com': { password: 'Manager@123', role: 'manager', redirect: '/client-dashboard' },
    'admin@realtywealth.com': { password: 'Admin@123', role: 'admin', redirect: '/employee-management' },
    'client@realtywealth.com': { password: 'Client@123', role: 'client', redirect: '/property-management' }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const credentials = mockCredentials?.[formData?.email];
      
      if (credentials && credentials?.password === formData?.password) {
        // Store user session
        localStorage.setItem('userSession', JSON.stringify({
          email: formData?.email,
          role: credentials?.role,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));
        
        navigate(credentials?.redirect);
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link has been sent to your email address.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={24} color="white" />
            </div>
          </div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your RealtyWealth account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <span className="text-sm text-destructive">{errors?.general}</span>
            </div>
          )}

          {/* Email Field */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          {/* Password Field */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1 py-0.5"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="LogIn"
            iconPosition="right"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-3">
            Demo Credentials
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="font-medium">Manager:</span>
              <span className="text-muted-foreground">manager@realtywealth.com / Manager@123</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="font-medium">Admin:</span>
              <span className="text-muted-foreground">admin@realtywealth.com / Admin@123</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="font-medium">Client:</span>
              <span className="text-muted-foreground">client@realtywealth.com / Client@123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;