import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const RequestTypeSection = ({ value, onChange, error }) => {
  // Request type options with detailed descriptions
  const requestTypes = [
    {
      value: 'equipment',
      label: 'Equipment Purchase',
      description: 'Request for office equipment, hardware, or tools',
      icon: 'Monitor',
      category: 'Purchase',
      examples: ['Laptops', 'Monitors', 'Office furniture', 'Software']
    },
    {
      value: 'leave',
      label: 'Leave Request',
      description: 'Annual leave, sick leave, or personal time off',
      icon: 'Calendar',
      category: 'Time Off',
      examples: ['Vacation days', 'Sick leave', 'Personal days', 'Maternity/Paternity leave']
    },
    {
      value: 'travel',
      label: 'Business Travel',
      description: 'Travel authorization and expense approval',
      icon: 'Plane',
      category: 'Travel',
      examples: ['Client meetings', 'Training programs', 'Conferences', 'Site visits']
    },
    {
      value: 'purchase',
      label: 'General Purchase',
      description: 'Software licenses, subscriptions, or services',
      icon: 'ShoppingCart',
      category: 'Purchase',
      examples: ['Software licenses', 'Subscriptions', 'Professional services', 'Training']
    },
    {
      value: 'permission',
      label: 'Access Permission',
      description: 'Database access, system permissions, or facility access',
      icon: 'Key',
      category: 'Security',
      examples: ['Database access', 'System permissions', 'Building access', 'File permissions']
    },
    {
      value: 'budget',
      label: 'Budget Allocation',
      description: 'Budget requests and financial approvals',
      icon: 'DollarSign',
      category: 'Finance',
      examples: ['Project budgets', 'Department allocations', 'Emergency funds', 'Cost center changes']
    },
    {
      value: 'project',
      label: 'Project Approval',
      description: 'New project initiation and resource allocation',
      icon: 'Briefcase',
      category: 'Project',
      examples: ['New initiatives', 'Resource allocation', 'Timeline changes', 'Scope modifications']
    },
    {
      value: 'policy',
      label: 'Policy Exception',
      description: 'Exceptions to company policies or procedures',
      icon: 'FileText',
      category: 'Policy',
      examples: ['Work from home', 'Flexible hours', 'Special arrangements', 'Process exceptions']
    },
    {
      value: 'other',
      label: 'Other Request',
      description: 'Custom requests not covered by standard categories',
      icon: 'MoreHorizontal',
      category: 'General',
      examples: ['Custom requirements', 'Special cases', 'Unique situations']
    }
  ];

  const selectedType = requestTypes?.find(type => type?.value === value);

  const handleTypeChange = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          What type of approval do you need?
        </h3>
        <p className="text-sm text-muted-foreground">
          Select the category that best matches your request. This helps us route your request to the right approver.
        </p>
      </div>

      {/* Request Type Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {requestTypes?.map((type) => (
          <div
            key={type?.value}
            className={cn(
              "relative p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
              value === type?.value
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card hover:border-primary/50"
            )}
            onClick={() => handleTypeChange(type?.value)}
          >
            {/* Selection Indicator */}
            {value === type?.value && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" />
                </div>
              </div>
            )}

            {/* Type Header */}
            <div className="flex items-center space-x-3 mb-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                value === type?.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}>
                <Icon name={type?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{type?.label}</h4>
                <p className="text-xs text-muted-foreground">{type?.category}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {type?.description}
            </p>

            {/* Examples */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-foreground">Common examples:</p>
              <div className="flex flex-wrap gap-1">
                {type?.examples?.slice(0, 3)?.map((example, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-block px-2 py-1 text-xs rounded-full",
                      value === type?.value
                        ? "bg-primary/10 text-primary border border-primary/20" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {example}
                  </span>
                ))}
                {type?.examples?.length > 3 && (
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                    +{type?.examples?.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alternative Select Dropdown */}
      <div className="pt-4 border-t border-border">
        <Select
          label="Or choose from dropdown"
          placeholder="Select request type..."
          value={value}
          onChange={handleTypeChange}
          options={requestTypes?.map(type => ({
            value: type?.value,
            label: `${type?.label} - ${type?.description}`
          }))}
          error={error}
          searchable
          clearable
        />
      </div>

      {/* Selected Type Summary */}
      {selectedType && (
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={selectedType?.icon} size={16} color="white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">
                {selectedType?.label} Selected
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {selectedType?.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Category: {selectedType?.category}</span>
                <span>{selectedType?.examples?.length} common use cases</span>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {/* Error Display */}
      {
        error && (
          <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        )
      }

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Need help choosing? Contact your supervisor or HR department for guidance.
        </p>
      </div>
    </div >
  );
};

export default RequestTypeSection;