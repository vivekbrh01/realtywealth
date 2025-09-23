import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTab = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'recent', label: 'Recent Activities', icon: 'Clock' },
    { id: 'milestones', label: 'Upcoming Milestones', icon: 'Calendar' },
    { id: 'actions', label: 'Priority Actions', icon: 'AlertCircle' }
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex space-x-8">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth
              ${activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ActivityTab;