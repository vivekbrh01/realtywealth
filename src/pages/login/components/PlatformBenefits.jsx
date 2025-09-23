import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlatformBenefits = () => {
  const benefits = [
    {
      id: 1,
      title: 'Comprehensive Portfolio Management',
      description: 'Manage multiple client portfolios with real-time analytics and performance tracking across all property investments.',
      icon: 'TrendingUp',
      color: 'text-primary'
    },
    {
      id: 2,
      title: 'Streamlined Workflows',
      description: 'Automated processes for client onboarding, property transactions, and maintenance management reduce manual work.',
      icon: 'Workflow',
      color: 'text-secondary'
    },
    {
      id: 3,
      title: 'Regulatory Compliance',
      description: 'Built-in compliance tracking for RERA, GST, and other Indian real estate regulations ensures legal adherence.',
      icon: 'FileCheck',
      color: 'text-success'
    },
    {
      id: 4,
      title: 'Mobile-First Design',
      description: 'Access client data, property information, and transaction status from anywhere with responsive mobile interface.',
      icon: 'Smartphone',
      color: 'text-accent'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Senior Portfolio Manager',
      company: 'Mumbai Realty Solutions',
      content: `RealtyWealth has transformed how we manage our client portfolios. The automation features have reduced our processing time by 60% while improving client satisfaction.`,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Real Estate Consultant',
      company: 'Delhi Property Advisors',
      content: `The compliance tracking features are exceptional. We never miss regulatory deadlines and our clients appreciate the transparency in all transactions.`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const keyFeatures = [
    'Multi-client portfolio dashboard',
    'Automated compliance tracking',
    'Real-time property analytics',
    'Mobile workflow management',
    'Integrated document management',
    'Client communication portal'
  ];

  return (
    <div className="space-y-8">
      {/* Platform Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">RealtyWealth Platform</h3>
            <p className="text-sm text-muted-foreground">Complete real estate wealth management solution</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Streamline your real estate operations with our comprehensive platform designed specifically for Indian market requirements and regulatory compliance.
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          {keyFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Key Benefits */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Why Choose RealtyWealth?
        </h3>
        
        <div className="space-y-4">
          {benefits?.map((benefit) => (
            <div key={benefit?.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mt-0.5">
                <Icon name={benefit?.icon} size={16} className={benefit?.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{benefit?.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Client Testimonials */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          What Our Users Say
        </h3>
        
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-sm font-medium text-foreground">{testimonial?.name}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{testimonial?.role}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{testimonial?.company}</p>
                  <p className="text-xs text-foreground italic">"{testimonial?.content}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Success Metrics */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Platform Impact
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <p className="text-lg font-heading font-bold text-success">60%</p>
            </div>
            <p className="text-xs text-muted-foreground">Faster Processing</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Users" size={16} className="text-primary" />
              <p className="text-lg font-heading font-bold text-primary">95%</p>
            </div>
            <p className="text-xs text-muted-foreground">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Shield" size={16} className="text-secondary" />
              <p className="text-lg font-heading font-bold text-secondary">100%</p>
            </div>
            <p className="text-xs text-muted-foreground">Compliance Rate</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Clock" size={16} className="text-accent" />
              <p className="text-lg font-heading font-bold text-accent">24/7</p>
            </div>
            <p className="text-xs text-muted-foreground">System Availability</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformBenefits;