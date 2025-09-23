import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderTable = ({ orders, onOrderClick, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      case 'pending':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTransactionTypeIcon = (type) => {
    switch (type) {
      case 'sales':
        return 'TrendingUp';
      case 'purchase':
        return 'ShoppingCart';
      case 'maintenance':
        return 'Wrench';
      default:
        return 'FileText';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (orders?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria or filters to find orders.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 font-semibold text-foreground">Order Details</th>
              <th className="text-left p-4 font-semibold text-foreground">Client & Property</th>
              <th className="text-left p-4 font-semibold text-foreground">Type & Amount</th>
              <th className="text-left p-4 font-semibold text-foreground">Date & Status</th>
              <th className="text-left p-4 font-semibold text-foreground">Assigned Staff</th>
              <th className="text-right p-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order?.id}
                className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onOrderClick(order)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(order?.status)?.replace('text-', 'bg-')?.replace('border-', '')?.split(' ')?.[0]}/10`}>
                      <Icon name={getTransactionTypeIcon(order?.transactionType)} size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">#{order?.id}</div>
                      <div className="text-sm text-muted-foreground">{order?.orderNumber}</div>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{order?.clientName}</div>
                    <div className="text-sm text-muted-foreground">{order?.propertyTitle}</div>
                    <div className="text-xs text-muted-foreground">{order?.propertyLocation}</div>
                  </div>
                </td>

                <td className="p-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-foreground capitalize">{order?.transactionType}</span>
                    </div>
                    <div className="font-semibold text-foreground">{formatCurrency(order?.amount)}</div>
                  </div>
                </td>

                <td className="p-4">
                  <div>
                    <div className="text-sm text-foreground mb-2">{formatDate(order?.completionDate)}</div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                      {order?.status?.replace('-', ' ')?.toUpperCase()}
                    </span>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {order?.assignedStaff?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{order?.assignedStaff}</div>
                      <div className="text-xs text-muted-foreground">{order?.staffRole}</div>
                    </div>
                  </div>
                </td>

                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onViewDetails(order);
                    }}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;