import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ filters, onFilterChange, onClearFilters }) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'inquiry', label: 'Initial Inquiry' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'legal-verification', label: 'Legal Verification' },
    { value: 'payment-processing', label: 'Payment Processing' },
    { value: 'final-transfer', label: 'Final Transfer' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const employeeOptions = [
    { value: '', label: 'All Employees' },
    { value: 'rajesh-kumar', label: 'Rajesh Kumar' },
    { value: 'priya-sharma', label: 'Priya Sharma' },
    { value: 'amit-patel', label: 'Amit Patel' },
    { value: 'sneha-reddy', label: 'Sneha Reddy' },
    { value: 'vikram-singh', label: 'Vikram Singh' }
  ];

  const propertyTypeOptions = [
    { value: '', label: 'All Property Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'warehouse', label: 'Warehouse' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Sales Orders</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Assigned Employee"
          options={employeeOptions}
          value={filters?.assignedEmployee}
          onChange={(value) => handleFilterChange('assignedEmployee', value)}
          className="w-full"
        />

        <Select
          label="Property Type"
          options={propertyTypeOptions}
          value={filters?.propertyType}
          onChange={(value) => handleFilterChange('propertyType', value)}
          className="w-full"
        />

        <Input
          label="Search Client"
          type="search"
          placeholder="Search by client name..."
          value={filters?.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Input
          label="From Date"
          type="date"
          value={filters?.fromDate}
          onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
          className="w-full"
        />

        <Input
          label="To Date"
          type="date"
          value={filters?.toDate}
          onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
          className="w-full"
        />

        <div className="flex items-end">
          <Button
            variant="default"
            iconName="Search"
            className="w-full"
            onClick={() => console.log('Apply filters:', filters)}
          >
            Apply Filters
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {Object.values(filters)?.some(value => value) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {filters?.status && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              </span>
            )}
            {filters?.assignedEmployee && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Employee: {employeeOptions?.find(opt => opt?.value === filters?.assignedEmployee)?.label}
              </span>
            )}
            {filters?.propertyType && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Type: {propertyTypeOptions?.find(opt => opt?.value === filters?.propertyType)?.label}
              </span>
            )}
            {filters?.searchTerm && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Search: {filters?.searchTerm}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;