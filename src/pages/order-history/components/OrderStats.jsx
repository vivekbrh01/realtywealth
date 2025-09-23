import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000)?.toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000)?.toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000)?.toFixed(0)}K`;
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders?.toLocaleString('en-IN'),
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue),
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8.5%',
      changeType: 'positive'
    },
    {
      title: 'Completed Orders',
      value: stats?.completedOrders?.toLocaleString('en-IN'),
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Completion Rate',
      value: `${stats?.completionRate}%`,
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+2.3%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${stat?.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
              <Icon
                name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'}
                size={16}
              />
              <span>{stat?.change}</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;