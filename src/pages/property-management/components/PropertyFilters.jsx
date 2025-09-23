import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PropertyFilters = ({ onFiltersChange, totalProperties, filteredCount }) => {
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    city: '',
    propertyType: '',
    priceRange: { min: '', max: '' },
    reraStatus: '',
    area: { min: '', max: '' }
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const stateOptions = [
    { value: '', label: 'All States' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'west-bengal', label: 'West Bengal' }
  ];

  const cityOptions = [
    { value: '', label: 'All Cities' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'pune', label: 'Pune' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'noida', label: 'Noida' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' }
  ];

  const propertyTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'office', label: 'Office Space' }
  ];

  const reraStatusOptions = [
    { value: '', label: 'All Status' },
    { value: 'registered', label: 'RERA Registered' },
    { value: 'pending', label: 'Registration Pending' },
    { value: 'not-applicable', label: 'Not Applicable' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRangeChange = (rangeType, field, value) => {
    const newFilters = {
      ...filters,
      [rangeType]: { ...filters?.[rangeType], [field]: value }
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      state: '',
      city: '',
      propertyType: '',
      priceRange: { min: '', max: '' },
      reraStatus: '',
      area: { min: '', max: '' }
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => {
    if (typeof value === 'object' && value !== null) {
      return Object.values(value)?.some(v => v !== '');
    }
    return value !== '';
  });

  return (
    <div className="bg-card border border-border rounded-md shadow-elevation-1">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Property Filters</h3>
          <div className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalProperties} properties
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <Icon name="X" size={16} className="mr-1" />
              Clear All
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className={`p-4 space-y-4 ${!isExpanded ? 'hidden md:block' : ''}`}>
        {/* Search Bar */}
        <div className="w-full">
          <Input
            type="search"
            placeholder="Search by property name, address, or owner..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Primary Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="State"
            options={stateOptions}
            value={filters?.state}
            onChange={(value) => handleFilterChange('state', value)}
            placeholder="Select state"
          />

          <Select
            label="City"
            options={cityOptions}
            value={filters?.city}
            onChange={(value) => handleFilterChange('city', value)}
            placeholder="Select city"
          />

          <Select
            label="Property Type"
            options={propertyTypeOptions}
            value={filters?.propertyType}
            onChange={(value) => handleFilterChange('propertyType', value)}
            placeholder="Select type"
          />

          <Select
            label="RERA Status"
            options={reraStatusOptions}
            value={filters?.reraStatus}
            onChange={(value) => handleFilterChange('reraStatus', value)}
            placeholder="Select status"
          />
        </div>

        {/* Range Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Price Range (₹)</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min price"
                value={filters?.priceRange?.min}
                onChange={(e) => handleRangeChange('priceRange', 'min', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max price"
                value={filters?.priceRange?.max}
                onChange={(e) => handleRangeChange('priceRange', 'max', e?.target?.value)}
              />
            </div>
          </div>

          {/* Area Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Area Range (sq ft)</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min area"
                value={filters?.area?.min}
                onChange={(e) => handleRangeChange('area', 'min', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max area"
                value={filters?.area?.max}
                onChange={(e) => handleRangeChange('area', 'max', e?.target?.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;