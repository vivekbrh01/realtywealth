import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const PrioritySection = ({ priority, dueDate, onChange, error }) => {
  // Priority levels with detailed descriptions
  const priorityLevels = [
    {
      value: 'critical',
      label: 'Critical',
      description: 'Business-critical, immediate attention required',
      color: 'red',
      icon: 'AlertTriangle',
      sla: '4 hours',
      examples: ['System outages', 'Security breaches', 'Compliance deadlines'],
      impact: 'Severe business impact if delayed'
    },
    {
      value: 'high',
      label: 'High',
      description: 'Important but not immediately critical',
      color: 'orange',
      icon: 'Zap',
      sla: '24 hours',
      examples: ['Key project blockers', 'Client deliverables', 'Revenue impact'],
      impact: 'Significant impact on operations'
    },
    {
      value: 'normal',
      label: 'Normal',
      description: 'Standard business request',
      color: 'blue',
      icon: 'Clock',
      sla: '3-5 days',
      examples: ['Regular purchases', 'Routine permissions', 'Standard processes'],
      impact: 'Minimal immediate impact'
    },
    {
      value: 'low',
      label: 'Low',
      description: 'Non-urgent, can be processed when time permits',
      color: 'green',
      icon: 'Calendar',
      sla: '7-10 days',
      examples: ['Nice-to-have items', 'Future planning', 'Optimization requests'],
      impact: 'No immediate impact'
    }
  ];

  const selectedPriority = priorityLevels?.find(level => level?.value === priority);

  const handlePriorityChange = (selectedPriority) => {
    onChange('priority', selectedPriority);
  };

  const getColorClasses = (colorName, isSelected = false) => {
    const colors = {
      red: {
        border: isSelected ? 'border-red-500' : 'border-red-200',
        bg: isSelected ? 'bg-red-50' : 'bg-red-25',
        text: 'text-red-700',
        icon: 'text-red-600',
        ring: 'ring-red-500'
      },
      orange: {
        border: isSelected ? 'border-orange-500' : 'border-orange-200',
        bg: isSelected ? 'bg-orange-50' : 'bg-orange-25',
        text: 'text-orange-700',
        icon: 'text-orange-600',
        ring: 'ring-orange-500'
      },
      blue: {
        border: isSelected ? 'border-blue-500' : 'border-blue-200',
        bg: isSelected ? 'bg-blue-50' : 'bg-blue-25',
        text: 'text-blue-700',
        icon: 'text-blue-600',
        ring: 'ring-blue-500'
      },
      green: {
        border: isSelected ? 'border-green-500' : 'border-green-200',
        bg: isSelected ? 'bg-green-50' : 'bg-green-25',
        text: 'text-green-700',
        icon: 'text-green-600',
        ring: 'ring-green-500'
      }
    };
    return colors?.[colorName] || colors?.blue;
  };

  // Calculate suggested due date based on priority
  const getSuggestedDueDate = (priorityValue) => {
    const today = new Date();
    const daysToAdd = {
      critical: 0, // Same day
      high: 1,     // Next day
      normal: 5,   // 5 days
      low: 10      // 10 days
    };

    const suggestedDate = new Date(today);
    suggestedDate?.setDate(today?.getDate() + (daysToAdd?.[priorityValue] || 5));
    return suggestedDate?.toISOString()?.split('T')?.[0];
  };

  const handleSuggestedDateClick = () => {
    if (priority) {
      const suggestedDate = getSuggestedDueDate(priority);
      onChange('dueDate', suggestedDate);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Priority & Timeline
        </h3>
        <p className="text-sm text-muted-foreground">
          Set the appropriate priority level and timeline for your request to help with proper routing and processing.
        </p>
      </div>

      {/* Priority Selection */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Flag" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">Priority Level</h4>
          <span className="text-sm text-destructive">*</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {priorityLevels?.map((level) => {
            const isSelected = priority === level?.value;
            const colorClasses = getColorClasses(level?.color, isSelected);

            return (
              <div
                key={level?.value}
                className={cn(
                  "relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
                  colorClasses?.border,
                  colorClasses?.bg,
                  "hover:shadow-lg"
                )}
                onClick={() => handlePriorityChange(level?.value)}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      `bg-${level?.color}-600`
                    )}>
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  </div>
                )}

                {/* Priority Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    `bg-${level?.color}-100`
                  )}>
                    <Icon name={level?.icon} size={20} className={colorClasses?.icon} />
                  </div>
                  <div className="flex-1">
                    <h4 className={cn("font-semibold", colorClasses?.text)}>
                      {level?.label}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      SLA: {level?.sla}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground mb-3 leading-relaxed">
                  {level?.description}
                </p>

                {/* Impact */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground mb-1">Impact:</p>
                  <p className="text-xs text-muted-foreground">
                    {level?.impact}
                  </p>
                </div>

                {/* Examples */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Examples:</p>
                  <div className="flex flex-wrap gap-1">
                    {level?.examples?.slice(0, 2)?.map((example, index) => (
                      <span
                        key={index}
                        className={cn(
                          "inline-block px-2 py-1 text-xs rounded-full",
                          isSelected
                            ? `bg-${level?.color}-200 text-${level?.color}-800`
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Priority Summary */}
      {selectedPriority && (
        <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name={selectedPriority?.icon} size={16} color="white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">
                {selectedPriority?.label} Priority Selected
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                Expected response time: {selectedPriority?.sla}
              </p>
              <div className="text-xs text-muted-foreground">
                Your request will be routed to appropriate approvers based on this priority level.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calendar" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">Timeline Requirements</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Required By Date"
            type="date"
            value={dueDate || ''}
            onChange={(e) => onChange('dueDate', e?.target?.value)}
            description="When do you need this completed?"
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />

          {priority && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Suggested Timeline
              </label>
              <div className="p-3 border border-border rounded-md bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">
                    {new Date(getSuggestedDueDate(priority))?.toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <button
                    type="button"
                    onClick={handleSuggestedDateClick}
                    className="text-xs text-primary hover:underline"
                  >
                    Use this date
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on {selectedPriority?.label?.toLowerCase()} priority SLA
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} className="text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Timeline Tips:</p>
              <ul className="text-xs space-y-1 text-blue-700">
                <li>Allow extra time for complex requests</li>
                <li>Consider approver availability</li>
                <li>Factor in implementation time</li>
                <li>Account for potential revisions</li>
              </ul>
            </div>
          </div >
        </div >

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={18} className="text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Processing Times:</p>
              <ul className="text-xs space-y-1 text-amber-700">
                <li>Critical:Same day response</li>
                <li>High:Within 1 business day</li>
                <li>Normal: 3-5 business days</li>
                <li>Low: 7-10 business days</li>
              </ul >
            </div >
          </div >
        </div >
      </div >

      {/* Urgency Justification */}
      {
        priority === 'critical' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={18} className="text-red-600 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-2">Critical Priority Selected</p>
                <p className="text-xs text-red-700 mb-2">
                  Please ensure your business justification clearly explains why this request requires immediate attention.
                  Critical requests are escalated directly to senior management.
                </p>
                <p className="text-xs text-red-700">
                  <strong>Note:</strong> Misuse of critical priority may result in delays for future requests.
                </p>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default PrioritySection;