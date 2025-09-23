import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityActionList = ({ actions, onActionClick }) => {
  const getActionIcon = (type) => {
    const iconMap = {
      'document_review': 'FileText',
      'payment_follow_up': 'CreditCard',
      'property_inspection': 'Eye',
      'client_meeting': 'Users',
      'compliance_check': 'Shield',
      'contract_renewal': 'RefreshCw'
    };
    return iconMap?.[type] || 'AlertCircle';
  };

  const getUrgencyColor = (urgency) => {
    const colorMap = {
      'critical': 'border-l-destructive bg-destructive/5',
      'high': 'border-l-warning bg-warning/5',
      'medium': 'border-l-secondary bg-secondary/5'
    };
    return colorMap?.[urgency] || 'border-l-muted bg-muted/5';
  };

  return (
    <div className="space-y-3">
      {actions?.map((action) => (
        <div key={action?.id} className={`border-l-4 p-4 rounded-r-md ${getUrgencyColor(action?.urgency)}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name={getActionIcon(action?.type)} size={16} className="text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground">{action?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{action?.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-muted-foreground">
                    <Icon name="User" size={12} className="inline mr-1" />
                    {action?.client}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} className="inline mr-1" />
                    Due: {new Date(action.dueDate)?.toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onActionClick(action?.id, 'view')}
              >
                View
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onActionClick(action?.id, 'complete')}
              >
                Complete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriorityActionList;