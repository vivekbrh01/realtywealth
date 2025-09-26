
import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import StatusIndicator from './StatusIndicator';

const RequestCard = ({
  request,
  onAction,
  displayMode = 'default',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleAction = (actionType) => {
    if (onAction) {
      onAction(actionType, request);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getRequestTypeIcon = (type) => {
    const iconMap = {
      'expense': 'Receipt',
      'leave': 'Calendar',
      'purchase': 'ShoppingCart',
      'travel': 'Plane',
      'equipment': 'Monitor',
      'budget': 'DollarSign',
      'contract': 'FileText',
      'default': 'FileText'
    };
    return iconMap?.[type] || iconMap?.default;
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      'high': 'text-error',
      'medium': 'text-warning',
      'low': 'text-success',
      'urgent': 'text-error'
    };
    return colorMap?.[priority] || 'text-muted-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card hover:shadow-modal transition-all duration-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={getRequestTypeIcon(request?.type)} size={20} className="text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-foreground text-lg truncate">{request?.title}</h3>
                {request?.priority && (
                  <div className="flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} className={getPriorityColor(request?.priority)} />
                    <span className={`text-xs font-medium capitalize ${getPriorityColor(request?.priority)}`}>
                      {request?.priority}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="font-mono">#{request?.id}</span>
                <span>{formatDate(request?.createdAt)}</span>
                <span>{formatTime(request?.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <StatusIndicator status={request?.status} size="sm" />
            <button
              onClick={toggleExpanded}
              className="p-1 text-muted-foreground hover:text-foreground transition-smooth rounded"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {request?.description}
          </p>
        </div>

        {/* Amount & Category */}
        {(request?.amount || request?.category) && (
          <div className="flex items-center space-x-6 mb-4 text-sm">
            {request?.amount && (
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={14} className="text-muted-foreground" />
                <span className="font-mono font-medium text-foreground">{request?.amount}</span>
              </div>
            )}
            {request?.category && (
              <div className="flex items-center space-x-2">
                <Icon name="Tag" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">{request?.category}</span>
              </div>
            )}
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-border pt-4 mt-4 space-y-4">
            {request?.assignedTo && (
              <div className="flex items-center space-x-3">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Assigned to:</span>
                <span className="text-sm font-medium text-foreground">{request?.assignedTo}</span>
              </div>
            )}

            {request?.dueDate && (
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Due date:</span>
                <span className="text-sm font-medium text-foreground">{formatDate(request?.dueDate)}</span>
              </div>
            )}

            {request?.attachments && request?.attachments?.length > 0 && (
              <div className="flex items-center space-x-3">
                <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {request?.attachments?.length} attachment{request?.attachments?.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction('view')}
              iconName="Eye"
              iconPosition="left"
            >
              View Details
            </Button>

            {request?.status === 'draft' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAction('edit')}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {request?.status === 'pending' && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAction('withdraw')}
                  iconName="X"
                  iconPosition="left"
                >
                  Withdraw
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('follow-up')}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Follow Up
                </Button>
              </>
            )}

            {request?.status === 'approved' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction('download')}
                iconName="Download"
                iconPosition="left"
              >
                Download
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;