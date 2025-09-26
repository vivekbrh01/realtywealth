import React from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({ status, size = 'default', showLabel = true, className = '' }) => {
  const statusConfig = {
    pending: {
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'Clock',
      label: 'Pending'
    },
    'in-review': {
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      icon: 'Eye',
      label: 'In Review'
    },
    approved: {
      color: 'text-success',
      bgColor: 'bg-success/10',
      icon: 'CheckCircle',
      label: 'Approved'
    },
    rejected: {
      color: 'text-error',
      bgColor: 'bg-error/10',
      icon: 'XCircle',
      label: 'Rejected'
    },
    draft: {
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      icon: 'FileText',
      label: 'Draft'
    }
  };
  const config = statusConfig?.[status] || statusConfig?.pending;
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  const iconSizes = {
    sm: 12,
    default: 16,
    lg: 20
  };
  return (
    <div className={`inline-flex items-center space-x-2 rounded-full font-medium transition-smooth ${config?.bgColor} ${config?.color} ${sizeClasses?.[size]} ${className}`}>
      <Icon name={config?.icon} size={iconSizes?.[size]} />
      {showLabel && <span>{config?.label}</span>}
    </div>
  );
};
export default StatusIndicator;