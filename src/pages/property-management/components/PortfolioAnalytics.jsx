import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioAnalytics = ({ properties }) => {
  const calculateAnalytics = () => {
    const totalValue = properties?.reduce((sum, property) => sum + (property?.currentValue || 0), 0);
    const totalPurchaseValue = properties?.reduce((sum, property) => sum + (property?.purchaseValue || 0), 0);
    const totalGrowth = totalValue - totalPurchaseValue;
    const growthPercentage = totalPurchaseValue > 0 ? ((totalGrowth / totalPurchaseValue) * 100) : 0;

    const statusCounts = properties?.reduce((acc, property) => {
      acc[property.status] = (acc?.[property?.status] || 0) + 1;
      return acc;
    }, {});

    const typeCounts = properties?.reduce((acc, property) => {
      acc[property.type] = (acc?.[property?.type] || 0) + 1;
      return acc;
    }, {});

    const locationCounts = properties?.reduce((acc, property) => {
      const state = property?.location?.split(', ')?.pop();
      acc[state] = (acc?.[state] || 0) + 1;
      return acc;
    }, {});

    const reraCompliance = properties?.reduce((acc, property) => {
      acc[property.reraStatus] = (acc?.[property?.reraStatus] || 0) + 1;
      return acc;
    }, {});

    return {
      totalValue,
      totalPurchaseValue,
      totalGrowth,
      growthPercentage,
      statusCounts,
      typeCounts,
      locationCounts,
      reraCompliance,
      totalProperties: properties?.length
    };
  };

  const analytics = calculateAnalytics();

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

  const getGrowthColor = (percentage) => {
    if (percentage > 0) return 'text-success';
    if (percentage < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getGrowthIcon = (percentage) => {
    if (percentage > 0) return 'TrendingUp';
    if (percentage < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-md p-4 shadow-elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <p className="text-2xl font-heading font-bold text-foreground">
                {formatCurrency(analytics?.totalValue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
              <Icon name="TrendingUp" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-md p-4 shadow-elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl font-heading font-bold text-foreground">
                {analytics?.totalProperties}
              </p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-md flex items-center justify-center">
              <Icon name="Building2" size={24} className="text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-md p-4 shadow-elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Portfolio Growth</p>
              <p className={`text-2xl font-heading font-bold ${getGrowthColor(analytics?.growthPercentage)}`}>
                {analytics?.growthPercentage > 0 ? '+' : ''}{analytics?.growthPercentage?.toFixed(1)}%
              </p>
            </div>
            <div className={`w-12 h-12 rounded-md flex items-center justify-center ${
              analytics?.growthPercentage > 0 ? 'bg-success/10' : 
              analytics?.growthPercentage < 0 ? 'bg-destructive/10' : 'bg-muted'
            }`}>
              <Icon 
                name={getGrowthIcon(analytics?.growthPercentage)} 
                size={24} 
                className={getGrowthColor(analytics?.growthPercentage)} 
              />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-md p-4 shadow-elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Investment Value</p>
              <p className="text-2xl font-heading font-bold text-foreground">
                {formatCurrency(analytics?.totalPurchaseValue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-accent" />
            </div>
          </div>
        </div>
      </div>
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Status Distribution */}
        <div className="bg-card border border-border rounded-md p-4 shadow-elevation-1">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Property Status</h3>
          <div className="space-y-3">
            {Object.entries(analytics?.statusCounts)?.map(([status, count]) => {
              const percentage = (count / analytics?.totalProperties) * 100;
              const statusConfig = {
                'active': { color: 'bg-success', label: 'Active' },
                'maintenance': { color: 'bg-warning', label: 'Maintenance' },
                'vacant': { color: 'bg-secondary', label: 'Vacant' },
                'sold': { color: 'bg-muted', label: 'Sold' }
              };
              const config = statusConfig?.[status] || { color: 'bg-muted', label: status };

              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${config?.color}`}></div>
                    <span className="text-sm text-foreground">{config?.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{count}</span>
                    <span className="text-xs text-muted-foreground">({percentage?.toFixed(0)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Property Type Distribution */}
        <div className="bg-card border border-border rounded-md p-4 shadow-elevation-1">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Property Types</h3>
          <div className="space-y-3">
            {Object.entries(analytics?.typeCounts)?.map(([type, count]) => {
              const percentage = (count / analytics?.totalProperties) * 100;
              return (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-foreground capitalize">{type}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{count}</span>
                    <span className="text-xs text-muted-foreground">({percentage?.toFixed(0)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RERA Compliance */}
        <div className="bg-card border border-border rounded-md p-4 shadow-elevation-1">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">RERA Compliance</h3>
          <div className="space-y-3">
            {Object.entries(analytics?.reraCompliance)?.map(([status, count]) => {
              const percentage = (count / analytics?.totalProperties) * 100;
              const statusConfig = {
                'registered': { color: 'bg-success', label: 'Registered', icon: 'CheckCircle' },
                'pending': { color: 'bg-warning', label: 'Pending', icon: 'Clock' },
                'not-applicable': { color: 'bg-muted', label: 'Not Applicable', icon: 'Minus' }
              };
              const config = statusConfig?.[status] || { color: 'bg-muted', label: status, icon: 'Circle' };

              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={config?.icon} size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{config?.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{count}</span>
                    <span className="text-xs text-muted-foreground">({percentage?.toFixed(0)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Geographic Distribution */}
      <div className="bg-card border border-border rounded-md p-4 shadow-elevation-1">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Geographic Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(analytics?.locationCounts)?.map(([location, count]) => {
            const percentage = (count / analytics?.totalProperties) * 100;
            return (
              <div key={location} className="text-center p-3 bg-muted rounded-md">
                <div className="text-lg font-heading font-bold text-foreground">{count}</div>
                <div className="text-xs text-muted-foreground">{location}</div>
                <div className="text-xs text-muted-foreground">({percentage?.toFixed(0)}%)</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;