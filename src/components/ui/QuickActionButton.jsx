import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionButton = ({
  title,
  description,
  icon,
  onClick,
  variant = 'outline',
  size = 'default',
  disabled = false,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={handleClick}
      className={`h-auto p-6 flex-col items-start text-left space-y-3 hover:scale-102 transition-all duration-200 ${className}`}
    >
      <div className="flex items-center space-x-3 w-full">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-base mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
        </div>
      </div>
    </Button>
  );
};

export default QuickActionButton;