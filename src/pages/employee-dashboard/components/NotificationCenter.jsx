import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const NotificationCenter = ({ notifications, onMarkAsRead, onViewAll }) => {
  const [expandedNotifications, setExpandedNotifications] = useState(new Set());

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getNotificationIcon = (type) => {
    const iconMap = {
      'status-update': 'Bell',
      'approval': 'CheckCircle',
      'rejection': 'XCircle',
      'comment': 'MessageCircle',
      'assignment': 'UserPlus',
      'reminder': 'Clock',
      'system': 'Settings'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      'approval': 'text-success',
      'rejection': 'text-error',
      'comment': 'text-primary',
      'assignment': 'text-warning',
      'reminder': 'text-warning',
      'system': 'text-muted-foreground'
    };
    return colorMap?.[type] || 'text-primary';
  };

  const toggleExpanded = (notificationId) => {
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded?.has(notificationId)) {
      newExpanded?.delete(notificationId);
    } else {
      newExpanded?.add(notificationId);
    }
    setExpandedNotifications(newExpanded);
  };

  const handleMarkAsRead = (notification) => {
    if (onMarkAsRead) {
      onMarkAsRead(notification);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            {notifications?.filter(n => !n?.read)?.length > 0 && (
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                {notifications?.filter(n => !n?.read)?.length}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewAll && onViewAll()}
            iconName="ExternalLink"
            iconPosition="right"
          >
            View All
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications?.length > 0 ? (
          <div className="divide-y divide-border">
            {notifications?.slice(0, 5)?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/30 transition-smooth ${!notification?.read ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                  }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!notification?.read ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                      <Icon
                        name={getNotificationIcon(notification?.type)}
                        size={16}
                        className={!notification?.read ? 'text-primary' : 'text-muted-foreground'}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                        {notification?.title}
                      </h3>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimeAgo(notification?.createdAt)}
                        </span>
                        {!notification?.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification)}
                            className="text-xs text-primary hover:text-primary/80 transition-smooth"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed ${expandedNotifications?.has(notification?.id) ? '' : 'line-clamp-2'
                      } ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification?.message}
                    </p>

                    {notification?.message?.length > 100 && (
                      <button
                        onClick={() => toggleExpanded(notification?.id)}
                        className="text-xs text-primary hover:text-primary/80 transition-smooth mt-1"
                      >
                        {expandedNotifications?.has(notification?.id) ? 'Show less' : 'Show more'}
                      </button>
                    )}

                    {notification?.requestId && (
                      <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-border">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Request:</span>
                          <span className="text-xs font-mono text-foreground">#{notification?.requestId}</span>
                        </div>
                        {notification?.status && (
                          <StatusIndicator status={notification?.status} size="sm" />
                        )}
                      </div>
                    )}

                    {notification?.actionRequired && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ArrowRight"
                          iconPosition="right"
                        >
                          Take Action
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </div>
      {notifications?.length > 5 && (
        <div className="p-4 border-t border-border text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewAll && onViewAll()}
            iconName="ArrowDown"
            iconPosition="right"
          >
            View {notifications?.length - 5} more notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;