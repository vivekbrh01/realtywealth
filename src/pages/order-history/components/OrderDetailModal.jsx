import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderDetailModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const timelineEvents = [
    {
      date: '2024-09-15 10:30 AM',
      event: 'Order Created',
      description: 'Initial order created by client',
      icon: 'Plus',
      status: 'completed'
    },
    {
      date: '2024-09-15 11:45 AM',
      event: 'Document Verification',
      description: 'Property documents verified',
      icon: 'FileCheck',
      status: 'completed'
    },
    {
      date: '2024-09-16 02:15 PM',
      event: 'Payment Processing',
      description: 'Payment received and processed',
      icon: 'CreditCard',
      status: 'completed'
    },
    {
      date: '2024-09-17 09:00 AM',
      event: 'Order Completed',
      description: 'Transaction successfully completed',
      icon: 'CheckCircle',
      status: 'completed'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="FileText" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Order Details</h2>
              <p className="text-sm text-muted-foreground">#{order?.id} - {order?.orderNumber}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Type:</span>
                    <span className="font-medium text-foreground capitalize">{order?.transactionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(order?.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                      {order?.status?.replace('-', ' ')?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Date:</span>
                    <span className="font-medium text-foreground">{formatDate(order?.completionDate)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Client & Property</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client Name:</span>
                    <span className="font-medium text-foreground">{order?.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property:</span>
                    <span className="font-medium text-foreground">{order?.propertyTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{order?.propertyLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned Staff:</span>
                    <span className="font-medium text-foreground">{order?.assignedStaff}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Timeline</h3>
              <div className="space-y-4">
                {timelineEvents?.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                        <Icon name={event?.icon} size={16} className="text-success" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">{event?.event}</h4>
                        <span className="text-xs text-muted-foreground">{event?.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Property Agreement', type: 'PDF', size: '2.4 MB' },
                  { name: 'Payment Receipt', type: 'PDF', size: '1.2 MB' },
                  { name: 'Property Photos', type: 'ZIP', size: '15.8 MB' },
                  { name: 'Legal Documents', type: 'PDF', size: '3.1 MB' }
                ]?.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon name="FileText" size={20} className="text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{doc?.name}</div>
                      <div className="text-xs text-muted-foreground">{doc?.type} • {doc?.size}</div>
                    </div>
                    <Button variant="ghost" size="sm" iconName="Download" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Edit" iconPosition="left">
            Edit Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;