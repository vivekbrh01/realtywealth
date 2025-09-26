import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const RecentRequestsTable = ({ requests, onViewDetails, onWithdraw }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getRequestTypeIcon = (type) => {
    const iconMap = {
      'expense': 'Receipt',
      'leave': 'Calendar',
      'purchase': 'ShoppingCart',
      'travel': 'Plane',
      'equipment': 'Monitor',
      'budget': 'DollarSign',
      'contract': 'FileText',
      'permission': 'Shield',
      'data-request': 'Database'
    };
    return iconMap?.[type] || 'FileText';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedRequests = [...requests]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'createdAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Requests</h2>
          <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
            Filter
          </Button>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-2 hover:text-foreground transition-smooth"
                >
                  <span>Request Type</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-2 hover:text-foreground transition-smooth"
                >
                  <span>Title</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-2 hover:text-foreground transition-smooth"
                >
                  <span>Submitted</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Assigned To</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests?.map((request) => (
              <tr key={request?.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={getRequestTypeIcon(request?.type)} size={16} className="text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {request?.type?.replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground truncate max-w-48">{request?.title}</p>
                    <p className="text-xs text-muted-foreground font-mono">#{request?.id}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-foreground">{formatDate(request?.createdAt)}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(request?.createdAt)}</p>
                  </div>
                </td>
                <td className="p-4">
                  <StatusIndicator status={request?.status} size="sm" />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="white" />
                    </div>
                    <span className="text-sm text-muted-foreground">{request?.assignedTo}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(request)}
                      iconName="Eye"
                    />
                    {request?.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onWithdraw && onWithdraw(request)}
                        iconName="X"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden">
        {sortedRequests?.map((request) => (
          <div key={request?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getRequestTypeIcon(request?.type)} size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{request?.title}</p>
                  <p className="text-xs text-muted-foreground font-mono">#{request?.id}</p>
                </div>
              </div>
              <StatusIndicator status={request?.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
              <div>
                <p className="text-muted-foreground">Type</p>
                <p className="text-foreground capitalize">{request?.type?.replace('-', ' ')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Submitted</p>
                <p className="text-foreground">{formatDate(request?.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={10} color="white" />
                </div>
                <span className="text-xs text-muted-foreground">{request?.assignedTo}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails && onViewDetails(request)}
                  iconName="Eye"
                />
                {request?.status === 'pending' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onWithdraw && onWithdraw(request)}
                    iconName="X"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {requests?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No requests found</h3>
          <p className="text-muted-foreground">You haven't submitted any requests yet.</p>
        </div>
      )}
    </div>
  );
};

export default RecentRequestsTable;