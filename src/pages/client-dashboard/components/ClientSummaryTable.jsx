import React from 'react';

import Button from '../../../components/ui/Button';

const ClientSummaryTable = ({ clients, onClientAction }) => {
  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000)?.toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000)?.toFixed(1)}L`;
    } else {
      return `₹${amount?.toLocaleString('en-IN')}`;
    }
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'active': 'text-success bg-success/10',
      'pending': 'text-warning bg-warning/10',
      'review': 'text-accent bg-accent/10',
      'inactive': 'text-muted-foreground bg-muted/10'
    };
    return colorMap?.[status] || 'text-muted-foreground bg-muted/10';
  };

  const formatLastActivity = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInDays = Math.floor((now - activityTime) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="bg-card border border-border rounded-md overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">High-Priority Clients</h3>
        <p className="text-sm text-muted-foreground">Clients requiring immediate attention</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Client</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Portfolio Value</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Properties</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Last Activity</th>
              <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clients?.map((client) => (
              <tr key={client?.id} className="hover:bg-muted/25 transition-smooth">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {client?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{client?.name}</div>
                      <div className="text-sm text-muted-foreground">{client?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm font-medium text-foreground">{formatCurrency(client?.portfolioValue)}</div>
                  <div className={`text-sm ${client?.valueChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {client?.valueChange >= 0 ? '+' : ''}{client?.valueChange}%
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm font-medium text-foreground">{client?.propertyCount}</div>
                  <div className="text-sm text-muted-foreground">properties</div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client?.status)}`}>
                    {client?.status?.charAt(0)?.toUpperCase() + client?.status?.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-foreground">{formatLastActivity(client?.lastActivity)}</div>
                  <div className="text-sm text-muted-foreground">{client?.lastActivityType}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onClientAction(client?.id, 'view')}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      onClick={() => onClientAction(client?.id, 'add_property')}
                    >
                      Add Property
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientSummaryTable;