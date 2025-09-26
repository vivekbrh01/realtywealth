import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusOverviewPanel = ({ statusCounts, onStatusClick }) => {
  const statusItems = [
    {
      key: 'pending',
      label: 'Pending',
      count: statusCounts?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    {
      key: 'approved',
      label: 'Approved',
      count: statusCounts?.approved,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      key: 'rejected',
      label: 'Rejected',
      count: statusCounts?.rejected,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    },
    {
      key: 'in-review',
      label: 'In Review',
      count: statusCounts?.inReview,
      icon: 'Eye',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statusItems?.map((item) => (
        <div
          key={item?.key}
          className={`bg-card border ${item?.borderColor} rounded-lg p-6 hover:shadow-modal transition-all duration-200 cursor-pointer`}
          onClick={() => onStatusClick && onStatusClick(item?.key)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <Icon name="ArrowUpRight" size={16} className="text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{item?.count}</p>
            <p className="text-sm text-muted-foreground">{item?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusOverviewPanel;