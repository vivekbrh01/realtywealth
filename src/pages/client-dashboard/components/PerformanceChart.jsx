import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceChart = ({ data, title = "Portfolio Performance" }) => {
  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000)?.toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000)?.toFixed(1)}L`;
    } else {
      return `₹${(value / 1000)?.toFixed(0)}K`;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-md p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            Portfolio Value: {formatCurrency(payload?.[0]?.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">6-month trend analysis</p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;