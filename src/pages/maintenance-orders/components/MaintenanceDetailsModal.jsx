import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MaintenanceDetailsModal = ({ isOpen, onClose, request, onUpdateStatus }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');

  const statusOptions = [
    { value: 'submitted', label: 'Submitted' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending-approval', label: 'Pending Approval' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = async () => {
    if (!newStatus) return;

    setIsUpdating(true);
    try {
      await onUpdateStatus(request?.id, newStatus, updateNotes);
      setNewStatus('');
      setUpdateNotes('');
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Maintenance Request #{request?.requestId}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                    <p className="text-sm text-gray-900">{request?.property?.name}</p>
                    <p className="text-xs text-gray-500">{request?.property?.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <p className="text-sm text-gray-900">{request?.client?.name}</p>
                    <p className="text-xs text-gray-500">{request?.client?.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Type</label>
                    <p className="text-sm text-gray-900 capitalize">{request?.maintenanceType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request?.priority)}`}>
                      {request?.priority}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                    <p className="text-sm text-gray-900">{formatDate(request?.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                    <p className="text-sm text-gray-900">{formatDate(request?.targetDate)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{request?.issueDescription}</p>
              </div>

              {request?.photos && request?.photos?.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {request?.photos?.map((photo, index) => (
                      <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={photo}
                          alt={`Issue photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity Timeline */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
                <div className="space-y-4">
                  {request?.timeline?.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="Clock" size={16} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity?.action}</p>
                        <p className="text-xs text-gray-500">{formatDate(activity?.timestamp)}</p>
                        {activity?.notes && (
                          <p className="text-xs text-gray-600 mt-1">{activity?.notes}</p>
                        )}
                      </div>
                    </div>
                  )) || (
                      <p className="text-sm text-gray-500">No activity recorded yet.</p>
                    )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
                <span className={`inline-flex px-3 py-2 text-sm font-semibold rounded-full ${getStatusColor(request?.status)}`}>
                  {request?.status?.replace('-', ' ')}
                </span>
              </div>

              {request?.assignedTo && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned To</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{request?.assignedTo?.name}</p>
                      <p className="text-xs text-gray-500">{request?.assignedTo?.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {request?.estimatedCost && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Estimate</h3>
                  <p className="text-2xl font-bold text-gray-900">₹{request?.estimatedCost?.toLocaleString('en-IN')}</p>
                  {request?.actualCost && (
                    <p className="text-sm text-gray-600 mt-2">
                      Actual: ₹{request?.actualCost?.toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              )}

              {/* Update Status Section */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
                <div className="space-y-4">
                  <Select
                    label="New Status"
                    options={statusOptions}
                    value={newStatus}
                    onChange={setNewStatus}
                    placeholder="Select new status"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Notes
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Add notes about this update..."
                      value={updateNotes}
                      onChange={(e) => setUpdateNotes(e?.target?.value)}
                    />
                  </div>

                  <Button
                    onClick={handleStatusUpdate}
                    disabled={!newStatus}
                    loading={isUpdating}
                    iconName="Save"
                    iconPosition="left"
                    className="w-full"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetailsModal;
