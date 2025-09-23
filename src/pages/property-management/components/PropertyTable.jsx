import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PropertyTable = ({ properties, onPropertySelect, onBulkAction, selectedProperties }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    const crores = amount / 10000000;
    const lakhs = amount / 100000;
    
    if (crores >= 1) {
      return `₹${crores?.toFixed(2)} Cr`;
    } else if (lakhs >= 1) {
      return `₹${lakhs?.toFixed(2)} L`;
    } else {
      return `₹${amount?.toLocaleString('en-IN')}`;
    }
  };

  const formatArea = (area) => {
    if (!area) return '-';
    return `${area?.toLocaleString('en-IN')} sq ft`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { color: 'bg-success text-success-foreground', label: 'Active' },
      'maintenance': { color: 'bg-warning text-warning-foreground', label: 'Maintenance' },
      'vacant': { color: 'bg-secondary text-secondary-foreground', label: 'Vacant' },
      'sold': { color: 'bg-muted text-muted-foreground', label: 'Sold' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getReraStatusBadge = (status) => {
    const statusConfig = {
      'registered': { color: 'bg-success text-success-foreground', icon: 'CheckCircle' },
      'pending': { color: 'bg-warning text-warning-foreground', icon: 'Clock' },
      'not-applicable': { color: 'bg-muted text-muted-foreground', icon: 'Minus' }
    };

    const config = statusConfig?.[status] || statusConfig?.['not-applicable'];
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />RERA
              </div>
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  const sortedProperties = React.useMemo(() => {
    if (!sortConfig?.key) return properties;

    return [...properties]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue)?.toLowerCase();
      const bString = String(bValue)?.toLowerCase();

      if (sortConfig?.direction === 'asc') {
        return aString?.localeCompare(bString);
      } else {
        return bString?.localeCompare(aString);
      }
    });
  }, [properties, sortConfig]);

  const isAllSelected = selectedProperties?.length === properties?.length && properties?.length > 0;
  const isPartiallySelected = selectedProperties?.length > 0 && selectedProperties?.length < properties?.length;

  const handleSelectAll = (checked) => {
    if (checked) {
      onPropertySelect(properties?.map(p => p?.id));
    } else {
      onPropertySelect([]);
    }
  };

  const handleRowSelect = (propertyId, checked) => {
    if (checked) {
      onPropertySelect([...selectedProperties, propertyId]);
    } else {
      onPropertySelect(selectedProperties?.filter(id => id !== propertyId));
    }
  };

  return (
    <div className="bg-card border border-border rounded-md shadow-elevation-1 overflow-hidden">
      {/* Table Header Actions */}
      {selectedProperties?.length > 0 && (
        <div className="bg-muted border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedProperties?.length} properties selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => onBulkAction('export')}>
                <Icon name="Download" size={16} className="mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => onBulkAction('update')}>
                <Icon name="Edit" size={16} className="mr-1" />
                Bulk Update
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onBulkAction('delete')}>
                <Icon name="Trash2" size={16} className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isPartiallySelected}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Property</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Location</span>
                  {getSortIcon('location')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Type</span>
                  {getSortIcon('type')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('carpetArea')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Area</span>
                  {getSortIcon('carpetArea')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('currentValue')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Value</span>
                  {getSortIcon('currentValue')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">RERA</th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedProperties?.map((property) => (
              <tr key={property?.id} className="hover:bg-muted/50 transition-smooth">
                <td className="p-4">
                  <Checkbox
                    checked={selectedProperties?.includes(property?.id)}
                    onChange={(e) => handleRowSelect(property?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                      <Icon name="Building2" size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{property?.name}</div>
                      <div className="text-sm text-muted-foreground">{property?.owner}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{property?.location}</div>
                  <div className="text-xs text-muted-foreground">{property?.address}</div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{property?.type}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">
                    <div>Carpet: {formatArea(property?.carpetArea)}</div>
                    <div className="text-xs text-muted-foreground">
                      Built-up: {formatArea(property?.builtUpArea)}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-foreground">
                    {formatCurrency(property?.currentValue)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Purchase: {formatCurrency(property?.purchaseValue)}
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(property?.status)}
                </td>
                <td className="p-4">
                  {getReraStatusBadge(property?.reraStatus)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit Property">
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Maintenance">
                      <Icon name="Wrench" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" title="More Options">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedProperties?.map((property) => (
          <div key={property?.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedProperties?.includes(property?.id)}
                  onChange={(e) => handleRowSelect(property?.id, e?.target?.checked)}
                />
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <Icon name="Building2" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{property?.name}</div>
                  <div className="text-sm text-muted-foreground">{property?.type}</div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getStatusBadge(property?.status)}
                {getReraStatusBadge(property?.reraStatus)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Location</div>
                <div className="text-foreground">{property?.location}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Owner</div>
                <div className="text-foreground">{property?.owner}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Carpet Area</div>
                <div className="text-foreground">{formatArea(property?.carpetArea)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Current Value</div>
                <div className="text-foreground font-medium">{formatCurrency(property?.currentValue)}</div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-1 pt-2 border-t border-border">
              <Button variant="ghost" size="sm">
                <Icon name="Eye" size={16} className="mr-1" />
                View
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Edit" size={16} className="mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Wrench" size={16} className="mr-1" />
                Maintenance
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {properties?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Building2" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Properties Found</h3>
          <p className="text-muted-foreground mb-4">
            No properties match your current filter criteria.
          </p>
          <Button variant="outline">
            <Icon name="Plus" size={16} className="mr-1" />
            Add New Property
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyTable;