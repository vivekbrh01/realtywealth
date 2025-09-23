import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('all');
  const [includeFields, setIncludeFields] = useState({
    orderDetails: true,
    clientInfo: true,
    propertyInfo: true,
    financialData: true,
    timeline: false,
    documents: false
  });

  if (!isOpen) return null;

  const formatOptions = [
    { value: 'csv', label: 'CSV (Excel Compatible)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'last90', label: 'Last 90 Days' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'lastYear', label: 'Last Year' }
  ];

  const handleFieldChange = (field, checked) => {
    setIncludeFields(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleExport = () => {
    const exportConfig = {
      format: exportFormat,
      dateRange,
      fields: includeFields
    };
    onExport(exportConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Export Orders</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>

          {/* Date Range */}
          <div>
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
            />
          </div>

          {/* Include Fields */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Include Fields</h3>
            <div className="space-y-3">
              <Checkbox
                label="Order Details"
                description="Order ID, type, status, dates"
                checked={includeFields?.orderDetails}
                onChange={(e) => handleFieldChange('orderDetails', e?.target?.checked)}
              />
              <Checkbox
                label="Client Information"
                description="Client name, contact details"
                checked={includeFields?.clientInfo}
                onChange={(e) => handleFieldChange('clientInfo', e?.target?.checked)}
              />
              <Checkbox
                label="Property Information"
                description="Property details, location, specifications"
                checked={includeFields?.propertyInfo}
                onChange={(e) => handleFieldChange('propertyInfo', e?.target?.checked)}
              />
              <Checkbox
                label="Financial Data"
                description="Amounts, payments, commissions"
                checked={includeFields?.financialData}
                onChange={(e) => handleFieldChange('financialData', e?.target?.checked)}
              />
              <Checkbox
                label="Timeline Events"
                description="Order progression history"
                checked={includeFields?.timeline}
                onChange={(e) => handleFieldChange('timeline', e?.target?.checked)}
              />
              <Checkbox
                label="Document References"
                description="Attached document information"
                checked={includeFields?.documents}
                onChange={(e) => handleFieldChange('documents', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;