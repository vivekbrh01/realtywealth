import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmployeeFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount 
}) => {
  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Property Management', label: 'Property Management' },
    { value: 'Client Relations', label: 'Client Relations' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Marketing', label: 'Marketing' }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Senior Manager', label: 'Senior Manager' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'Executive', label: 'Executive' },
    { value: 'Associate', label: 'Associate' },
    { value: 'Specialist', label: 'Specialist' },
    { value: 'Coordinator', label: 'Coordinator' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Kolkata', label: 'Kolkata' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const workloadOptions = [
    { value: '', label: 'All Workloads' },
    { value: 'low', label: 'Low (0-50%)' },
    { value: 'medium', label: 'Medium (51-80%)' },
    { value: 'high', label: 'High (81-100%)' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-md p-4 space-y-4 shadow-elevation-1">
      {/* Search and Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search employees by name, ID, or email..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {resultCount} employee{resultCount !== 1 ? 's' : ''} found
          </span>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          placeholder="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => onFilterChange('department', value)}
        />

        <Select
          placeholder="Role"
          options={roleOptions}
          value={filters?.role}
          onChange={(value) => onFilterChange('role', value)}
        />

        <Select
          placeholder="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
        />

        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          placeholder="Workload"
          options={workloadOptions}
          value={filters?.workload}
          onChange={(value) => onFilterChange('workload', value)}
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {Object.entries(filters)?.map(([key, value]) => {
            if (!value || key === 'search') return null;
            
            let displayValue = value;
            if (key === 'workload') {
              const workloadOption = workloadOptions?.find(opt => opt?.value === value);
              displayValue = workloadOption ? workloadOption?.label : value;
            }

            return (
              <span
                key={key}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
              >
                <span>{displayValue}</span>
                <button
                  onClick={() => onFilterChange(key, '')}
                  className="hover:text-primary/80 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmployeeFilters;