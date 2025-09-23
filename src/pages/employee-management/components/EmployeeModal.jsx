import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmployeeModal = ({ 
  isOpen, 
  onClose, 
  employee = null, 
  mode = 'view', // 'view', 'edit', 'assign'
  onSave,
  onAssign 
}) => {
  const [formData, setFormData] = useState(employee || {
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
    status: 'Active',
    skills: [],
    joinDate: '',
    salary: ''
  });

  const [assignmentData, setAssignmentData] = useState({
    orderId: '',
    priority: 'Medium',
    deadline: '',
    notes: ''
  });

  if (!isOpen) return null;

  const departmentOptions = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Property Management', label: 'Property Management' },
    { value: 'Client Relations', label: 'Client Relations' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Marketing', label: 'Marketing' }
  ];

  const roleOptions = [
    { value: 'Senior Manager', label: 'Senior Manager' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'Executive', label: 'Executive' },
    { value: 'Associate', label: 'Associate' },
    { value: 'Specialist', label: 'Specialist' },
    { value: 'Coordinator', label: 'Coordinator' }
  ];

  const locationOptions = [
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Kolkata', label: 'Kolkata' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAssignmentChange = (field, value) => {
    setAssignmentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleAssignment = () => {
    onAssign(employee?.id, assignmentData);
    onClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'On Leave':
        return 'bg-warning text-warning-foreground';
      case 'Inactive':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1040] p-4">
      <div className="bg-card border border-border rounded-md w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-elevation-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon 
              name={mode === 'view' ? 'Eye' : mode === 'edit' ? 'Edit' : 'UserPlus'} 
              size={20} 
              className="text-primary" 
            />
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'view' ? 'Employee Details' : 
               mode === 'edit'? 'Edit Employee' : 'Assign Order'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {mode === 'assign' ? (
            // Assignment Form
            (<div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-md">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-background">
                  <Image
                    src={employee?.avatar}
                    alt={employee?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground">{employee?.name}</div>
                  <div className="text-sm text-muted-foreground">{employee?.role}</div>
                  <div className="text-xs text-muted-foreground">
                    Current workload: {employee?.workloadPercentage}%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Order ID"
                  placeholder="Enter order ID"
                  value={assignmentData?.orderId}
                  onChange={(e) => handleAssignmentChange('orderId', e?.target?.value)}
                  required
                />

                <Select
                  label="Priority"
                  options={priorityOptions}
                  value={assignmentData?.priority}
                  onChange={(value) => handleAssignmentChange('priority', value)}
                />

                <Input
                  label="Deadline"
                  type="date"
                  value={assignmentData?.deadline}
                  onChange={(e) => handleAssignmentChange('deadline', e?.target?.value)}
                  required
                />
              </div>
              <Input
                label="Assignment Notes"
                placeholder="Add any specific instructions or notes..."
                value={assignmentData?.notes}
                onChange={(e) => handleAssignmentChange('notes', e?.target?.value)}
              />
            </div>)
          ) : (
            // Employee Details/Edit Form
            (<div className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={employee?.avatar}
                    alt={employee?.name || 'Employee'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  {mode === 'view' ? (
                    <>
                      <h3 className="text-xl font-semibold text-foreground">{employee?.name}</h3>
                      <p className="text-muted-foreground">{employee?.role}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee?.status)}`}>
                        {employee?.status}
                      </span>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Input
                        label="Full Name"
                        value={formData?.name}
                        onChange={(e) => handleInputChange('name', e?.target?.value)}
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Select
                          label="Role"
                          options={roleOptions}
                          value={formData?.role}
                          onChange={(value) => handleInputChange('role', value)}
                        />
                        <Select
                          label="Status"
                          options={statusOptions}
                          value={formData?.status}
                          onChange={(value) => handleInputChange('status', value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mode === 'view' ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
                      <p className="text-foreground">{employee?.employeeId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Department</label>
                      <p className="text-foreground">{employee?.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">{employee?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground">{employee?.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <p className="text-foreground">{employee?.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                      <p className="text-foreground">{employee?.joinDate}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Input
                      label="Email"
                      type="email"
                      value={formData?.email}
                      onChange={(e) => handleInputChange('email', e?.target?.value)}
                      required
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={formData?.phone}
                      onChange={(e) => handleInputChange('phone', e?.target?.value)}
                      required
                    />
                    <Select
                      label="Department"
                      options={departmentOptions}
                      value={formData?.department}
                      onChange={(value) => handleInputChange('department', value)}
                    />
                    <Select
                      label="Location"
                      options={locationOptions}
                      value={formData?.location}
                      onChange={(value) => handleInputChange('location', value)}
                    />
                    <Input
                      label="Join Date"
                      type="date"
                      value={formData?.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e?.target?.value)}
                    />
                    <Input
                      label="Salary"
                      type="number"
                      placeholder="₹"
                      value={formData?.salary}
                      onChange={(e) => handleInputChange('salary', e?.target?.value)}
                    />
                  </>
                )}
              </div>
              {/* Performance Metrics (View Mode Only) */}
              {mode === 'view' && employee && (
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Performance Overview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-foreground">{employee?.activeAssignments}</div>
                      <div className="text-sm text-muted-foreground">Active</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-foreground">{employee?.completedAssignments}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-foreground">{employee?.workloadPercentage}%</div>
                      <div className="text-sm text-muted-foreground">Workload</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-foreground">{employee?.performanceScore}</div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                  </div>
                </div>
              )}
            </div>)
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {mode === 'edit' && (
            <Button onClick={handleSave} iconName="Save" iconPosition="left">
              Save Changes
            </Button>
          )}
          {mode === 'assign' && (
            <Button onClick={handleAssignment} iconName="UserPlus" iconPosition="left">
              Assign Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;