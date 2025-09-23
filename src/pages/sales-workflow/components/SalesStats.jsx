import React from 'react';
import Icon from '../../../components/AppIcon';

const SalesStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN')?.format(num);
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const statCards = [
    {
      title: 'Total Sales Value',
      value: formatCurrency(stats?.totalSalesValue),
      change: stats?.salesValueChange,
      icon: 'DollarSign',
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Active Orders',
      value: formatNumber(stats?.activeOrders),
      change: stats?.activeOrdersChange,
      icon: 'ShoppingCart',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Completed This Month',
      value: formatNumber(stats?.completedThisMonth),
      change: stats?.completedChange,
      icon: 'CheckCircle',
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      title: 'Average Deal Size',
      value: formatCurrency(stats?.averageDealSize),
      change: stats?.dealSizeChange,
      icon: 'Target',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{stat?.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat?.value}</p>

              {stat?.change !== undefined && (
                <div className="flex items-center mt-2">
                  <Icon
                    name={getChangeIcon(stat?.change)}
                    size={16}
                    className={`mr-1 ${getChangeColor(stat?.change)}`}
                  />
                  <span className={`text-sm font-medium ${getChangeColor(stat?.change)}`}>
                    {Math.abs(stat?.change)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              )}
            </div>

            <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesStats;