import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ProgressIndicator = ({
  sections,
  currentSection,
  completionPercentage,
  onSectionClick,
  validationTouched,
  errors
}) => {
  // Check if a section is completed
  const isSectionCompleted = (sectionIndex) => {
    const section = sections?.[sectionIndex];
    if (!section) return false;

    // Check if section has validation errors
    const sectionErrors = Object.keys(errors || {})?.filter(errorKey => {
      // Map error keys to sections
      const errorSectionMap = {
        requestType: 'type',
        title: 'details',
        description: 'details',
        targetDepartment: 'details',
        businessJustification: 'justification',
        priority: 'priority'
      };
      return errorSectionMap?.[errorKey] === section?.id;
    });

    // Section is completed if it has been touched and has no errors
    return validationTouched?.[section?.id] && sectionErrors?.length === 0;
  };

  // Check if a section has errors
  const sectionHasErrors = (sectionIndex) => {
    const section = sections?.[sectionIndex];
    if (!section) return false;

    const sectionErrors = Object.keys(errors || {})?.filter(errorKey => {
      const errorSectionMap = {
        requestType: 'type',
        title: 'details',
        description: 'details',
        targetDepartment: 'details',
        businessJustification: 'justification',
        priority: 'priority'
      };
      return errorSectionMap?.[errorKey] === section?.id;
    });

    return validationTouched?.[section?.id] && sectionErrors?.length > 0;
  };

  // Get section status
  const getSectionStatus = (sectionIndex) => {
    if (sectionIndex === currentSection) return 'current';
    if (isSectionCompleted(sectionIndex)) return 'completed';
    if (sectionHasErrors(sectionIndex)) return 'error';
    if (sectionIndex < currentSection) return 'visited';
    return 'upcoming';
  };

  // Get status colors and icons
  const getStatusStyles = (status) => {
    const styles = {
      current: {
        bg: 'bg-primary',
        text: 'text-primary-foreground',
        border: 'border-primary',
        icon: 'Circle'
      },
      completed: {
        bg: 'bg-green-500',
        text: 'text-white',
        border: 'border-green-500',
        icon: 'Check'
      },
      error: {
        bg: 'bg-red-500',
        text: 'text-white',
        border: 'border-red-500',
        icon: 'AlertCircle'
      },
      visited: {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        border: 'border-muted',
        icon: 'Circle'
      },
      upcoming: {
        bg: 'bg-background',
        text: 'text-muted-foreground',
        border: 'border-muted',
        icon: 'Circle'
      }
    };
    return styles?.[status] || styles?.upcoming;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Form Progress</h3>
          <p className="text-sm text-muted-foreground">
            Complete all required sections to submit your request
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Started</span>
          <span>In Progress</span>
          <span>Ready to Submit</span>
        </div>
      </div>

      {/* Desktop Progress Steps */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-5 left-6 right-6 h-px bg-border" />

          {/* Steps */}
          <div className="relative flex justify-between">
            {sections?.map((section, index) => {
              const status = getSectionStatus(index);
              const styles = getStatusStyles(status);
              const canClick = index <= currentSection || isSectionCompleted(index);

              return (
                <div key={section?.id} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <button
                    onClick={() => canClick && onSectionClick?.(index)}
                    disabled={!canClick}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 relative z-10",
                      styles?.bg,
                      styles?.text,
                      styles?.border,
                      canClick ? "hover:scale-105 cursor-pointer" : "cursor-not-allowed"
                    )}
                  >
                    <Icon name={styles?.icon} size={16} />
                  </button>

                  {/* Step Label */}
                  <div className="mt-2 text-center max-w-20">
                    <div className={cn(
                      "text-xs font-medium",
                      status === 'current' ? "text-primary" :
                        status === 'completed' ? "text-green-600" :
                          status === 'error' ? "text-red-600" : "text-muted-foreground"
                    )}>
                      {section?.label}
                    </div>
                    {section?.required && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Required
                      </div>
                    )}
                  </div>

                  {/* Error Indicator */}
                  {sectionHasErrors(index) && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <Icon name="AlertCircle" size={10} color="white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Progress Steps */}
      <div className="md:hidden space-y-3">
        {sections?.map((section, index) => {
          const status = getSectionStatus(index);
          const styles = getStatusStyles(status);
          const canClick = index <= currentSection || isSectionCompleted(index);

          return (
            <button
              key={section?.id}
              onClick={() => canClick && onSectionClick?.(index)}
              disabled={!canClick}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200",
                status === 'current' ? "border-primary bg-primary/5" :
                  status === 'completed' ? "border-green-200 bg-green-50" :
                    status === 'error' ? "border-red-200 bg-red-50" : "border-border bg-background hover:bg-muted/50",
                canClick ? "cursor-pointer" : "cursor-not-allowed opacity-60"
              )}
            >
              {/* Step Circle */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0",
                styles?.bg,
                styles?.text,
                styles?.border
              )}>
                <Icon name={styles?.icon} size={14} />
              </div>

              {/* Step Info */}
              <div className="flex-1 text-left">
                <div className={cn(
                  "text-sm font-medium",
                  status === 'current' ? "text-primary" :
                    status === 'completed' ? "text-green-700" :
                      status === 'error' ? "text-red-700" : "text-foreground"
                )}>
                  {section?.label}
                  {section?.required && <span className="text-red-500 ml-1">*</span>}
                </div>
                <div className="text-xs text-muted-foreground">
                  {status === 'current' ? 'In Progress' :
                    status === 'completed' ? 'Completed' :
                      status === 'error' ? 'Needs Attention' :
                        status === 'visited' ? 'Visited' : 'Not Started'}
                </div>
              </div>

              {/* Status Icon */}
              <div className="flex-shrink-0">
                {status === 'current' && (
                  <Icon name="ArrowRight" size={16} className="text-primary" />
                )}
                {status === 'completed' && (
                  <Icon name="CheckCircle" size={16} className="text-green-600" />
                )}
                {status === 'error' && (
                  <Icon name="AlertTriangle" size={16} className="text-red-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-muted-foreground">
                {sections?.filter((_, index) => isSectionCompleted(index))?.length} Completed
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-muted-foreground">
                {sections?.filter((_, index) => sectionHasErrors(index))?.length} Need Attention
              </span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Step {currentSection + 1} of {sections?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;