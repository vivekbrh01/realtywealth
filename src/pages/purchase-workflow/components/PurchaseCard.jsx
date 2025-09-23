import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PurchaseCard = ({ purchase, onViewDetails, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    const colors = {
      'property-identification': 'bg-blue-100 text-blue-800',
      'due-diligence': 'bg-yellow-100 text-yellow-800',
      'legal-verification': 'bg-purple-100 text-purple-800',
      'rera-compliance': 'bg-orange-100 text-orange-800',
      'financing-arrangement': 'bg-indigo-100 text-indigo-800',
      'documentation': 'bg-pink-100 text-pink-800',
      'final-acquisition': 'bg-green-100 text-green-800',
      'completed': 'bg-emerald-100 text-emerald-800',
      'on-hold': 'bg-gray-100 text-gray-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000)?.toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000)?.toFixed(2)} L`;
    }
    return `₹${amount?.toLocaleString('en-IN')}`;
  };

  const getProgressPercentage = (status) => {
    const stages = {
      'property-identification': 15,
      'due-diligence': 30,
      'legal-verification': 45,
      'rera-compliance': 60,
      'financing-arrangement': 75,
      'documentation': 90,
      'final-acquisition': 95,
      'completed': 100,
      'on-hold': 0
    };
    return stages?.[status] || 0;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{purchase?.clientName}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase?.status)}`}>
              {purchase?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Purchase ID: {purchase?.id}</p>
          <p className="text-sm text-gray-600">Property: {purchase?.propertyTitle}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">{formatCurrency(purchase?.investmentAmount)}</p>
          <p className="text-sm text-gray-500">Investment Amount</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-sm font-medium text-gray-900">{purchase?.location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Assigned Manager</p>
          <p className="text-sm font-medium text-gray-900">{purchase?.assignedManager}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Start Date</p>
          <p className="text-sm font-medium text-gray-900">{purchase?.startDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Expected Completion</p>
          <p className="text-sm font-medium text-gray-900">{purchase?.expectedCompletion}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{getProgressPercentage(purchase?.status)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage(purchase?.status)}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Icon name="Clock" size={16} />
          <span>Last updated: {purchase?.lastUpdated}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(purchase)}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onUpdateStatus(purchase)}
          >
            Update Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;