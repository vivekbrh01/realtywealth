import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityList = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'property_added': 'Building2',
      'transaction_completed': 'CheckCircle',
      'client_onboarded': 'UserPlus',
      'document_uploaded': 'FileText',
      'payment_received': 'CreditCard',
      'maintenance_scheduled': 'Wrench'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'property_added': 'text-primary',
      'transaction_completed': 'text-success',
      'client_onboarded': 'text-secondary',
      'document_uploaded': 'text-accent',
      'payment_received': 'text-success',
      'maintenance_scheduled': 'text-warning'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="space-y-4">
      {activities?.map((activity) => (
        <div key={activity?.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-md transition-smooth">
          <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
            <Icon name={getActivityIcon(activity?.type)} size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{activity?.title}</p>
            <p className="text-sm text-muted-foreground">{activity?.description}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">{formatTime(activity?.timestamp)}</span>
              {activity?.client && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity?.client}</span>
                </>
              )}
            </div>
          </div>
          {activity?.amount && (
            <div className="text-sm font-medium text-success">
              ₹{activity?.amount?.toLocaleString('en-IN')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityList;