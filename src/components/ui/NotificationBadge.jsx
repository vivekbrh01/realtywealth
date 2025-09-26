import React, { useState } from 'react';
import Icon from '../AppIcon';

const NotificationBadge = ({
  count = 0,
  maxCount = 99,
  variant = 'default',
  size = 'default',
  onClick,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayCount = count > maxCount ? `${maxCount}+` : count?.toString();

  const variants = {
    default: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };

  const sizes = {
    sm: {
      badge: 'w-4 h-4 text-xs',
      icon: 16,
      position: '-top-1 -right-1'
    },
    default: {
      badge: 'w-5 h-5 text-xs',
      icon: 20,
      position: '-top-1 -right-1'
    },
    lg: {
      badge: 'w-6 h-6 text-sm',
      icon: 24,
      position: '-top-2 -right-2'
    }
  };

  const sizeConfig = sizes?.[size];
  const variantClasses = variants?.[variant];

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsExpanded(!isExpanded);
  };

  const mockNotifications = [
    {
      id: 1,
      title: 'Request Approved',
      message: 'Your expense request #EXP-2024-001 has been approved',
      time: '2 min ago',
      type: 'success',
      unread: true
    },
    {
      id: 2,
      title: 'New Assignment',
      message: 'You have been assigned to review purchase request #PUR-2024-045',
      time: '15 min ago',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'Deadline Reminder',
      message: 'Travel request #TRV-2024-012 requires action by tomorrow',
      time: '1 hour ago',
      type: 'warning',
      unread: false
    }
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted"
      >
        <Icon name="Bell" size={sizeConfig?.icon} />
        {count > 0 && (
          <div className={`absolute ${sizeConfig?.position} ${sizeConfig?.badge} ${variantClasses} rounded-full flex items-center justify-center font-medium transition-smooth hover:scale-110`}>
            {displayCount}
          </div>
        )}
      </button>
      {/* Notification Dropdown */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-150">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <button className="text-xs text-primary hover:text-primary/80 transition-smooth">
                Mark all read
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {mockNotifications?.length > 0 ? (
              <div className="py-2">
                {mockNotifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`px-4 py-3 hover:bg-muted transition-smooth cursor-pointer border-l-2 ${notification?.unread
                        ? 'border-l-primary bg-primary/5' : 'border-l-transparent'
                      }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-2 h-2 rounded-full ${notification?.unread ? 'bg-primary' : 'bg-muted'
                          }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mb-1">
                          {notification?.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification?.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No new notifications</p>
              </div>
            )}
          </div>

          {mockNotifications?.length > 0 && (
            <div className="p-3 border-t border-border">
              <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-smooth">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
      {/* Click outside to close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default NotificationBadge;