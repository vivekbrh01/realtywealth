import React, { useState } from 'react';

import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const MaintenanceFilters = ({ onFiltersChange, resultCount }) => {
  const [filters, setFilters] = useState({
    location: '',
    maintenanceType: '',
    priority: '',
    status: '',
    search: ''
  });

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  const maintenanceTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'painting', label: 'Painting' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'cleaning', label: 'Deep Cleaning' },
    { value: 'security', label: 'Security Systems' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending-approval', label: 'Pending Approval' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      maintenanceType: '',
      priority: '',
      status: '',
      search: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Maintenance Requests</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {resultCount} requests found
          </span>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          placeholder="Select location"
        />

        <Select
          label="Maintenance Type"
          options={maintenanceTypeOptions}
          value={filters?.maintenanceType}
          onChange={(value) => handleFilterChange('maintenanceType', value)}
          placeholder="Select type"
        />

        <Select
          label="Priority"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => handleFilterChange('priority', value)}
          placeholder="Select priority"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Select status"
        />

        <Input
          label="Search"
          type="search"
          placeholder="Search requests..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default MaintenanceFilters;