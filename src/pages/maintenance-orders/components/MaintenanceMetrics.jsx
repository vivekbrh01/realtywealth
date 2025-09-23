import React from 'react';
import Icon from '../../../components/AppIcon';

const MaintenanceMetrics = () => {
  const metrics = [
    {
      id: 1,
      title: "Open Requests",
      value: "47",
      change: "+12%",
      changeType: "increase",
      icon: "Wrench",
      color: "bg-orange-500"
    },
    {
      id: 2,
      title: "Avg Resolution Time",
      value: "3.2 days",
      change: "-8%",
      changeType: "decrease",
      icon: "Clock",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Client Satisfaction",
      value: "4.6/5",
      change: "+0.2",
      changeType: "increase",
      icon: "Star",
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "Monthly Cost",
      value: "₹2,45,000",
      change: "+15%",
      changeType: "increase",
      icon: "IndianRupee",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`${metric?.color} p-3 rounded-lg`}>
              <Icon name={metric?.icon} size={24} color="white" />
            </div>
            <div className={`flex items-center text-sm font-medium ${metric?.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
              <Icon
                name={metric?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'}
                size={16}
                className="mr-1"
              />
              {metric?.change}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric?.value}</h3>
            <p className="text-sm text-gray-600">{metric?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceMetrics;
