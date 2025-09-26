import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchAndFilterControls = ({ onSearch, onFilter, onClearFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-review', label: 'In Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'draft', label: 'Draft' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'expense', label: 'Expense' },
    { value: 'leave', label: 'Leave' },
    { value: 'purchase', label: 'Purchase' },
    { value: 'travel', label: 'Travel' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'permission', label: 'Permission' },
    { value: 'data-request', label: 'Data Request' },
    { value: 'contract', label: 'Contract' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const filters = {
      status: selectedStatus,
      type: selectedType,
      dateRange: dateRange
    };

    filters[filterType] = value;

    switch (filterType) {
      case 'status':
        setSelectedStatus(value);
        break;
      case 'type':
        setSelectedType(value);
        break;
      case 'dateRange':
        setDateRange(value);
        break;
    }

    if (onFilter) {
      onFilter(filters);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedType('');
    setDateRange('');
    setIsFilterExpanded(false);

    if (onClearFilters) {
      onClearFilters();
    }
  };

  const hasActiveFilters = selectedStatus || selectedType || dateRange || searchQuery;

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search requests by title, ID, or description..."
              value={searchQuery}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            iconName="Filter"
            iconPosition="left"
          >
            Filters
            {hasActiveFilters && (
              <div className="ml-2 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Filters */}
      {isFilterExpanded && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={selectedStatus}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Select status"
            />

            <Select
              label="Request Type"
              options={typeOptions}
              value={selectedType}
              onChange={(value) => handleFilterChange('type', value)}
              placeholder="Select type"
            />

            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              placeholder="Select date range"
            />
          </div>

          {/* Quick Filter Buttons */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Quick Filters:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('status', 'pending')}
                className={selectedStatus === 'pending' ? 'bg-primary/10 border-primary' : ''}
              >
                Pending Only
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('dateRange', 'week')}
                className={dateRange === 'week' ? 'bg-primary/10 border-primary' : ''}
              >
                This Week
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('type', 'expense')}
                className={selectedType === 'expense' ? 'bg-primary/10 border-primary' : ''}
              >
                Expenses
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('type', 'leave')}
                className={selectedType === 'leave' ? 'bg-primary/10 border-primary' : ''}
              >
                Leave Requests
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilterControls;