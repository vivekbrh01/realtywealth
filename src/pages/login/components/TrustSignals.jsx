import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'RERA Certified',
      description: 'Real Estate Regulatory Authority approved platform',
      icon: 'Shield',
      verified: true
    },
    {
      id: 2,
      name: 'ISO 27001',
      description: 'Information Security Management certified',
      icon: 'Lock',
      verified: true
    },
    {
      id: 3,
      name: 'RBI Compliant',
      description: 'Reserve Bank of India regulatory compliance',
      icon: 'Building',
      verified: true
    },
    {
      id: 4,
      name: 'SSL Secured',
      description: '256-bit encryption for all transactions',
      icon: 'ShieldCheck',
      verified: true
    }
  ];

  const securityFeatures = [
    {
      id: 1,
      title: 'Bank-Grade Security',
      description: 'Multi-layer security protocols protect your data',
      icon: 'Lock'
    },
    {
      id: 2,
      title: 'Regulatory Compliance',
      description: 'Fully compliant with Indian real estate regulations',
      icon: 'FileCheck'
    },
    {
      id: 3,
      title: '24/7 Monitoring',
      description: 'Continuous system monitoring and threat detection',
      icon: 'Eye'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Assurance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="ShieldCheck" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Secure Platform</h3>
            <p className="text-sm text-muted-foreground">Your data is protected with enterprise-grade security</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {securityFeatures?.map((feature) => (
            <div key={feature?.id} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <Icon name={feature?.icon} size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{feature?.title}</p>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Certifications & Compliance
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground">{cert?.name}</p>
                  {cert?.verified && (
                    <Icon name="CheckCircle" size={14} className="text-success" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Trusted by Professionals
        </h3>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-heading font-bold text-primary">500+</p>
            <p className="text-xs text-muted-foreground">Active Clients</p>
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-primary">₹2,500Cr</p>
            <p className="text-xs text-muted-foreground">Assets Managed</p>
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-primary">99.9%</p>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
        </div>
      </div>
      {/* Contact Support */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Headphones" size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Need Help?</p>
            <p className="text-xs text-muted-foreground">
              Contact our support team at{' '}
              <span className="text-primary font-medium">support@realtywealth.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;