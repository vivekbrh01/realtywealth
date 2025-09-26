import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const PreviewPanel = ({ formData, requestType, onClose }) => {
  // Get request type display info
  const getRequestTypeInfo = (type) => {
    const types = {
      equipment: { label: 'Equipment Purchase', icon: 'Monitor', color: 'blue' },
      leave: { label: 'Leave Request', icon: 'Calendar', color: 'green' },
      travel: { label: 'Business Travel', icon: 'Plane', color: 'purple' },
      purchase: { label: 'General Purchase', icon: 'ShoppingCart', color: 'orange' },
      permission: { label: 'Access Permission', icon: 'Key', color: 'red' },
      budget: { label: 'Budget Allocation', icon: 'DollarSign', color: 'emerald' },
      project: { label: 'Project Approval', icon: 'Briefcase', color: 'indigo' },
      policy: { label: 'Policy Exception', icon: 'FileText', color: 'amber' },
      other: { label: 'Other Request', icon: 'MoreHorizontal', color: 'gray' }
    };
    return types?.[type] || { label: 'Unknown', icon: 'HelpCircle', color: 'gray' };
  };

  // Get priority display info
  const getPriorityInfo = (priority) => {
    const priorities = {
      critical: { label: 'Critical', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' },
      high: { label: 'High', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
      normal: { label: 'Normal', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
      low: { label: 'Low', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' }
    };
    return priorities?.[priority] || { label: 'Not Set', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
  };

  // Format currency
  const formatCurrency = (amount, currency = 'INR') => {
    if (!amount) return '';
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
    return `${symbols?.[currency] || '₹'} ${Number(amount)?.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const typeInfo = getRequestTypeInfo(requestType);
  const priorityInfo = getPriorityInfo(formData?.priority);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 bg-${typeInfo?.color}-500 rounded-lg flex items-center justify-center`}>
              <Icon name={typeInfo?.icon} size={16} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Request Preview</h3>
              <p className="text-sm text-muted-foreground">How your request will appear to approvers</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="md:hidden"
          />
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {/* Request Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground">
                {formData?.title || 'Untitled Request'}
              </h4>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-muted-foreground">
                  {typeInfo?.label}
                </span>
                <span> className="text-muted-foreground"</span>
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  priorityInfo?.bgColor,
                  priorityInfo?.textColor
                )}>
                  {priorityInfo?.label} Priority
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {formData?.amount && (
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-semibold text-foreground">
                  {formatCurrency(formData?.amount, formData?.currency)}
                </div>
                <div className="text-xs text-muted-foreground">Estimated Cost</div>
              </div>
            )}
            {formData?.dueDate && (
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-sm font-semibold text-foreground">
                  {formatDate(formData?.dueDate)}
                </div>
                <div className="text-xs text-muted-foreground">Required By</div>
              </div>
            )}
          </div>
        </div>

        {/* Requester Information */}
        <div className="space-y-3">
          <h5 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="User" size={16} className="text-primary" />
            <span>Requester</span>
          </h5>
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Name:</span>
              <span className="text-foreground font-medium">
                {formData?.requesterInfo?.name || 'Not provided'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Department:</span>
              <span className="text-foreground">
                {formData?.requesterInfo?.department || 'Not specified'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Employee ID:</span>
              <span className="text-foreground">
                {formData?.requesterInfo?.employeeId || 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="space-y-3">
          <h5 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-primary" />
            <span>Request Details</span>
          </h5>

          {formData?.description ? (
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {formData?.description?.length > 200
                  ? `${formData?.description?.substring(0, 200)}...`
                  : formData?.description
                }
              </p>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground italic">No description provided</p>
            </div>
          )}

          {/* Category and Department */}
          {(formData?.category || formData?.targetDepartment) && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {formData?.category && (
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <div className="font-medium text-foreground">{formData?.category}</div>
                </div>
              )}
              {formData?.targetDepartment && (
                <div>
                  <span className="text-muted-foreground">Target Dept:</span>
                  <div className="font-medium text-foreground">{formData?.targetDepartment}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Business Justification */}
        <div className="space-y-3">
          <h5 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span>Business Justification</span>
          </h5>

          {formData?.businessJustification ? (
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {formData?.businessJustification?.length > 250
                  ? `${formData?.businessJustification?.substring(0, 250)}...`
                  : formData?.businessJustification
                }
              </p>
              {formData?.businessJustification?.length > 250 && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Truncated in preview - full justification will be visible to approvers
                </p>
              )}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <p className="text-sm text-amber-800 italic">Business justification required</p>
            </div>
          )}
        </div>

        {/* Supporting Documents */}
        {formData?.documents?.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Paperclip" size={16} className="text-primary" />
              <span>Supporting Documents ({formData?.documents?.length})</span>
            </h5>

            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              {formData?.documents?.slice(0, 3)?.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="File" size={14} className="text-muted-foreground" />
                  <span className="text-foreground truncate">{doc?.name}</span>
                  <span className="text-muted-foreground text-xs">
                    ({(doc?.size / 1024)?.toFixed(1)} KB)
                  </span>
                </div>
              ))}
              {formData?.documents?.length > 3 && (
                <div className="text-xs text-muted-foreground text-center pt-1">
                  +{formData?.documents?.length - 3} more files
                </div>
              )}
            </div>
          </div>
        )}

        {/* Approval Route Preview */}
        <div className="space-y-3">
          <h5 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Route" size={16} className="text-primary" />
            <span>Approval Route</span>
          </h5>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="ArrowRight" size={14} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {formData?.targetDepartment || 'Department Manager'}
              </span>
            </div>
            {formData?.departmentDetails?.managerName && (
              <div className="text-xs text-blue-700">
                Assigned to: {formData?.departmentDetails?.managerName}
              </div>
            )}
            <div className="text-xs text-blue-600 mt-1">
              Expected response: {priorityInfo?.label === 'Critical' ? '4 hours' :
                priorityInfo?.label === 'High' ? '24 hours' :
                  priorityInfo?.label === 'Normal' ? '3-5 days' : '7-10 days'}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Footer */}
      <div className="bg-muted/30 border-t border-border p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Preview generated at {new Date()?.toLocaleTimeString()}</span>
          </div>
          <div className="text-muted-foreground">
            Draft Not submitted
          </div>
        </div>
      </div>
    </div >
  );
};

export default PreviewPanel;