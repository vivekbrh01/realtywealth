import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateMaintenanceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    propertyId: '',
    clientId: '',
    maintenanceType: '',
    priority: '',
    issueDescription: '',
    preferredDate: '',
    photos: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyOptions = [
    { value: '1', label: 'Prestige Lakeside Habitat, Whitefield, Bangalore' },
    { value: '2', label: 'DLF Cyber City, Gurgaon, Delhi NCR' },
    { value: '3', label: 'Godrej Properties, Bandra East, Mumbai' },
    { value: '4', label: 'Brigade Gateway, Rajajinagar, Bangalore' },
    { value: '5', label: 'Hiranandani Gardens, Powai, Mumbai' }
  ];

  const clientOptions = [
    { value: '1', label: 'Rajesh Kumar Sharma' },
    { value: '2', label: 'Priya Patel' },
    { value: '3', label: 'Amit Singh' },
    { value: '4', label: 'Sneha Gupta' },
    { value: '5', label: 'Vikram Reddy' }
  ];

  const maintenanceTypeOptions = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'painting', label: 'Painting' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'cleaning', label: 'Deep Cleaning' },
    { value: 'security', label: 'Security Systems' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({
        propertyId: '',
        clientId: '',
        maintenanceType: '',
        priority: '',
        issueDescription: '',
        preferredDate: '',
        photos: []
      });
      onClose();
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create Maintenance Request</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Property"
              options={propertyOptions}
              value={formData?.propertyId}
              onChange={(value) => handleInputChange('propertyId', value)}
              required
              searchable
            />

            <Select
              label="Client"
              options={clientOptions}
              value={formData?.clientId}
              onChange={(value) => handleInputChange('clientId', value)}
              required
              searchable
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Maintenance Type"
              options={maintenanceTypeOptions}
              value={formData?.maintenanceType}
              onChange={(value) => handleInputChange('maintenanceType', value)}
              required
            />

            <Select
              label="Priority"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Description *
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Describe the maintenance issue in detail..."
              value={formData?.issueDescription}
              onChange={(e) => handleInputChange('issueDescription', e?.target?.value)}
              required
            />
          </div>

          <Input
            label="Preferred Date"
            type="date"
            value={formData?.preferredDate}
            onChange={(e) => handleInputChange('preferredDate', e?.target?.value)}
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Icon name="Upload" size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop photos
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Handle file upload logic here
                  console.log('Files selected:', e?.target?.files);
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Plus"
              iconPosition="left"
            >
              Create Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMaintenanceModal;