import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FinancialProfileStep = ({ formData, updateFormData, errors }) => {
  const occupationOptions = [
    { value: 'salaried', label: 'Salaried Employee' },
    { value: 'business', label: 'Business Owner' },
    { value: 'professional', label: 'Professional (Doctor/Lawyer/CA)' },
    { value: 'retired', label: 'Retired' },
    { value: 'housewife', label: 'Housewife' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' }
  ];

  const incomeRangeOptions = [
    { value: '0-3', label: 'Below ₹3 Lakhs' },
    { value: '3-5', label: '₹3 - ₹5 Lakhs' },
    { value: '5-10', label: '₹5 - ₹10 Lakhs' },
    { value: '10-25', label: '₹10 - ₹25 Lakhs' },
    { value: '25-50', label: '₹25 - ₹50 Lakhs' },
    { value: '50-100', label: '₹50 Lakhs - ₹1 Crore' },
    { value: '100+', label: 'Above ₹1 Crore' }
  ];

  const networthRangeOptions = [
    { value: '0-10', label: 'Below ₹10 Lakhs' },
    { value: '10-25', label: '₹10 - ₹25 Lakhs' },
    { value: '25-50', label: '₹25 - ₹50 Lakhs' },
    { value: '50-100', label: '₹50 Lakhs - ₹1 Crore' },
    { value: '100-500', label: '₹1 - ₹5 Crores' },
    { value: '500+', label: 'Above ₹5 Crores' }
  ];

  const bankOptions = [
    { value: 'sbi', label: 'State Bank of India' },
    { value: 'hdfc', label: 'HDFC Bank' },
    { value: 'icici', label: 'ICICI Bank' },
    { value: 'axis', label: 'Axis Bank' },
    { value: 'kotak', label: 'Kotak Mahindra Bank' },
    { value: 'pnb', label: 'Punjab National Bank' },
    { value: 'bob', label: 'Bank of Baroda' },
    { value: 'canara', label: 'Canara Bank' },
    { value: 'other', label: 'Other Bank' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('financialProfile', { ...formData?.financialProfile, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Employment & Income Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Occupation"
            options={occupationOptions}
            value={formData?.financialProfile?.occupation || ''}
            onChange={(value) => handleInputChange('occupation', value)}
            error={errors?.occupation}
            required
          />

          <Input
            label="Company/Organization Name"
            type="text"
            placeholder="Enter company or organization name"
            value={formData?.financialProfile?.companyName || ''}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            error={errors?.companyName}
            required
          />

          <Input
            label="Designation"
            type="text"
            placeholder="Enter job title or designation"
            value={formData?.financialProfile?.designation || ''}
            onChange={(e) => handleInputChange('designation', e?.target?.value)}
            error={errors?.designation}
          />

          <Input
            label="Years of Experience"
            type="number"
            placeholder="Enter total work experience"
            value={formData?.financialProfile?.experience || ''}
            onChange={(e) => handleInputChange('experience', e?.target?.value)}
            error={errors?.experience}
            min="0"
            max="50"
          />

          <Select
            label="Annual Income Range"
            options={incomeRangeOptions}
            value={formData?.financialProfile?.incomeRange || ''}
            onChange={(value) => handleInputChange('incomeRange', value)}
            error={errors?.incomeRange}
            required
            description="Gross annual income from all sources"
          />

          <Select
            label="Net Worth Range"
            options={networthRangeOptions}
            value={formData?.financialProfile?.networthRange || ''}
            onChange={(value) => handleInputChange('networthRange', value)}
            error={errors?.networthRange}
            required
            description="Total assets minus liabilities"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Banking Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Primary Bank"
            options={bankOptions}
            value={formData?.financialProfile?.primaryBank || ''}
            onChange={(value) => handleInputChange('primaryBank', value)}
            error={errors?.primaryBank}
            required
            searchable
          />

          <Input
            label="Account Number"
            type="text"
            placeholder="Enter bank account number"
            value={formData?.financialProfile?.accountNumber || ''}
            onChange={(e) => handleInputChange('accountNumber', e?.target?.value)}
            error={errors?.accountNumber}
            required
            description="Primary savings/current account"
          />

          <Input
            label="IFSC Code"
            type="text"
            placeholder="Enter IFSC code"
            value={formData?.financialProfile?.ifscCode || ''}
            onChange={(e) => handleInputChange('ifscCode', e?.target?.value?.toUpperCase())}
            error={errors?.ifscCode}
            required
            pattern="[A-Z]{4}[0-9]{7}"
            maxLength={11}
          />

          <Input
            label="Branch Name"
            type="text"
            placeholder="Enter branch name"
            value={formData?.financialProfile?.branchName || ''}
            onChange={(e) => handleInputChange('branchName', e?.target?.value)}
            error={errors?.branchName}
            required
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Investment Experience
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Real Estate Investment Experience"
            type="number"
            placeholder="Years of experience"
            value={formData?.financialProfile?.realEstateExperience || ''}
            onChange={(e) => handleInputChange('realEstateExperience', e?.target?.value)}
            error={errors?.realEstateExperience}
            min="0"
            max="50"
            description="Years of direct real estate investment"
          />

          <Input
            label="Current Real Estate Holdings"
            type="number"
            placeholder="Number of properties"
            value={formData?.financialProfile?.currentHoldings || ''}
            onChange={(e) => handleInputChange('currentHoldings', e?.target?.value)}
            error={errors?.currentHoldings}
            min="0"
            description="Existing property portfolio size"
          />

          <Input
            label="Investment Budget Range (₹)"
            type="text"
            placeholder="e.g., 50 Lakhs - 1 Crore"
            value={formData?.financialProfile?.investmentBudget || ''}
            onChange={(e) => handleInputChange('investmentBudget', e?.target?.value)}
            error={errors?.investmentBudget}
            description="Preferred investment range for new properties"
          />

          <Input
            label="Investment Timeline"
            type="text"
            placeholder="e.g., 6 months, 1 year"
            value={formData?.financialProfile?.investmentTimeline || ''}
            onChange={(e) => handleInputChange('investmentTimeline', e?.target?.value)}
            error={errors?.investmentTimeline}
            description="Expected timeline for next investment"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Financial Goals & Objectives
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Primary Investment Objective"
            type="text"
            placeholder="e.g., Capital appreciation, Rental income, Portfolio diversification"
            value={formData?.financialProfile?.primaryObjective || ''}
            onChange={(e) => handleInputChange('primaryObjective', e?.target?.value)}
            error={errors?.primaryObjective}
            required
          />

          <Input
            label="Risk Tolerance"
            type="text"
            placeholder="e.g., Conservative, Moderate, Aggressive"
            value={formData?.financialProfile?.riskTolerance || ''}
            onChange={(e) => handleInputChange('riskTolerance', e?.target?.value)}
            error={errors?.riskTolerance}
            required
          />

          <Input
            label="Expected Annual Returns (%)"
            type="number"
            placeholder="Expected return percentage"
            value={formData?.financialProfile?.expectedReturns || ''}
            onChange={(e) => handleInputChange('expectedReturns', e?.target?.value)}
            error={errors?.expectedReturns}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialProfileStep;