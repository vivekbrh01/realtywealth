import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ComplianceTab from './ComplianceTab';
import FinancialTab from './FinancialTab';
import MaintenanceTab from './MaintenanceTab';

const PropertyTabs = ({ property }) => {
  const [activeTab, setActiveTab] = useState('compliance');

  const tabs = [
    {
      id: 'compliance',
      label: 'Compliance Information',
      icon: 'Shield',
      component: ComplianceTab
    },
    {
      id: 'financial',
      label: 'Financial History',
      icon: 'TrendingUp',
      component: FinancialTab
    },
    {
      id: 'maintenance',
      label: 'Maintenance Records',
      icon: 'Wrench',
      component: MaintenanceTab
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-2">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-0 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-smooth
                ${activeTab === tab?.id
                  ? 'border-b-2 border-primary text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {ActiveComponent && <ActiveComponent property={property} />}
      </div>
    </div>
  );
};

export default PropertyTabs;