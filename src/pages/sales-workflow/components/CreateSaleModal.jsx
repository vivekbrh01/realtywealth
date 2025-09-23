import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateSaleModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    propertyId: '',
    saleAmount: '',
    assignedRM: '',
    targetDate: '',
    initialStage: 'inquiry',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const clientOptions = [
    { value: 'client-1', label: 'Rajesh Gupta - +91 98765 43210' },
    { value: 'client-2', label: 'Priya Mehta - +91 87654 32109' },
    { value: 'client-3', label: 'Amit Sharma - +91 76543 21098' },
    { value: 'client-4', label: 'Sneha Patel - +91 65432 10987' },
    { value: 'client-5', label: 'Vikram Reddy - +91 54321 09876' }
  ];

  const propertyOptions = [
    { value: 'prop-1', label: 'Prestige Lakeside - 3BHK Apartment (1,200 sq ft)' },
    { value: 'prop-2', label: 'Brigade Gateway - 2BHK Apartment (950 sq ft)' },
    { value: 'prop-3', label: 'Sobha City - 4BHK Villa (2,500 sq ft)' },
    { value: 'prop-4', label: 'Godrej Properties - 3BHK Apartment (1,350 sq ft)' },
    { value: 'prop-5', label: 'DLF Phase 3 - Commercial Space (800 sq ft)' }
  ];

  const rmOptions = [
    { value: 'rajesh-kumar', label: 'Rajesh Kumar' },
    { value: 'priya-sharma', label: 'Priya Sharma' },
    { value: 'amit-patel', label: 'Amit Patel' },
    { value: 'sneha-reddy', label: 'Sneha Reddy' },
    { value: 'vikram-singh', label: 'Vikram Singh' }
  ];

  const stageOptions = [
    { value: 'inquiry', label: 'Initial Inquiry' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'legal-verification', label: 'Legal Verification' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.clientId) newErrors.clientId = 'Client selection is required';
    if (!formData?.propertyId) newErrors.propertyId = 'Property selection is required';
    if (!formData?.saleAmount) newErrors.saleAmount = 'Sale amount is required';
    if (!formData?.assignedRM) newErrors.assignedRM = 'Relationship Manager assignment is required';
    if (!formData?.targetDate) newErrors.targetDate = 'Target completion date is required';

    if (formData?.saleAmount && isNaN(formData?.saleAmount)) {
      newErrors.saleAmount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: `SO${Date.now()}`,
        createdAt: new Date()?.toISOString(),
        status: formData?.initialStage
      });
      setFormData({
        clientId: '',
        propertyId: '',
        saleAmount: '',
        assignedRM: '',
        targetDate: '',
        initialStage: 'inquiry',
        notes: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Sales Order</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Select Client"
              options={clientOptions}
              value={formData?.clientId}
              onChange={(value) => handleInputChange('clientId', value)}
              error={errors?.clientId}
              required
              searchable
            />

            <Select
              label="Select Property"
              options={propertyOptions}
              value={formData?.propertyId}
              onChange={(value) => handleInputChange('propertyId', value)}
              error={errors?.propertyId}
              required
              searchable
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Sale Amount (₹)"
              type="number"
              placeholder="Enter sale amount"
              value={formData?.saleAmount}
              onChange={(e) => handleInputChange('saleAmount', e?.target?.value)}
              error={errors?.saleAmount}
              required
            />

            <Select
              label="Assign Relationship Manager"
              options={rmOptions}
              value={formData?.assignedRM}
              onChange={(value) => handleInputChange('assignedRM', value)}
              error={errors?.assignedRM}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Target Completion Date"
              type="date"
              value={formData?.targetDate}
              onChange={(e) => handleInputChange('targetDate', e?.target?.value)}
              error={errors?.targetDate}
              required
            />

            <Select
              label="Initial Stage"
              options={stageOptions}
              value={formData?.initialStage}
              onChange={(value) => handleInputChange('initialStage', value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter any additional notes or requirements..."
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
            />
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
              iconName="Plus"
            >
              Create Sales Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSaleModal;