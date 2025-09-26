import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RequestDetailsSection = ({ data, requestType, onChange, errors }) => {
  const [isRichText, setIsRichText] = useState(false);

  // Category options based on request type
  const getCategoryOptions = () => {
    const categories = {
      equipment: [
        { value: 'computer-hardware', label: 'Computer Hardware' },
        { value: 'office-furniture', label: 'Office Furniture' },
        { value: 'peripherals', label: 'Peripherals & Accessories' },
        { value: 'tools', label: 'Tools & Equipment' },
        { value: 'other-equipment', label: 'Other Equipment' }
      ],
      leave: [
        { value: 'annual-leave', label: 'Annual Leave' },
        { value: 'sick-leave', label: 'Sick Leave' },
        { value: 'personal-leave', label: 'Personal Leave' },
        { value: 'maternity-paternity', label: 'Maternity/Paternity Leave' },
        { value: 'emergency-leave', label: 'Emergency Leave' }
      ],
      travel: [
        { value: 'client-visit', label: 'Client Visit' },
        { value: 'training', label: 'Training Program' },
        { value: 'conference', label: 'Conference/Seminar' },
        { value: 'site-visit', label: 'Site Visit' },
        { value: 'business-meeting', label: 'Business Meeting' }
      ],
      purchase: [
        { value: 'software-license', label: 'Software License' },
        { value: 'subscription', label: 'Subscription Service' },
        { value: 'professional-service', label: 'Professional Service' },
        { value: 'training-course', label: 'Training Course' },
        { value: 'other-purchase', label: 'Other Purchase' }
      ],
      permission: [
        { value: 'database-access', label: 'Database Access' },
        { value: 'system-permission', label: 'System Permission' },
        { value: 'facility-access', label: 'Facility Access' },
        { value: 'file-permission', label: 'File Permission' },
        { value: 'network-access', label: 'Network Access' }
      ],
      budget: [
        { value: 'project-budget', label: 'Project Budget' },
        { value: 'department-allocation', label: 'Department Allocation' },
        { value: 'emergency-fund', label: 'Emergency Fund' },
        { value: 'cost-center', label: 'Cost Center Change' },
        { value: 'budget-transfer', label: 'Budget Transfer' }
      ],
      project: [
        { value: 'new-initiative', label: 'New Initiative' },
        { value: 'resource-allocation', label: 'Resource Allocation' },
        { value: 'timeline-change', label: 'Timeline Change' },
        { value: 'scope-modification', label: 'Scope Modification' },
        { value: 'team-expansion', label: 'Team Expansion' }
      ],
      policy: [
        { value: 'work-arrangement', label: 'Work Arrangement' },
        { value: 'flexible-hours', label: 'Flexible Hours' },
        { value: 'special-accommodation', label: 'Special Accommodation' },
        { value: 'process-exception', label: 'Process Exception' },
        { value: 'other-exception', label: 'Other Exception' }
      ]
    };

    return categories?.[requestType] || [
      { value: 'general', label: 'General Request' },
      { value: 'other', label: 'Other' }
    ];
  };

  // Currency options for amount field
  const currencyOptions = [
    { value: 'INR', label: '₹ INR - Indian Rupees' },
    { value: 'USD', label: '$ USD - US Dollars' },
    { value: 'EUR', label: '€ EUR - Euros' },
    { value: 'GBP', label: '£ GBP - British Pounds' }
  ];

  // Department options for routing
  const departmentOptions = [
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
    { value: 'marketing', label: 'Marketing & Sales' },
    { value: 'operations', label: 'Operations' },
    { value: 'legal', label: 'Legal & Compliance' },
    { value: 'procurement', label: 'Procurement' },
    { value: 'management', label: 'Management' }
  ];

  // Rich text formatting functions
  const insertFormatting = (format) => {
    const textarea = document.getElementById('description-textarea');
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const text = textarea?.value;
    const selectedText = text?.substring(start, end);

    let replacement = '';
    switch (format) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        break;
      case 'list':
        replacement = `\ ${selectedText || 'list item'}`;
        break;
      case 'link':
        replacement = `[${selectedText || 'link text'}](url)`;
        break;
    }

    const newText = text?.substring(0, start) + replacement + text?.substring(end);
    onChange('description', newText);

    // Set cursor position after formatting
    setTimeout(() => {
      textarea?.focus();
      const newPosition = start + replacement?.length;
      textarea?.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const shouldShowAmountField = () => {
    return ['equipment', 'purchase', 'travel', 'budget', 'project']?.includes(requestType);
  };

  const shouldShowDueDateField = () => {
    return ['equipment', 'travel', 'project', 'leave', 'purchase']?.includes(requestType);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Request Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Provide detailed information about your request to help approvers make informed decisions.
        </p>
      </div>

      {/* Basic Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="FileText" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">Basic Information</h4>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input
            label="Request Title"
            description="A clear, concise title that summarizes your request"
            value={data?.title || ''}
            onChange={(e) => onChange('title', e?.target?.value)}
            required
            error={errors?.title}
            placeholder="e.g., New laptop for software development work"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Category"
              description="Select the most appropriate category"
              value={data?.category || ''}
              onChange={(value) => onChange('category', value)}
              options={getCategoryOptions()}
              error={errors?.category}
              placeholder="Select a category"
              searchable
            />

            <Select
              label="Target Department"
              description="Which department should handle this?"
              value={data?.targetDepartment || ''}
              onChange={(value) => onChange('targetDepartment', value)}
              options={departmentOptions}
              required
              error={errors?.targetDepartment}
              placeholder="Select target department"
              searchable
            />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="AlignLeft" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">Detailed Description</h4>
        </div>

        <div className="space-y-3">
          {/* Rich Text Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertFormatting('bold')}
                disabled={!isRichText}
              >
                <Icon name="Bold" size={14} />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertFormatting('italic')}
                disabled={!isRichText}
              >
                <Icon name="Italic" size={14} />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertFormatting('list')}
                disabled={!isRichText}
              >
                <Icon name="List" size={14} />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertFormatting('link')}
                disabled={!isRichText}
              >
                <Icon name="Link" size={14} />
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsRichText(!isRichText)}
              iconName={isRichText ? "Code" : "Type"}
            >
              {isRichText ? "Plain Text" : "Rich Text"}
            </Button>
          </div>

          {/* Description Textarea */}
          <div className="relative">
            <textarea
              id="description-textarea"
              className="w-full min-h-32 p-3 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              placeholder="Describe your request in detail. Include: What you need and why How it will be used Timeline requirements Any specific requirements or constraints Impact on your work if not approved"
              value={data?.description || ''}
              onChange={(e) => onChange('description', e?.target?.value)}
              rows={6}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {data?.description?.length || 0} characters
            </div>
          </div>

          {errors?.description && (
            <p className="text-sm text-destructive">{errors?.description}</p>
          )}

          {/* Description Hints */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Writing a good description:</p>
                <ul className="text-xs space-y-1 text-blue-700">
                  <li>Be specific about what you need</li>
                  <li>Explain the business impact</li>
                  <li>Include relevant technical details</li>
                  <li>Mention any deadlines or constraints</li>
                </ul>
              </div>
            </div>
          </div >
        </div >
      </div >

      {/* Financial & Timeline Information */}
      {
        (shouldShowAmountField() || shouldShowDueDateField()) && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Calculator" size={18} className="text-primary" />
              <h4 className="font-medium text-foreground">Financial & Timeline</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shouldShowAmountField() && (
                <div className="space-y-2">
                  <Input
                    label="Estimated Amount"
                    type="number"
                    value={data?.amount || ''}
                    onChange={(e) => onChange('amount', e?.target?.value)}
                    error={errors?.amount}
                    placeholder="0.00"
                    description="Estimated cost in selected currency"
                  />
                  <Select
                    value={data?.currency || 'INR'}
                    onChange={(value) => onChange('currency', value)}
                    options={currencyOptions}
                    placeholder="Select currency"
                  />
                </div>
              )}

              {shouldShowDueDateField() && (
                <Input
                  label="Required By Date"
                  type="date"
                  value={data?.dueDate || ''}
                  onChange={(e) => onChange('dueDate', e?.target?.value)}
                  error={errors?.dueDate}
                  description="When do you need this completed?"
                  min={new Date()?.toISOString()?.split('T')?.[0]}
                />
              )}
            </div>
          </div>
        )
      }

      {/* Additional Details */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Info" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">Additional Information</h4>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input
            label="Reference/Ticket Number"
            value={data?.referenceNumber || ''}
            onChange={(e) => onChange('referenceNumber', e?.target?.value)}
            error={errors?.referenceNumber}
            placeholder="Related ticket or reference number (optional)"
            description="Link to existing tickets, projects, or references"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Special Instructions
            </label>
            <textarea
              className="w-full min-h-20 p-3 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Any special instructions, constraints, or additional context that approvers should know..."
              value={data?.specialInstructions || ''}
              onChange={(e) => onChange('specialInstructions', e?.target?.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Optional: Include any special handling requirements or additional context
            </p>
          </div>
        </div>
      </div>

      {/* Form Progress Indicator */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-green-600" />
            <span className="text-sm font-medium text-foreground">Section Progress</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {[data?.title, data?.description, data?.targetDepartment]?.filter(Boolean)?.length} of 3 required fields completed
          </div>
        </div>
      </div>
    </div >
  );
};

export default RequestDetailsSection;