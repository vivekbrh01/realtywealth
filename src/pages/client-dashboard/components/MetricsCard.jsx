import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, currency = false }) => {
  const formatValue = (val) => {
    if (!currency) return val;
    
    // Convert to lakhs/crores format for Indian currency
    if (val >= 10000000) {
      return `₹${(val / 10000000)?.toFixed(1)}Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000)?.toFixed(1)}L`;
    } else {
      return `₹${val?.toLocaleString('en-IN')}`;
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-md p-6 shadow-elevation-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-heading font-semibold text-foreground">
              {formatValue(value)}
            </p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;