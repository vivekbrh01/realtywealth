import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderFilters = ({ filters, onFiltersChange, onExport, totalOrders }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const transactionTypeOptions = [
    { value: '', label: 'All Transaction Types' },
    { value: 'sales', label: 'Sales' },
    { value: 'purchase', label: 'Purchase' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'pending', label: 'Pending' }
  ];

  const amountRangeOptions = [
    { value: '', label: 'All Amounts' },
    { value: '0-500000', label: 'Up to ₹5 Lakh' },
    { value: '500000-2000000', label: '₹5 Lakh - ₹20 Lakh' },
    { value: '2000000-5000000', label: '₹20 Lakh - ₹50 Lakh' },
    { value: '5000000-10000000', label: '₹50 Lakh - ₹1 Crore' },
    { value: '10000000+', label: 'Above ₹1 Crore' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      transactionType: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      amountRange: '',
      clientName: '',
      propertyLocation: ''
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Filter Orders</h3>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {totalOrders} orders found
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search orders..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        <Select
          placeholder="Transaction Type"
          options={transactionTypeOptions}
          value={filters?.transactionType}
          onChange={(value) => handleFilterChange('transactionType', value)}
        />

        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          placeholder="Amount Range"
          options={amountRangeOptions}
          value={filters?.amountRange}
          onChange={(value) => handleFilterChange('amountRange', value)}
        />
      </div>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
          <Input
            type="text"
            placeholder="Client Name"
            value={filters?.clientName}
            onChange={(e) => handleFilterChange('clientName', e?.target?.value)}
          />

          <Input
            type="text"
            placeholder="Property Location"
            value={filters?.propertyLocation}
            onChange={(e) => handleFilterChange('propertyLocation', e?.target?.value)}
          />

          <Input
            type="date"
            label="From Date"
            value={filters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />

          <Input
            type="date"
            label="To Date"
            value={filters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          />
        </div>
      )}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Active filters applied</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;