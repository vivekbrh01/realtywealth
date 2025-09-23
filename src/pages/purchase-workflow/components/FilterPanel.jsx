import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
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

  const clientTypeOptions = [
    { value: '', label: 'All Client Types' },
    { value: 'hni', label: 'High Net Worth Individual' },
    { value: 'corporate', label: 'Corporate Client' },
    { value: 'institutional', label: 'Institutional Investor' },
    { value: 'individual', label: 'Individual Investor' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'ahmedabad', label: 'Ahmedabad' }
  ];

  const managerOptions = [
    { value: '', label: 'All Managers' },
    { value: 'rajesh-kumar', label: 'Rajesh Kumar' },
    { value: 'priya-sharma', label: 'Priya Sharma' },
    { value: 'amit-patel', label: 'Amit Patel' },
    { value: 'sneha-gupta', label: 'Sneha Gupta' },
    { value: 'vikram-singh', label: 'Vikram Singh' }
  ];

  const investmentRangeOptions = [
    { value: '', label: 'All Investment Ranges' },
    { value: '0-50', label: 'Up to ₹50 Lakhs' },
    { value: '50-100', label: '₹50L - ₹1 Crore' },
    { value: '100-500', label: '₹1 - ₹5 Crores' },
    { value: '500-1000', label: '₹5 - ₹10 Crores' },
    { value: '1000+', label: 'Above ₹10 Crores' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Purchase Orders</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Select status"
          />
        </div>

        <div>
          <Select
            label="Client Type"
            options={clientTypeOptions}
            value={filters?.clientType}
            onChange={(value) => onFilterChange('clientType', value)}
            placeholder="Select client type"
          />
        </div>

        <div>
          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => onFilterChange('location', value)}
            placeholder="Select location"
            searchable
          />
        </div>

        <div>
          <Select
            label="Assigned Manager"
            options={managerOptions}
            value={filters?.assignedManager}
            onChange={(value) => onFilterChange('assignedManager', value)}
            placeholder="Select manager"
          />
        </div>

        <div>
          <Select
            label="Investment Range"
            options={investmentRangeOptions}
            value={filters?.investmentRange}
            onChange={(value) => onFilterChange('investmentRange', value)}
            placeholder="Select range"
          />
        </div>

        <div>
          <Input
            label="Search"
            type="search"
            placeholder="Search purchases..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            Active filters: {Object.values(filters)?.filter(value => value && value?.length > 0)?.length}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Icon name="Info" size={16} />
          <span>Use filters to narrow down purchase orders and track progress efficiently</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;