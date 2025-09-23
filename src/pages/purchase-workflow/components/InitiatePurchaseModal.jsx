import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const InitiatePurchaseModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientType: '',
    contactNumber: '',
    email: '',
    budgetMin: '',
    budgetMax: '',
    preferredLocations: [],
    propertyType: '',
    carpetAreaMin: '',
    carpetAreaMax: '',
    amenities: [],
    urgency: '',
    assignedManager: '',
    specialRequirements: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  if (!isOpen) return null;

  const clientTypeOptions = [
    { value: 'hni', label: 'High Net Worth Individual' },
    { value: 'corporate', label: 'Corporate Client' },
    { value: 'institutional', label: 'Institutional Investor' },
    { value: 'individual', label: 'Individual Investor' }
  ];

  const locationOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' }
  ];

  const propertyTypeOptions = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'commercial', label: 'Commercial Space' },
    { value: 'plot', label: 'Plot/Land' }
  ];

  const managerOptions = [
    { value: 'rajesh-kumar', label: 'Rajesh Kumar' },
    { value: 'priya-sharma', label: 'Priya Sharma' },
    { value: 'amit-patel', label: 'Amit Patel' },
    { value: 'sneha-gupta', label: 'Sneha Gupta' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low (3-6 months)' },
    { value: 'medium', label: 'Medium (1-3 months)' },
    { value: 'high', label: 'High (Within 1 month)' },
    { value: 'urgent', label: 'Urgent (Within 2 weeks)' }
  ];

  const amenityOptions = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Power Backup',
    'Elevator', 'Garden', 'Club House', 'Children Play Area', 'CCTV'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
            <Input
              label="Client Name"
              type="text"
              placeholder="Enter client full name"
              value={formData?.clientName}
              onChange={(e) => handleInputChange('clientName', e?.target?.value)}
              required
            />
            <Select
              label="Client Type"
              options={clientTypeOptions}
              value={formData?.clientType}
              onChange={(value) => handleInputChange('clientType', value)}
              placeholder="Select client type"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Contact Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData?.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e?.target?.value)}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="client@example.com"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Minimum Budget (₹)"
                type="number"
                placeholder="5000000"
                value={formData?.budgetMin}
                onChange={(e) => handleInputChange('budgetMin', e?.target?.value)}
                description="Enter amount in rupees"
                required
              />

              <Input
                label="Maximum Budget (₹)"
                type="number"
                placeholder="10000000"
                value={formData?.budgetMax}
                onChange={(e) => handleInputChange('budgetMax', e?.target?.value)}
                description="Enter amount in rupees"
                required
              />
            </div>
            <Select
              label="Preferred Locations"
              options={locationOptions}
              value={formData?.preferredLocations}
              onChange={(value) => handleInputChange('preferredLocations', value)}
              placeholder="Select preferred locations"
              multiple
              searchable
              required
            />
            <Select
              label="Urgency Level"
              options={urgencyOptions}
              value={formData?.urgency}
              onChange={(value) => handleInputChange('urgency', value)}
              placeholder="Select urgency level"
              required
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Specifications</h3>
            <Select
              label="Property Type"
              options={propertyTypeOptions}
              value={formData?.propertyType}
              onChange={(value) => handleInputChange('propertyType', value)}
              placeholder="Select property type"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Min Carpet Area (sq ft)"
                type="number"
                placeholder="1000"
                value={formData?.carpetAreaMin}
                onChange={(e) => handleInputChange('carpetAreaMin', e?.target?.value)}
                description="Minimum carpet area required"
              />

              <Input
                label="Max Carpet Area (sq ft)"
                type="number"
                placeholder="2000"
                value={formData?.carpetAreaMax}
                onChange={(e) => handleInputChange('carpetAreaMax', e?.target?.value)}
                description="Maximum carpet area preferred"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Required Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {amenityOptions?.map((amenity) => (
                  <Checkbox
                    key={amenity}
                    label={amenity}
                    checked={formData?.amenities?.includes(amenity)}
                    onChange={(e) => handleArrayChange('amenities', amenity, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment & Requirements</h3>
            <Select
              label="Assigned Relationship Manager"
              options={managerOptions}
              value={formData?.assignedManager}
              onChange={(value) => handleInputChange('assignedManager', value)}
              placeholder="Select relationship manager"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Enter any special requirements, preferences, or additional notes..."
                value={formData?.specialRequirements}
                onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Purchase Workflow Summary</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Property identification and shortlisting</li>
                <li>• Due diligence and market analysis</li>
                <li>• Legal verification and title clearance</li>
                <li>• RERA compliance and regulatory checks</li>
                <li>• Financing arrangement and approval</li>
                <li>• Documentation and agreement preparation</li>
                <li>• Final acquisition and handover</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Initiate Purchase Workflow</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    iconName="Check"
                    iconPosition="left"
                  >
                    Initiate Purchase
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitiatePurchaseModal;