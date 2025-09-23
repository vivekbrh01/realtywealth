import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Client Onboarding Progress
        </h2>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Step Indicators */}
      <div className="flex justify-between">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center flex-1">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all duration-200
                ${isCompleted ? 'bg-success text-success-foreground' : ''}
                ${isCurrent ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' : ''}
                ${isUpcoming ? 'bg-muted text-muted-foreground' : ''}
              `}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  stepNumber
                )}
              </div>
              <span className={`
                text-xs text-center px-2 font-medium
                ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}
              `}>
                {step?.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;