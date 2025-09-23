import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const InvestmentPreferencesStep = ({ formData, updateFormData, errors }) => {
  const propertyTypeOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'retail', label: 'Retail' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'mixed-use', label: 'Mixed Use' }
  ];

  const locationPreferences = [
    { id: 'mumbai', label: 'Mumbai' },
    { id: 'delhi', label: 'Delhi NCR' },
    { id: 'bangalore', label: 'Bangalore' },
    { id: 'pune', label: 'Pune' },
    { id: 'hyderabad', label: 'Hyderabad' },
    { id: 'chennai', label: 'Chennai' },
    { id: 'kolkata', label: 'Kolkata' },
    { id: 'ahmedabad', label: 'Ahmedabad' },
    { id: 'surat', label: 'Surat' },
    { id: 'jaipur', label: 'Jaipur' }
  ];

  const amenityPreferences = [
    { id: 'parking', label: 'Dedicated Parking' },
    { id: 'security', label: '24/7 Security' },
    { id: 'gym', label: 'Gymnasium' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'garden', label: 'Garden/Landscaping' },
    { id: 'clubhouse', label: 'Clubhouse' },
    { id: 'playground', label: 'Children\'s Play Area' },
    { id: 'elevator', label: 'Elevator/Lift' },
    { id: 'generator', label: 'Power Backup' },
    { id: 'water', label: 'Water Supply 24/7' }
  ];

  const investmentStrategies = [
    { id: 'buy-hold', label: 'Buy and Hold' },
    { id: 'rental-income', label: 'Rental Income Focus' },
    { id: 'capital-appreciation', label: 'Capital Appreciation' },
    { id: 'fix-flip', label: 'Fix and Flip' },
    { id: 'commercial-lease', label: 'Commercial Leasing' },
    { id: 'reit', label: 'REIT Investment' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('investmentPreferences', { ...formData?.investmentPreferences, [field]: value });
  };

  const handleCheckboxChange = (field, itemId, checked) => {
    const currentValues = formData?.investmentPreferences?.[field] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, itemId];
    } else {
      newValues = currentValues?.filter(id => id !== itemId);
    }
    
    handleInputChange(field, newValues);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Property Type Preferences
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Primary Property Type"
            options={propertyTypeOptions}
            value={formData?.investmentPreferences?.primaryPropertyType || ''}
            onChange={(value) => handleInputChange('primaryPropertyType', value)}
            error={errors?.primaryPropertyType}
            required
            description="Main focus for investment portfolio"
          />

          <Select
            label="Secondary Property Type"
            options={propertyTypeOptions}
            value={formData?.investmentPreferences?.secondaryPropertyType || ''}
            onChange={(value) => handleInputChange('secondaryPropertyType', value)}
            error={errors?.secondaryPropertyType}
            description="Alternative investment option"
          />

          <Input
            label="Minimum Property Size (sq ft)"
            type="number"
            placeholder="Enter minimum area requirement"
            value={formData?.investmentPreferences?.minPropertySize || ''}
            onChange={(e) => handleInputChange('minPropertySize', e?.target?.value)}
            error={errors?.minPropertySize}
            min="100"
          />

          <Input
            label="Maximum Property Size (sq ft)"
            type="number"
            placeholder="Enter maximum area preference"
            value={formData?.investmentPreferences?.maxPropertySize || ''}
            onChange={(e) => handleInputChange('maxPropertySize', e?.target?.value)}
            error={errors?.maxPropertySize}
            min="100"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Location Preferences
        </h3>
        
        <CheckboxGroup 
          label="Preferred Cities/Regions" 
          error={errors?.locationPreferences}
          className="mb-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {locationPreferences?.map((location) => (
              <Checkbox
                key={location?.id}
                label={location?.label}
                checked={(formData?.investmentPreferences?.locationPreferences || [])?.includes(location?.id)}
                onChange={(e) => handleCheckboxChange('locationPreferences', location?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </CheckboxGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Specific Area/Locality Preferences"
            type="text"
            placeholder="e.g., Bandra West, Gurgaon Sector 45"
            value={formData?.investmentPreferences?.specificAreas || ''}
            onChange={(e) => handleInputChange('specificAreas', e?.target?.value)}
            error={errors?.specificAreas}
            description="Comma-separated list of preferred areas"
          />

          <Input
            label="Maximum Distance from City Center (km)"
            type="number"
            placeholder="Enter maximum distance"
            value={formData?.investmentPreferences?.maxDistanceFromCenter || ''}
            onChange={(e) => handleInputChange('maxDistanceFromCenter', e?.target?.value)}
            error={errors?.maxDistanceFromCenter}
            min="1"
            max="100"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Amenity Preferences
        </h3>
        
        <CheckboxGroup 
          label="Desired Amenities" 
          error={errors?.amenityPreferences}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {amenityPreferences?.map((amenity) => (
              <Checkbox
                key={amenity?.id}
                label={amenity?.label}
                checked={(formData?.investmentPreferences?.amenityPreferences || [])?.includes(amenity?.id)}
                onChange={(e) => handleCheckboxChange('amenityPreferences', amenity?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Investment Strategy
        </h3>
        
        <CheckboxGroup 
          label="Investment Strategies of Interest" 
          error={errors?.investmentStrategies}
          className="mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {investmentStrategies?.map((strategy) => (
              <Checkbox
                key={strategy?.id}
                label={strategy?.label}
                checked={(formData?.investmentPreferences?.investmentStrategies || [])?.includes(strategy?.id)}
                onChange={(e) => handleCheckboxChange('investmentStrategies', strategy?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </CheckboxGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Expected Rental Yield (%)"
            type="number"
            placeholder="Expected annual rental yield"
            value={formData?.investmentPreferences?.expectedRentalYield || ''}
            onChange={(e) => handleInputChange('expectedRentalYield', e?.target?.value)}
            error={errors?.expectedRentalYield}
            min="0"
            max="50"
            step="0.1"
            description="Annual rental income as % of property value"
          />

          <Input
            label="Investment Horizon (years)"
            type="number"
            placeholder="Expected holding period"
            value={formData?.investmentPreferences?.investmentHorizon || ''}
            onChange={(e) => handleInputChange('investmentHorizon', e?.target?.value)}
            error={errors?.investmentHorizon}
            min="1"
            max="30"
            description="How long you plan to hold the investment"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Additional Preferences
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Special Requirements"
            type="text"
            placeholder="Any specific requirements or preferences"
            value={formData?.investmentPreferences?.specialRequirements || ''}
            onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
            error={errors?.specialRequirements}
            description="e.g., Vastu compliance, specific floor preferences, etc."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Ready to move properties only"
              checked={formData?.investmentPreferences?.readyToMoveOnly || false}
              onChange={(e) => handleInputChange('readyToMoveOnly', e?.target?.checked)}
            />

            <Checkbox
              label="Consider under-construction properties"
              checked={formData?.investmentPreferences?.considerUnderConstruction || false}
              onChange={(e) => handleInputChange('considerUnderConstruction', e?.target?.checked)}
            />

            <Checkbox
              label="Interested in resale properties"
              checked={formData?.investmentPreferences?.interestedInResale || false}
              onChange={(e) => handleInputChange('interestedInResale', e?.target?.checked)}
            />

            <Checkbox
              label="Open to joint ventures"
              checked={formData?.investmentPreferences?.openToJointVentures || false}
              onChange={(e) => handleInputChange('openToJointVentures', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPreferencesStep;