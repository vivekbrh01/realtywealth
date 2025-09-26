import React from 'react';
import QuickActionButton from '../../../components/ui/QuickActionButton';

const QuickActionsPanel = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'permission',
      title: 'Permission Request',
      description: 'Request access permissions for systems, files, or restricted areas',
      icon: 'Shield',
      category: 'permission'
    },
    {
      id: 'data-request',
      title: 'Data Request',
      description: 'Request access to specific data, reports, or database information',
      icon: 'Database',
      category: 'data'
    },
    {
      id: 'department-approval',
      title: 'Department Approval',
      description: 'Submit requests requiring department head or manager approval',
      icon: 'Users',
      category: 'department'
    },
    {
      id: 'expense',
      title: 'Expense Approval',
      description: 'Submit expense reports and reimbursement requests',
      icon: 'Receipt',
      category: 'expense'
    },
    {
      id: 'leave',
      title: 'Leave Request',
      description: 'Apply for vacation, sick leave, or other time off',
      icon: 'Calendar',
      category: 'leave'
    },
    {
      id: 'purchase',
      title: 'Purchase Request',
      description: 'Request approval for equipment, software, or service purchases',
      icon: 'ShoppingCart',
      category: 'purchase'
    },
    {
      id: 'travel',
      title: 'Travel Request',
      description: 'Submit business travel requests and expense pre-approval',
      icon: 'Plane',
      category: 'travel'
    },
    {
      id: 'equipment',
      title: 'Equipment Request',
      description: 'Request new equipment, hardware, or IT resources',
      icon: 'Monitor',
      category: 'equipment'
    }
  ];

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Start a new approval request</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <QuickActionButton
            key={action?.id}
            title={action?.title}
            description={action?.description}
            icon={action?.icon}
            onClick={() => handleActionClick(action)}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;