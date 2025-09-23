import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpPanel = ({ currentStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const helpContent = {
    1: {
      title: "Personal Information Help",
      sections: [
        {
          title: "Identity Documents",
          content: `• PAN Number: Enter your 10-character PAN number (e.g., ABCDE1234F)\n• Aadhaar: Optional but recommended for enhanced verification\n• Ensure all details match your official documents exactly`
        },
        {
          title: "Address Guidelines",
          content: `• Provide complete address with PIN code\n• Address should match your address proof document\n• Use standard abbreviations (e.g., Apt, Bldg, Rd)`
        },
        {
          title: "Contact Information",
          content: `• Mobile number will be used for OTP verification\n• Email address will be your primary communication channel\n• Ensure both are active and accessible`
        }
      ]
    },
    2: {
      title: "Financial Profile Help",
      sections: [
        {
          title: "Income Documentation",
          content: `• Salaried: Provide salary slips and Form 16\n• Business: Submit ITR and business registration\n• Professional: Include practice certificate and income proof`
        },
        {
          title: "Banking Information",
          content: `• Account should be in your name only\n• IFSC code must be valid and active\n• Bank statement should be recent (within 3 months)`
        },
        {
          title: "Investment Experience",
          content: `• Include all types of real estate investments\n• Mention both direct and indirect investments (REITs)\n• Provide approximate values if exact figures unavailable`
        }
      ]
    },
    3: {
      title: "Investment Preferences Help",
      sections: [
        {
          title: "Property Selection",
          content: `• Consider location connectivity and infrastructure\n• Evaluate rental potential and capital appreciation\n• Factor in maintenance costs and property taxes`
        },
        {
          title: "Risk Assessment",
          content: `• Under-construction properties offer better prices but higher risk\n• Ready properties provide immediate rental income\n• Commercial properties typically offer higher yields`
        },
        {
          title: "Investment Strategy",
          content: `• Buy and Hold: Long-term capital appreciation\n• Rental Focus: Steady monthly income\n• Fix and Flip: Short-term profit through renovation`
        }
      ]
    },
    4: {
      title: "Documentation Help",
      sections: [
        {
          title: "Document Requirements",
          content: `• All documents should be clear and legible\n• File size should not exceed specified limits\n• Accepted formats: PDF, JPG, PNG only`
        },
        {
          title: "KYC Compliance",
          content: `• Documents must be valid and not expired\n• Name should match across all documents\n• Address proof should be recent (within 3 months)`
        },
        {
          title: "Upload Guidelines",
          content: `• Scan documents in good lighting\n• Ensure all corners are visible\n• Avoid shadows or reflections on documents`
        }
      ]
    }
  };

  const regulatoryInfo = {
    title: "Regulatory Compliance",
    items: [
      "RERA Registration: All properties comply with Real Estate Regulatory Authority guidelines",
      "KYC Requirements: As per RBI and SEBI guidelines for financial services",
      "Data Protection: Information handled as per IT Act 2000 and privacy regulations",
      "Investment Limits: Foreign investment subject to FEMA regulations",
      "Tax Implications: Consult tax advisor for capital gains and rental income tax"
    ]
  };

  const currentHelpContent = helpContent?.[currentStep];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Mobile Toggle Header */}
      <div className="lg:hidden border-b border-border p-4">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="w-full justify-between"
        >
          Help & Guidelines
        </Button>
      </div>
      {/* Help Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              {currentHelpContent?.title || "Help & Guidelines"}
            </h3>
          </div>

          {currentHelpContent && (
            <div className="space-y-4 mb-6">
              {currentHelpContent?.sections?.map((section, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2 text-sm">
                    {section?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section?.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Regulatory Information */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Shield" size={16} className="text-success" />
              <h4 className="font-medium text-foreground text-sm">
                {regulatoryInfo?.title}
              </h4>
            </div>
            <div className="space-y-2">
              {regulatoryInfo?.items?.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="border-t border-border pt-4 mt-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Phone" size={16} className="text-primary" />
              <h4 className="font-medium text-foreground text-sm">
                Need Assistance?
              </h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  support@realtywealth.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Mon-Fri: 9:00 AM - 6:00 PM IST
                </span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={14} className="text-primary mt-0.5" />
              <div>
                <h5 className="font-medium text-primary text-xs mb-1">Quick Tip</h5>
                <p className="text-xs text-primary/80">
                  Save your progress frequently using the "Save Draft" button. 
                  You can return to complete the onboarding process later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;