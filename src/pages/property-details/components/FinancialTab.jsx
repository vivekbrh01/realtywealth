import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const FinancialTab = ({ property }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const appreciationData = [
    { year: '2020', value: 8500000 },
    { year: '2021', value: 9200000 },
    { year: '2022', value: 10100000 },
    { year: '2023', value: 11500000 },
    { year: '2024', value: 12500000 }
  ];

  const taxData = [
    { year: '2020-21', propertyTax: 45000, capitalGains: 0, totalTax: 45000 },
    { year: '2021-22', propertyTax: 48000, capitalGains: 0, totalTax: 48000 },
    { year: '2022-23', propertyTax: 52000, capitalGains: 0, totalTax: 52000 },
    { year: '2023-24', propertyTax: 56000, capitalGains: 0, totalTax: 56000 },
    { year: '2024-25', propertyTax: 58000, capitalGains: 0, totalTax: 58000 }
  ];

  const financialMetrics = [
    {
      label: 'Purchase Price',
      value: formatCurrency(property?.purchasePrice),
      icon: 'ShoppingCart',
      color: 'text-muted-foreground'
    },
    {
      label: 'Current Value',
      value: formatCurrency(property?.currentValue),
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      label: 'Total Appreciation',
      value: formatCurrency(property?.currentValue - property?.purchasePrice),
      icon: 'ArrowUp',
      color: 'text-success'
    },
    {
      label: 'Annual ROI',
      value: '8.2%',
      icon: 'Percent',
      color: 'text-primary'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Financial Performance & Tax History
        </h3>
      </div>
      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialMetrics?.map((metric, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={metric?.icon} size={16} className={metric?.color} />
              <span className="text-sm text-muted-foreground">{metric?.label}</span>
            </div>
            <div className={`text-xl font-bold ${metric?.color}`}>
              {metric?.value}
            </div>
          </div>
        ))}
      </div>
      {/* Property Appreciation Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Property Value Appreciation</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={appreciationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="year" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 1000000)?.toFixed(1)}Cr`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Property Value']}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Tax History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Tax Payment History</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taxData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="year" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value), name === 'propertyTax' ? 'Property Tax' : 'Capital Gains Tax']}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="propertyTax" fill="var(--color-primary)" name="propertyTax" />
              <Bar dataKey="capitalGains" fill="var(--color-secondary)" name="capitalGains" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Purchase Details */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Purchase Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Purchase Date:</span>
              <span className="font-medium text-foreground">15/08/2020</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Purchase Price:</span>
              <span className="font-medium text-foreground">{formatCurrency(property?.purchasePrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Registration Fees:</span>
              <span className="font-medium text-foreground">₹2,55,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stamp Duty:</span>
              <span className="font-medium text-foreground">₹5,10,000</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Loan Amount:</span>
              <span className="font-medium text-foreground">₹60,00,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Down Payment:</span>
              <span className="font-medium text-foreground">₹25,00,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Legal Fees:</span>
              <span className="font-medium text-foreground">₹75,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Investment:</span>
              <span className="font-bold text-primary">₹88,40,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTab;