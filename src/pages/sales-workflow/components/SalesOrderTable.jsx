import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesOrderTable = ({ orders, onStatusUpdate, onViewDetails, onAssignEmployee }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      'inquiry': 'bg-blue-100 text-blue-800',
      'documentation': 'bg-yellow-100 text-yellow-800',
      'legal-verification': 'bg-purple-100 text-purple-800',
      'payment-processing': 'bg-orange-100 text-orange-800',
      'final-transfer': 'bg-green-100 text-green-800',
      'completed': 'bg-emerald-100 text-emerald-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return statusColors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sale Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned RM
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order) => (
              <tr key={order?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order?.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon name="User" size={20} className="text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{order?.clientName}</div>
                      <div className="text-sm text-gray-500">{order?.clientPhone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order?.propertyTitle}</div>
                  <div className="text-sm text-gray-500">{order?.propertyLocation}</div>
                  <div className="text-xs text-gray-400">{order?.propertyType} • {order?.carpetArea} sq ft</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(order?.saleAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                    {order?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-800">
                        {order?.assignedRM?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div className="ml-2 text-sm text-gray-900">{order?.assignedRM}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(order?.targetDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(order)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onStatusUpdate(order)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Users"
                      onClick={() => onAssignEmployee(order)}
                    >
                      Assign
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesOrderTable;