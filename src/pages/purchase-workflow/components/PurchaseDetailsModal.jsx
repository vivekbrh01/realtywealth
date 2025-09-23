import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import WorkflowTracker from './WorkflowTracker';
const PurchaseDetailsModal = ({ isOpen, onClose, purchase, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(purchase?.status || '');
  const [updateNote, setUpdateNote] = useState('');
  if (!isOpen || !purchase) return null;
  const statusOptions = [
    { value: 'property-identification', label: 'Property Identification' },
    { value: 'due-diligence', label: 'Due Diligence' },
    { value: 'legal-verification', label: 'Legal Verification' },
    { value: 'rera-compliance', label: 'RERA Compliance' },
    { value: 'financing-arrangement', label: 'Financing Arrangement' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'final-acquisition', label: 'Final Acquisition' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];
  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000)?.toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000)?.toFixed(2)} L`;
    }
    return `₹${amount?.toLocaleString('en-IN')}`;
  };
  const workflowStages = [
    {
      key: 'property-identification',
      title: 'Property Identification',
      description: 'Identifying and shortlisting properties based on client requirements',
      requirements: [
        { title: 'Client requirement analysis', completed: true },
        { title: 'Market research', completed: true },
        { title: 'Property shortlisting', completed: purchase?.status !== 'property-identification' }
      ],
      nextActions: purchase?.status === 'property-identification' ? [
        'Complete property shortlisting',
        'Schedule property visits',
        'Prepare comparative analysis'
      ] : null
    },
    {
      key: 'due-diligence',
      title: 'Due Diligence',
      description: 'Comprehensive property and market analysis',
      requirements: [
        { title: 'Property valuation', completed: purchase?.status !== 'due-diligence' && purchase?.status !== 'property-identification' },
        { title: 'Market analysis', completed: purchase?.status !== 'due-diligence' && purchase?.status !== 'property-identification' },
        { title: 'Risk assessment', completed: purchase?.status !== 'due-diligence' && purchase?.status !== 'property-identification' }
      ],
      nextActions: purchase?.status === 'due-diligence' ? [
        'Complete property valuation',
        'Finalize market analysis report',
        'Submit due diligence report'
      ] : null
    },
    {
      key: 'legal-verification',
      title: 'Legal Verification',
      description: 'Legal clearance and title verification process',
      requirements: [
        { title: 'Title verification', completed: false },
        { title: 'Legal clearance', completed: false },
        { title: 'Encumbrance check', completed: false }
      ]
    },
    {
      key: 'rera-compliance',
      title: 'RERA Compliance',
      description: 'RERA registration and compliance verification',
      requirements: [
        { title: 'RERA registration check', completed: false },
        { title: 'Compliance documentation', completed: false },
        { title: 'Regulatory approvals', completed: false }
      ]
    },
    {
      key: 'financing-arrangement',
      title: 'Financing Arrangement',
      description: 'Loan processing and financial arrangements',
      requirements: [
        { title: 'Loan application', completed: false },
        { title: 'Financial documentation', completed: false },
        { title: 'Loan approval', completed: false }
      ]
    },
    {
      key: 'documentation',
      title: 'Documentation',
      description: 'Agreement preparation and documentation',
      requirements: [
        { title: 'Sale agreement preparation', completed: false },
        { title: 'Document verification', completed: false },
        { title: 'Registration preparation', completed: false }
      ]
    },
    {
      key: 'final-acquisition',
      title: 'Final Acquisition',
      description: 'Property registration and handover',
      requirements: [
        { title: 'Property registration', completed: false },
        { title: 'Payment completion', completed: false },
        { title: 'Key handover', completed: false }
      ]
    }
  ];
  const handleStatusUpdate = () => {
    if (selectedStatus && selectedStatus !== purchase?.status) {
      onStatusUpdate(purchase?.id, selectedStatus, updateNote);
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-
[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-
gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Purchase
              Details</h2>
            <p className="text-sm text-gray-600">Purchase ID:
              {purchase?.id}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Panel - Purchase Information */}
          <div className="w-1/3 p-6 border-r border-gray-200 overflow-y-auto">
            <div className="space-y-6">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Client
                  Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Client Name</p>
                    <p className="font-medium text-
gray-900">{purchase?.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Client Type</p>
                    <p className="font-medium text-
gray-900">{purchase?.clientType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium text-
gray-900">{purchase?.contactNumber}</p>
                  </div>
                </div>
              </div>
              {/* Property Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property
                  Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Property Title</p>
                    <p className="font-medium text-
gray-900">{purchase?.propertyTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{purchase?.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Investment Amount</p>
                    <p className="text-xl font-bold text-
gray-900">{formatCurrency(purchase?.investmentAmount)}</p>
                  </div>
                </div>
              </div>
              {/* Assignment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 
mb-3">Assignment</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Assigned Manager</p>
                    <p className="font-medium text-
gray-900">{purchase?.assignedManager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-
gray-900">{purchase?.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Completion</p>
                    <p className="font-medium text-
gray-900">{purchase?.expectedCompletion}</p>
                  </div>
                </div>
              </div>
              {/* Status Update */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Update
                  Status</h3>

                <Select
                  label="New Status"
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  placeholder="Select new status"
                  className="mb-3"
                />
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Note
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Add a note about this status update..."
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e?.target?.value)}
                  />
                </div>
                <Button
                  onClick={handleStatusUpdate}
                  disabled={!selectedStatus || selectedStatus === purchase?.status}
                  iconName="RefreshCw"
                  iconPosition="left"
                  fullWidth
                >
                  Update Status
                </Button>
              </div>
            </div>
          </div>
          {/* Right Panel - Workflow Tracker */}
          <div className="flex-1 p-6 overflow-y-auto">
            <WorkflowTracker
              currentStage={purchase?.status}
              stages={workflowStages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailsModal;
