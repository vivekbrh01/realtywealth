import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MaintenanceTab = ({ property }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: '',
    priority: '',
    description: '',
    preferredDate: ''
  });

  const maintenanceRecords = [
    {
      id: 'MR001',
      type: 'Plumbing',
      description: 'Kitchen sink faucet replacement and pipe leak repair',
      requestDate: '2024-09-10',
      completedDate: '2024-09-12',
      status: 'Completed',
      priority: 'High',
      assignedTo: 'Ramesh Plumbing Services',
      cost: 4500,
      rating: 4.5
    },
    {
      id: 'MR002',
      type: 'Electrical',
      description: 'Living room ceiling fan installation and wiring check',
      requestDate: '2024-08-25',
      completedDate: '2024-08-27',
      status: 'Completed',
      priority: 'Medium',
      assignedTo: 'Suresh Electricals',
      cost: 3200,
      rating: 5.0
    },
    {
      id: 'MR003',
      type: 'Painting',
      description: 'Bedroom wall painting and minor wall crack repairs',
      requestDate: '2024-09-14',
      completedDate: null,
      status: 'In Progress',
      priority: 'Low',
      assignedTo: 'Colorful Painters',
      cost: 8500,
      rating: null
    },
    {
      id: 'MR004',
      type: 'AC Service',
      description: 'Annual AC maintenance and gas refill for all units',
      requestDate: '2024-09-16',
      completedDate: null,
      status: 'Scheduled',
      priority: 'Medium',
      assignedTo: 'Cool Air Services',
      cost: 6000,
      rating: null
    }
  ];

  const maintenanceTypes = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'painting', label: 'Painting' },
    { value: 'ac_service', label: 'AC Service' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'cleaning', label: 'Deep Cleaning' },
    { value: 'pest_control', label: 'Pest Control' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success text-success-foreground';
      case 'In Progress':
        return 'bg-warning text-warning-foreground';
      case 'Scheduled':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': case'Urgent':
        return 'text-destructive';
      case 'Medium':
        return 'text-warning';
      case 'Low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const handleSubmitRequest = (e) => {
    e?.preventDefault();
    // Handle form submission
    console.log('New maintenance request:', newRequest);
    setShowRequestForm(false);
    setNewRequest({ type: '', priority: '', description: '', preferredDate: '' });
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={12}
            className={star <= rating ? 'text-warning fill-current' : 'text-muted-foreground'}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Maintenance History & Requests
        </h3>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowRequestForm(true)}
        >
          New Request
        </Button>
      </div>
      {/* New Request Form */}
      {showRequestForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-foreground">Create Maintenance Request</h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setShowRequestForm(false)}
            />
          </div>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Maintenance Type"
                options={maintenanceTypes}
                value={newRequest?.type}
                onChange={(value) => setNewRequest({ ...newRequest, type: value })}
                required
              />
              <Select
                label="Priority Level"
                options={priorityOptions}
                value={newRequest?.priority}
                onChange={(value) => setNewRequest({ ...newRequest, priority: value })}
                required
              />
            </div>
            <Input
              label="Preferred Date"
              type="date"
              value={newRequest?.preferredDate}
              onChange={(e) => setNewRequest({ ...newRequest, preferredDate: e?.target?.value })}
              required
            />
            <Input
              label="Description"
              type="text"
              placeholder="Describe the maintenance issue or requirement..."
              value={newRequest?.description}
              onChange={(e) => setNewRequest({ ...newRequest, description: e?.target?.value })}
              required
            />
            <div className="flex space-x-3">
              <Button type="submit" variant="default">
                Submit Request
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRequestForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Maintenance Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">12</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">2</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">1</div>
          <div className="text-sm text-muted-foreground">Scheduled</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">₹45,200</div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </div>
      </div>
      {/* Maintenance Records */}
      <div className="space-y-4">
        {maintenanceRecords?.map((record) => (
          <div key={record?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-mono text-sm text-muted-foreground">{record?.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record?.status)}`}>
                    {record?.status}
                  </span>
                  <span className={`text-sm font-medium ${getPriorityColor(record?.priority)}`}>
                    {record?.priority} Priority
                  </span>
                </div>
                <h5 className="font-medium text-foreground mb-1">{record?.type}</h5>
                <p className="text-sm text-muted-foreground mb-2">{record?.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Requested: {new Date(record.requestDate)?.toLocaleDateString('en-IN')}</span>
                  {record?.completedDate && (
                    <span>Completed: {new Date(record.completedDate)?.toLocaleDateString('en-IN')}</span>
                  )}
                  <span>Assigned to: {record?.assignedTo}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="text-lg font-bold text-foreground">{formatCurrency(record?.cost)}</div>
                {renderStars(record?.rating)}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Eye">
                    View Details
                  </Button>
                  {record?.status === 'Completed' && !record?.rating && (
                    <Button variant="ghost" size="sm" iconName="Star">
                      Rate Service
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTab;