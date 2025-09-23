import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'status-update': 'RefreshCw',
      'document-upload': 'Upload',
      'client-communication': 'MessageCircle',
      'verification': 'Shield',
      'approval': 'CheckCircle',
      'assignment': 'UserPlus',
      'note': 'FileText',
      'meeting': 'Calendar',
      'call': 'Phone',
      'email': 'Mail'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'status-update': 'text-blue-600 bg-blue-100',
      'document-upload': 'text-green-600 bg-green-100',
      'client-communication': 'text-purple-600 bg-purple-100',
      'verification': 'text-orange-600 bg-orange-100',
      'approval': 'text-emerald-600 bg-emerald-100',
      'assignment': 'text-indigo-600 bg-indigo-100',
      'note': 'text-gray-600 bg-gray-100',
      'meeting': 'text-pink-600 bg-pink-100',
      'call': 'text-yellow-600 bg-yellow-100',
      'email': 'text-cyan-600 bg-cyan-100'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-100';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return activityTime?.toLocaleDateString('en-IN');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start gap-4">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
              ${getActivityColor(activity?.type)}
            `}>
              <Icon name={getActivityIcon(activity?.type)} size={18} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity?.title}
                </p>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                {activity?.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Icon name="User" size={12} />
                  {activity?.performedBy}
                </span>

                {activity?.purchaseId && (
                  <span className="flex items-center gap-1">
                    <Icon name="Hash" size={12} />
                    {activity?.purchaseId}
                  </span>
                )}

                {activity?.stage && (
                  <span className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    {activity?.stage}
                  </span>
                )}
              </div>

              {activity?.attachments && activity?.attachments?.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <Icon name="Paperclip" size={14} className="text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {activity?.attachments?.map((attachment, attachIndex) => (
                      <span
                        key={attachIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {attachment}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {index < activities?.length - 1 && (
              <div className="absolute left-9 mt-10 w-0.5 h-6 bg-gray-200"
                style={{ marginLeft: '-1px' }} />
            )}
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No activities recorded yet</p>
          <p className="text-sm text-gray-400">Activities will appear here as the purchase workflow progresses</p>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;