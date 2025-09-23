import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaintenanceTable = ({ requests, onViewDetails, onUpdateStatus }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'assigned':
        return 'bg-purple-100 text-purple-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending-approval':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const SortableHeader = ({ field, children }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <Icon
          name={sortField === field && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          className={sortField === field ? 'text-blue-600' : 'text-gray-400'}
        />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="requestId">Request ID</SortableHeader>
              <SortableHeader field="property">Property</SortableHeader>
              <SortableHeader field="client">Client</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Description
              </th>
              <SortableHeader field="priority">Priority</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="targetDate">Target Date</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests?.map((request) => (
              <tr key={request?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{request?.requestId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{request?.property?.name}</div>
                  <div className="text-sm text-gray-500">{request?.property?.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{request?.client?.name}</div>
                  <div className="text-sm text-gray-500">{request?.client?.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate" title={request?.issueDescription}>
                    {request?.issueDescription}
                  </div>
                  <div className="text-sm text-gray-500">{request?.maintenanceType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request?.priority)}`}>
                    {request?.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request?.assignedTo ? (
                    <div className="text-sm text-gray-900">{request?.assignedTo?.name}</div>
                  ) : (
                    <span className="text-sm text-gray-500">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request?.status)}`}>
                    {request?.status?.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(request?.targetDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(request)}
                      iconName="Eye"
                      iconSize={16}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onUpdateStatus(request)}
                      iconName="Edit"
                      iconSize={16}
                    >
                      Update
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

export default MaintenanceTable;