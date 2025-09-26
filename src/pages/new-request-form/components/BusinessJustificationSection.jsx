import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const BusinessJustificationSection = ({ value, additionalNotes, onChange, error }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [characterCount, setCharacterCount] = useState(value?.length || 0);

  // Pre-defined justification templates
  const templates = [
    {
      id: 'productivity',
      title: 'Productivity Improvement',
      description: 'Request improves work efficiency',
      template: `This request is essential for improving productivity and operational efficiency because:
                        Current Situation: [Describe current workflow/process limitations]
                        Expected Impact: [Explain how this will improve productivity]
                        Measurable Benefits: [List specific benefits and metrics]
                        Risk of Not Approving: [Explain potential negative impact]

                        Business Value:
                            - Time savings: [Estimated hours/week saved]
                            - Cost reduction: [Potential cost savings]
                            - Quality improvement: [How quality will be enhanced]`
    },
    {
      id: 'compliance',
      title: 'Compliance & Security',
      description: 'Required for regulatory compliance',
      template: `This request is necessary to meet compliance and security requirements:
                            Regulatory Requirements: [List applicable regulations/standards]
                            Current Gaps: [Describe current compliance gaps]
                            Risk Assessment: [Outline risks of non-compliance]
                            Implementation Timeline: [Required compliance deadlines]
                                
                                Compliance Benefits:
                                - Risk mitigation: [Specific risks addressed]
                                - Audit readiness: [How this improves audit compliance]
                                - Security enhancement: [Security improvements gained]`
    },
    {
      id: 'growth',
      title: 'Business Growth',
      description: 'Supports business expansion goals',
      template: `This request supports our business growth and expansion objectives:
	
 Growth Strategy Alignment: [How this supports company goals]
 Market Opportunity: [Market opportunities this enables]
 Competitive Advantage: [Competitive benefits gained]
 Revenue Impact: [Potential revenue implications]
	
	Growth Benefits:
	- Market expansion: [New markets or segments accessed]
	- Customer satisfaction: [Improvement in customer experience]
	- Innovation enablement: [How this drives innovation]`
    },
    {
      id: 'maintenance',
      title: 'Operational Maintenance',
      description: 'Required for ongoing operations',
      template: `This request is critical for maintaining operational continuity:
	
 Current State: [Describe current operational challenges]
 Business Impact: [How this affects daily operations]
 Dependencies: [Systems or processes that depend on this]
 Timeline Sensitivity: [Why timing is important]
	
	Operational Benefits:
	- System reliability: [Improvements in system uptime/reliability]
	- Process efficiency: [Workflow improvements]
	- Resource optimization: [Better use of existing resources]`
    },
    {
      id: 'cost-saving',
      title: 'Cost Optimization',
      description: 'Reduces operational costs',
      template: `This request will result in significant cost optimization:
	
 Current Costs: [Existing cost structure or inefficiencies]
 Expected Savings: [Quantified cost savings]
 ROI Analysis: [Return on investment timeline]
 Long-term Benefits: [Sustained cost advantages]
	
	Financial Benefits:
	- Direct savings: [Specific cost reductions]
	- Efficiency gains: [Process cost improvements]
	- Resource optimization: [Better resource utilization]`
    }
  ];

  const handleTemplateSelect = (template) => {
    if (selectedTemplate === template?.id) {
      // Deselect if clicking the same template
      setSelectedTemplate('');
    } else {
      setSelectedTemplate(template?.id);
      onChange('businessJustification', template?.template);
      setCharacterCount(template?.template?.length);
    }
  };

  const handleTextChange = (e) => {
    const text = e?.target?.value;
    onChange('businessJustification', text);
    setCharacterCount(text?.length);
  };

  const handleNotesChange = (e) => {
    onChange('additionalNotes', e?.target?.value);
  };

  const clearJustification = () => {
    onChange('businessJustification', '');
    setCharacterCount(0);
    setSelectedTemplate('');
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Business Justification
        </h3>
        <p className="text-sm text-muted-foreground">
          Explain the business impact and necessity of your request. Strong justification helps expedite approval.
        </p>
      </div>

      {/* Template Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Template" size={18} className="text-primary" />
            <span>Quick Templates</span>
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearJustification}
            iconName="X"
            disabled={!value}
          >
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates?.map((template) => (
            <button
              key={template?.id}
              onClick={() => handleTemplateSelect(template)}
              className={cn(
                "p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-md",
                selectedTemplate === template?.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-sm text-foreground">
                  {template?.title}
                </h5>
                {selectedTemplate === template?.id && (
                  <Icon name="Check" size={14} className="text-primary mt-0.5" />
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {template?.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Justification Text Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-primary" />
            <span>Business Justification *</span>
          </label>
          <div className={cn(
            "text-xs",
            characterCount < 50 ? "text-destructive" :
              characterCount < 100 ? "text-warning" : "text-muted-foreground"
          )}>
            {characterCount} characters {characterCount < 50 && `(minimum 50 required)`}
          </div>
        </div>

        <textarea
          className={cn(
            "w-full min-h-48 p-4 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y font-mono",
            error && "border-destructive focus-visible:ring-destructive"
          )}
          placeholder="Provide a detailed business justification for your request. Include:
	
 Why this request is necessary
 Business impact if approved/not approved
 How it aligns with business objectives
 Expected benefits and outcomes
 Timeline considerations
 Any supporting data or metrics"
          value={value || ''}
          onChange={handleTextChange}
          rows={12}
        />

        {error && (
          <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Writing Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={18} className="text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-2">Strong Justification Includes:</p>
              <ul className="space-y-1 text-xs text-green-700">
                <li> Clear business need and impact </li>
                <li> Quantified benefits where possible</li>
                <li> Risk assessment if not approved</li>
                <li> Alignment with business goals</li>
                <li> Realistic timelines</li>
              </ul>
            </div >
          </div >
        </div >

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={18} className="text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-2">Avoid These Mistakes:</p>
              <ul className="space-y-1 text-xs text-amber-700">
                <li> Vague or generic statements</li>
                <li> Personal preferences over business need</li>
                <li> Lack of supporting details</li>
                <li> Unrealistic expectations</li>
                <li> Missing urgency explanation</li>
              </ul>
            </div >
          </div >
        </div >
      </div >

      {/* Additional Notes Section */}
      < div className="space-y-4" >
        <label className="text-sm font-medium text-foreground flex items-center space-x-2">
          <Icon name="MessageSquare" size={16} className="text-primary" />
          <span>Additional Notes</span>
          <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
        </label>

        <textarea
          className="w-full min-h-24 p-3 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
          placeholder="Any additional context, constraints, or information that would help the approver make a decision..."
          value={additionalNotes || ''}
          onChange={handleNotesChange}
          rows={4}
        />

        <p className="text-xs text-muted-foreground">
          Use this space for any additional context that doesn't fit in the main justification
        </p>
      </div >

      {/* Justification Strength Indicator */}
      < div className="p-4 bg-muted/50 rounded-lg" >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Justification Strength</span>
          <span className={cn(
            "text-xs font-medium",
            characterCount < 50 ? "text-destructive" :
              characterCount < 150 ? "text-warning" :
                characterCount < 300 ? "text-blue-600" : "text-green-600"
          )}>
            {characterCount < 50 ? "Insufficient" :
              characterCount < 150 ? "Basic" :
                characterCount < 300 ? "Good" : "Comprehensive"}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              characterCount < 50 ? "bg-destructive" :
                characterCount < 150 ? "bg-warning" :
                  characterCount < 300 ? "bg-blue-500" : "bg-green-500"
            )}
            style={{ width: `${Math.min((characterCount / 400) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Detailed justifications have higher approval rates
        </p>
      </div >
    </div >
  );
};

export default BusinessJustificationSection;