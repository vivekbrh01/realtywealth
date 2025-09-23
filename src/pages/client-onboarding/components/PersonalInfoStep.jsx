import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoStep = ({ formData, updateFormData, errors }) => {
  const titleOptions = [
    { value: 'mr', label: 'Mr.' },
    { value: 'mrs', label: 'Mrs.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'dr', label: 'Dr.' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ];

  const stateOptions = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('personalInfo', { ...formData?.personalInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            label="Title"
            options={titleOptions}
            value={formData?.personalInfo?.title || ''}
            onChange={(value) => handleInputChange('title', value)}
            error={errors?.title}
            required
          />

          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={formData?.personalInfo?.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            className="md:col-span-1"
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={formData?.personalInfo?.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />

          <Input
            label="Date of Birth"
            type="date"
            value={formData?.personalInfo?.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            error={errors?.dateOfBirth}
            required
          />

          <Select
            label="Gender"
            options={genderOptions}
            value={formData?.personalInfo?.gender || ''}
            onChange={(value) => handleInputChange('gender', value)}
            error={errors?.gender}
            required
          />

          <Select
            label="Marital Status"
            options={maritalStatusOptions}
            value={formData?.personalInfo?.maritalStatus || ''}
            onChange={(value) => handleInputChange('maritalStatus', value)}
            error={errors?.maritalStatus}
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData?.personalInfo?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            description="Primary contact email for all communications"
          />

          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData?.personalInfo?.mobile || ''}
            onChange={(e) => handleInputChange('mobile', e?.target?.value)}
            error={errors?.mobile}
            required
            pattern="[0-9]{10}"
          />

          <Input
            label="Alternate Mobile"
            type="tel"
            placeholder="Enter alternate mobile number"
            value={formData?.personalInfo?.alternateMobile || ''}
            onChange={(e) => handleInputChange('alternateMobile', e?.target?.value)}
            error={errors?.alternateMobile}
            pattern="[0-9]{10}"
          />

          <Input
            label="Landline Number"
            type="tel"
            placeholder="Enter landline with STD code"
            value={formData?.personalInfo?.landline || ''}
            onChange={(e) => handleInputChange('landline', e?.target?.value)}
            error={errors?.landline}
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Address Information
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Address Line 1"
            type="text"
            placeholder="House/Flat No., Building Name"
            value={formData?.personalInfo?.addressLine1 || ''}
            onChange={(e) => handleInputChange('addressLine1', e?.target?.value)}
            error={errors?.addressLine1}
            required
          />

          <Input
            label="Address Line 2"
            type="text"
            placeholder="Street, Area, Locality"
            value={formData?.personalInfo?.addressLine2 || ''}
            onChange={(e) => handleInputChange('addressLine2', e?.target?.value)}
            error={errors?.addressLine2}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="City"
              type="text"
              placeholder="Enter city"
              value={formData?.personalInfo?.city || ''}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
              error={errors?.city}
              required
            />

            <Select
              label="State"
              options={stateOptions}
              value={formData?.personalInfo?.state || ''}
              onChange={(value) => handleInputChange('state', value)}
              error={errors?.state}
              required
              searchable
            />

            <Input
              label="PIN Code"
              type="text"
              placeholder="Enter 6-digit PIN"
              value={formData?.personalInfo?.pinCode || ''}
              onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
              error={errors?.pinCode}
              required
              pattern="[0-9]{6}"
              maxLength={6}
            />

            <Input
              label="Country"
              type="text"
              value="India"
              disabled
              className="bg-muted"
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Identity Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="PAN Number"
            type="text"
            placeholder="Enter PAN number (e.g., ABCDE1234F)"
            value={formData?.personalInfo?.panNumber || ''}
            onChange={(e) => handleInputChange('panNumber', e?.target?.value?.toUpperCase())}
            error={errors?.panNumber}
            required
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            maxLength={10}
            description="Permanent Account Number as per Income Tax Department"
          />

          <Input
            label="Aadhaar Number"
            type="text"
            placeholder="Enter 12-digit Aadhaar number"
            value={formData?.personalInfo?.aadhaarNumber || ''}
            onChange={(e) => handleInputChange('aadhaarNumber', e?.target?.value)}
            error={errors?.aadhaarNumber}
            pattern="[0-9]{12}"
            maxLength={12}
            description="Optional - for enhanced KYC verification"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;