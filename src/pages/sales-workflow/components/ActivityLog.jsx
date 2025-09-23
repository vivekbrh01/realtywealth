import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityLog = ({ activities, orderId }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'status_update': 'RefreshCw',
      'assignment': 'Users',
      'communication': 'MessageSquare',
      'document_upload': 'Upload',
      'payment': 'CreditCard',
      'meeting': 'Calendar',
      'note': 'FileText'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'status_update': 'text-blue-600 bg-blue-100',
      'assignment': 'text-green-600 bg-green-100',
      'communication': 'text-purple-600 bg-purple-100',
      'document_upload': 'text-orange-600 bg-orange-100',
      'payment': 'text-emerald-600 bg-emerald-100',
      'meeting': 'text-indigo-600 bg-indigo-100',
      'note': 'text-gray-600 bg-gray-100'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-100';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date?.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const filteredActivities = orderId
    ? activities?.filter(activity => activity?.orderId === orderId)
    : activities;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
        <p className="text-sm text-gray-600 mt-1">
          {orderId ? `Activities for Order #${orderId}` : 'Recent activities across all orders'}
        </p>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Activity" size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No activities recorded yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="p-6">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                    <Icon
                      name={getActivityIcon(activity?.type)}
                      size={20}
                    />
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity?.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity?.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {formatTimestamp(activity?.timestamp)}
                        </p>
                        {activity?.orderId && !orderId && (
                          <p className="text-xs text-blue-600 mt-1">
                            Order #{activity?.orderId}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Activity Details */}
                    {activity?.details && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        {activity?.details?.previousStatus && activity?.details?.newStatus && (
                          <div className="flex items-center text-sm">
                            <span className="text-gray-600">Status changed from</span>
                            <span className="mx-2 px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                              {activity?.details?.previousStatus}
                            </span>
                            <span className="text-gray-600">to</span>
                            <span className="mx-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {activity?.details?.newStatus}
                            </span>
                          </div>
                        )}

                        {activity?.details?.assignedTo && (
                          <div className="text-sm text-gray-600">
                            Assigned to: <span className="font-medium">{activity?.details?.assignedTo}</span>
                          </div>
                        )}

                        {activity?.details?.amount && (
                          <div className="text-sm text-gray-600">
                            Amount: <span className="font-medium text-green-600">
                              {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                              })?.format(activity?.details?.amount)}
                            </span>
                          </div>
                        )}

                        {activity?.details?.documents && (
                          <div className="text-sm text-gray-600">
                            Documents: {activity?.details?.documents?.join(', ')}
                          </div>
                        )}
                      </div>
                    )}

                    {/* User Info */}
                    <div className="mt-3 flex items-center">
                      <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {activity?.user?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">
                        by {activity?.user}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;