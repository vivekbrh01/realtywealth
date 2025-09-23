import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyHeader = ({ property, onEdit, onCreateSaleOrder }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'Under Maintenance':
        return 'bg-warning text-warning-foreground';
      case 'For Sale':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-2 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Property Image */}
        <div className="lg:col-span-1">
          <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
            <Image
              src={property?.images?.[0]}
              alt={property?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property?.status)}`}>
                {property?.status}
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button
                variant="secondary"
                size="sm"
                iconName="Camera"
                iconPosition="left"
                className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                {property?.title}
              </h1>
              <div className="flex items-center space-x-2 mt-2 text-muted-foreground">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">{property?.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl lg:text-3xl font-bold text-primary">
                {formatCurrency(property?.currentValue)}
              </div>
              <div className="text-sm text-muted-foreground">Current Market Value</div>
            </div>
          </div>

          {/* Property Specifications */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-muted rounded-lg p-3">
              <div className="text-sm text-muted-foreground">Carpet Area</div>
              <div className="font-semibold text-foreground">{property?.carpetArea} sq ft</div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-sm text-muted-foreground">Built-up Area</div>
              <div className="font-semibold text-foreground">{property?.builtUpArea} sq ft</div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-sm text-muted-foreground">Super Built-up</div>
              <div className="font-semibold text-foreground">{property?.superBuiltUpArea} sq ft</div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-sm text-muted-foreground">Property Type</div>
              <div className="font-semibold text-foreground">{property?.type}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              variant="default"
              iconName="Edit"
              iconPosition="left"
              onClick={onEdit}
            >
              Edit Property
            </Button>
            <Button
              variant="outline"
              iconName="ShoppingCart"
              iconPosition="left"
              onClick={onCreateSaleOrder}
            >
              Create Sale Order
            </Button>
            <Button
              variant="outline"
              iconName="Wrench"
              iconPosition="left"
            >
              Schedule Maintenance
            </Button>
            <Button
              variant="ghost"
              iconName="FileText"
              iconPosition="left"
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;