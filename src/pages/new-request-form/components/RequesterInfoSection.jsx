import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RequesterInfoSection = ({ data, departmentDetails, onChange, errors }) => {
  // Department options
  const departments = [
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
    { value: 'marketing', label: 'Marketing & Sales' },
    { value: 'operations', label: 'Operations' },
    { value: 'legal', label: 'Legal & Compliance' },
    { value: 'procurement', label: 'Procurement' },
    { value: 'management', label: 'Management' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'research', label: 'Research & Development' }
  ];

  // Manager options (mock data)
  const managers = [
    { value: 'priya.sharma@company.com', label: 'Priya Sharma - Finance Director', department: 'finance' },
    { value: 'rajesh.kumar@company.com', label: 'Rajesh Kumar - HR Manager', department: 'hr' },
    { value: 'anita.desai@company.com', label: 'Anita Desai - IT Director', department: 'it' },
    { value: 'vikram.singh@company.com', label: 'Vikram Singh - Marketing Head', department: 'marketing' },
    { value: 'meera.patel@company.com', label: 'Meera Patel - Operations Manager', department: 'operations' },
    { value: 'arjun.reddy@company.com', label: 'Arjun Reddy - Legal Head', department: 'legal' },
    { value: 'kavita.nair@company.com', label: 'Kavita Nair - Procurement Manager', department: 'procurement' },
    { value: 'suresh.gupta@company.com', label: 'Suresh Gupta - General Manager', department: 'management' }
  ];

  // Filter managers based on selected department
  const getAvailableManagers = () => {
    if (!departmentDetails?.targetDepartment) return managers;
    return managers?.filter(manager =>
      manager?.department === departmentDetails?.targetDepartment ||
      manager?.department === 'management'
    );
  };

  const handleManagerChange = (managerEmail) => {
    const selectedManager = managers?.find(m => m?.value === managerEmail);
    if (selectedManager) {
      onChange('departmentDetails.managerEmail', managerEmail);
      onChange('departmentDetails.managerName', selectedManager?.label?.split(' - ')?.[0]);
    } else {
      onChange('departmentDetails.managerEmail', '');
      onChange('departmentDetails.managerName', '');
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Requester Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Your information has been pre-filled from your profile. You can make changes if needed.
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="User" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">Personal Details</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={data?.name || ''}
            onChange={(e) => onChange('requesterInfo.name', e?.target?.value)}
            required
            error={errors?.name}
            placeholder="Enter your full name"
          />

          <Input
            label="Employee ID"
            value={data?.employeeId || ''}
            onChange={(e) => onChange('requesterInfo.employeeId', e?.target?.value)}
            required
            error={errors?.employeeId}
            placeholder="e.g., EMP-2024-001"
          />

          <Input
            label="Email Address"
            type="email"
            value={data?.email || ''}
            onChange={(e) => onChange('requesterInfo.email', e?.target?.value)}
            required
            error={errors?.email}
            placeholder="your.email@company.com"
          />

          <Input
            label="Position/Title"
            value={data?.position || ''}
            onChange={(e) => onChange('requesterInfo.position', e?.target?.value)}
            required
            error={errors?.position}
            placeholder="Your job title"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Your Department"
            value={data?.department?.toLowerCase()?.replace(/\s+/g, '-')}
            onChange={(value) => {
              const dept = departments?.find(d => d?.value === value);
              onChange('requesterInfo.department', dept?.label || '');
            }}
            options={departments}
            required
            error={errors?.department}
            placeholder="Select your department"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={data?.phone || ''}
            onChange={(e) => onChange('requesterInfo.phone', e?.target?.value)}
            error={errors?.phone}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      {/* Department & Manager Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Building" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">Approval Department</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Target Department"
            description="Which department should approve this request?"
            value={departmentDetails?.targetDepartment || ''}
            onChange={(value) => {
              onChange('departmentDetails.targetDepartment', value);
              // Clear manager selection when department changes
              onChange('departmentDetails.managerEmail', '');
              onChange('departmentDetails.managerName', '');
            }}
            options={departments}
            required
            error={errors?.targetDepartment}
            placeholder="Select approving department"
            searchable
          />

          <Select
            label="Preferred Approver"
            description="Select a specific manager (optional)"
            value={departmentDetails?.managerEmail || ''}
            onChange={handleManagerChange}
            options={getAvailableManagers()?.map(manager => ({
              value: manager?.value,
              label: manager?.label
            }))}
            error={errors?.managerEmail}
            placeholder="Select a manager"
            searchable
            disabled={!departmentDetails?.targetDepartment}
          />
        </div>

        {/* Manager Contact Info Display */}
        {departmentDetails?.managerName && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-foreground">
                  {departmentDetails?.managerName}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {departmentDetails?.managerEmail}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your request will be routed to this approver
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Help Text */}
        {!departmentDetails?.targetDepartment && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Need help choosing a department?</p>
                <ul className="space-y-1 text-xs">
                  <li>Equipment /Software → IT Department</li>
                  <li>Travel /Expenses → Finance Department</li>
                  <li>Leave Requests → Human Resources</li>
                  <li>Policy Exceptions → Management</li>
                </ul>
              </div>
            </div >
          </div >
        )}
      </div >

      {/* Additional Contact Information */}
      < div className="space-y-6" >
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MessageSquare" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">Additional Information</h4>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input
            label="Alternative Contact"
            description="Alternative phone number or email for urgent matters (optional)"
            value={data?.alternativeContact || ''}
            onChange={(e) => onChange('requesterInfo.alternativeContact', e?.target?.value)}
            error={errors?.alternativeContact}
            placeholder="Alternative contact information"
          />
        </div>
      </div >

      {/* Information Notice */}
      < div className="p-4 bg-blue-50 border border-blue-200 rounded-lg" >
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={18} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Data Privacy Notice</p>
            <p className="text-blue-700">
              Your personal information will only be used for processing this approval request
              and will be handled according to company data privacy policies.
            </p>
          </div>
        </div>
      </div >
    </div >
  );
};

export default RequesterInfoSection;