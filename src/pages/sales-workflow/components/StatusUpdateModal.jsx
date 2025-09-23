import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || '');
  const [notes, setNotes] = useState('');
  const [attachments, setAttachments] = useState([]);

  const statusOptions = [
    { value: 'inquiry', label: 'Initial Inquiry', description: 'Client has shown interest' },
    { value: 'documentation', label: 'Documentation', description: 'Collecting required documents' },
    { value: 'legal-verification', label: 'Legal Verification', description: 'Legal team verification in progress' },
    { value: 'payment-processing', label: 'Payment Processing', description: 'Processing payment and agreements' },
    { value: 'final-transfer', label: 'Final Transfer', description: 'Property transfer in progress' },
    { value: 'completed', label: 'Completed', description: 'Sale successfully completed' },
    { value: 'cancelled', label: 'Cancelled', description: 'Sale has been cancelled' }
  ];

  const getStatusRequirements = (status) => {
    const requirements = {
      'documentation': [
        'Client KYC documents',
        'Property title verification',
        'NOC from society/builder',
        'Property tax clearance'
      ],
      'legal-verification': [
        'Title deed verification',
        'Encumbrance certificate',
        'RERA registration check',
        'Legal opinion report'
      ],
      'payment-processing': [
        'Sale agreement execution',
        'Token amount receipt',
        'Loan documentation (if applicable)',
        'Payment schedule confirmation'
      ],
      'final-transfer': [
        'Registration documents',
        'Stamp duty payment',
        'Property handover checklist',
        'Utility transfer completion'
      ]
    };
    return requirements?.[status] || [];
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onUpdate({
      orderId: order?.id,
      newStatus: selectedStatus,
      notes,
      attachments,
      updatedAt: new Date()?.toISOString(),
      updatedBy: 'Current User' // In real app, this would be from auth context
    });
    onClose();
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    setAttachments(prev => [...prev, ...files?.map(file => ({
      name: file?.name,
      size: file?.size,
      type: file?.type,
      uploadedAt: new Date()?.toISOString()
    }))]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev?.filter((_, i) => i !== index));
  };

  if (!isOpen || !order) return null;

  const currentStatusIndex = statusOptions?.findIndex(s => s?.value === order?.status);
  const selectedStatusIndex = statusOptions?.findIndex(s => s?.value === selectedStatus);
  const isProgressiveUpdate = selectedStatusIndex > currentStatusIndex;
  const requirements = getStatusRequirements(selectedStatus);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Update Order Status</h2>
            <p className="text-sm text-gray-600 mt-1">Order #{order?.id} - {order?.clientName}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Status</h3>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {statusOptions?.find(s => s?.value === order?.status)?.label}
              </span>
              <span className="ml-3 text-sm text-gray-600">
                Since {new Date(order.updatedAt || order.createdAt)?.toLocaleDateString('en-IN')}
              </span>
            </div>
          </div>

          {/* New Status Selection */}
          <Select
            label="Update to Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            required
          />

          {/* Status Requirements */}
          {requirements?.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Icon name="AlertTriangle" size={20} className="text-yellow-600 mr-2" />
                <h4 className="text-sm font-medium text-yellow-800">Requirements for {statusOptions?.find(s => s?.value === selectedStatus)?.label}</h4>
              </div>
              <ul className="space-y-2">
                {requirements?.map((req, index) => (
                  <li key={index} className="flex items-center text-sm text-yellow-700">
                    <Icon name="Check" size={14} className="text-yellow-600 mr-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress Indicator */}
          {isProgressiveUpdate && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <Icon name="TrendingUp" size={20} className="text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">
                  Progressive Update: Moving forward in the sales pipeline
                </span>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Notes
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add notes about this status update..."
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
              required
            />
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attach Documents
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Icon name="Upload" size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload documents</span>
                <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</span>
              </label>
            </div>

            {/* Attachment List */}
            {attachments?.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments?.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <Icon name="File" size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{file?.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({(file?.size / 1024 / 1024)?.toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => removeAttachment(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Save"
            >
              Update Status
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;