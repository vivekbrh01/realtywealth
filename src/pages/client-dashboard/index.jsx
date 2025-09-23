import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import ActivityTab from './components/ActivityTab';
import ActivityList from './components/ActivityList';
import MilestoneList from './components/MilestoneList';
import PriorityActionList from './components/PriorityActionList';
import ClientSummaryTable from './components/ClientSummaryTable';
import MarketInsights from './components/MarketInsights';
import PerformanceChart from './components/PerformanceChart';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recent');

  // Mock data for metrics
  const metricsData = [
    {
      title: 'Total Portfolio Value',
      value: 2850000000,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      currency: true
    },
    {
      title: 'Active Properties',
      value: 247,
      change: '+8',
      changeType: 'positive',
      icon: 'Building2'
    },
    {
      title: 'Pending Transactions',
      value: 18,
      change: '-3',
      changeType: 'positive',
      icon: 'FileText'
    },
    {
      title: 'Monthly Performance',
      value: 8.7,
      change: '+2.1%',
      changeType: 'positive',
      icon: 'BarChart3'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'property_added',
      title: 'New Property Added',
      description: 'Luxury apartment in Bandra West added to portfolio',
      client: 'Rajesh Sharma',
      timestamp: new Date(Date.now() - 1800000),
      amount: 12500000
    },
    {
      id: 2,
      type: 'transaction_completed',
      title: 'Sale Transaction Completed',
      description: 'Commercial space in Andheri successfully sold',
      client: 'Priya Patel',
      timestamp: new Date(Date.now() - 3600000),
      amount: 8750000
    },
    {
      id: 3,
      type: 'client_onboarded',
      title: 'New Client Onboarded',
      description: 'High-net-worth individual from Pune',
      client: 'Amit Gupta',
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 4,
      type: 'document_uploaded',
      title: 'RERA Documents Uploaded',
      description: 'Property registration documents verified',
      client: 'Sunita Reddy',
      timestamp: new Date(Date.now() - 10800000)
    },
    {
      id: 5,
      type: 'payment_received',
      title: 'Maintenance Payment Received',
      description: 'Monthly maintenance for Powai property',
      client: 'Vikram Singh',
      timestamp: new Date(Date.now() - 14400000),
      amount: 45000
    }
  ];

  // Mock data for upcoming milestones
  const upcomingMilestones = [
    {
      id: 1,
      title: 'Property Registration Due',
      description: 'Complete registration for Gurgaon commercial space',
      client: 'Neha Agarwal',
      property: 'Cyber City Tower B',
      dueDate: '2025-09-18',
      priority: 'high',
      type: 'Legal'
    },
    {
      id: 2,
      title: 'Loan Approval Meeting',
      description: 'Bank meeting for home loan approval',
      client: 'Rohit Mehta',
      property: 'Whitefield Residency',
      dueDate: '2025-09-20',
      priority: 'medium',
      type: 'Financial'
    },
    {
      id: 3,
      title: 'Property Handover',
      description: 'Final handover of keys to new owner',
      client: 'Kavita Joshi',
      property: 'Koramangala Apartment',
      dueDate: '2025-09-22',
      priority: 'high',
      type: 'Transaction'
    },
    {
      id: 4,
      title: 'Tax Filing Deadline',
      description: 'Submit property tax returns for Q2',
      client: 'Arjun Nair',
      property: 'Multiple Properties',
      dueDate: '2025-09-25',
      priority: 'medium',
      type: 'Compliance'
    }
  ];

  // Mock data for priority actions
  const priorityActions = [
    {
      id: 1,
      type: 'document_review',
      title: 'Urgent Document Review Required',
      description: 'RERA compliance documents need immediate verification for Pune project',
      client: 'Deepak Industries',
      dueDate: '2025-09-17',
      urgency: 'critical'
    },
    {
      id: 2,
      type: 'payment_follow_up',
      title: 'Payment Follow-up',
      description: 'Outstanding payment of ₹15L for Noida property purchase',
      client: 'Sanjay Enterprises',
      dueDate: '2025-09-19',
      urgency: 'high'
    },
    {
      id: 3,
      type: 'property_inspection',
      title: 'Property Inspection Scheduled',
      description: 'Pre-sale inspection for Hyderabad villa',
      client: 'Lakshmi Reddy',
      dueDate: '2025-09-21',
      urgency: 'medium'
    },
    {
      id: 4,
      type: 'client_meeting',
      title: 'Client Portfolio Review',
      description: 'Quarterly portfolio review and strategy discussion',
      client: 'Rajesh Kumar',
      dueDate: '2025-09-23',
      urgency: 'medium'
    }
  ];

  // Mock data for high-priority clients
  const highPriorityClients = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@email.com',
      portfolioValue: 450000000,
      valueChange: 12.5,
      propertyCount: 8,
      status: 'active',
      lastActivity: new Date(Date.now() - 86400000),
      lastActivityType: 'Property Added'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      portfolioValue: 320000000,
      valueChange: -2.1,
      propertyCount: 5,
      status: 'pending',
      lastActivity: new Date(Date.now() - 172800000),
      lastActivityType: 'Document Review'
    },
    {
      id: 3,
      name: 'Amit Gupta',
      email: 'amit.gupta@email.com',
      portfolioValue: 680000000,
      valueChange: 8.7,
      propertyCount: 12,
      status: 'active',
      lastActivity: new Date(Date.now() - 259200000),
      lastActivityType: 'Payment Received'
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      email: 'sunita.reddy@email.com',
      portfolioValue: 275000000,
      valueChange: 15.3,
      propertyCount: 6,
      status: 'review',
      lastActivity: new Date(Date.now() - 345600000),
      lastActivityType: 'Contract Signed'
    }
  ];

  // Mock data for market insights
  const marketInsights = [
    {
      id: 1,
      type: 'rera_update',
      title: 'New RERA Guidelines for Maharashtra',
      description: 'Updated compliance requirements for real estate projects in Mumbai and Pune effective from October 2025',
      date: '2025-09-15',
      region: 'Maharashtra',
      impact: 'high'
    },
    {
      id: 2,
      type: 'tax_regulation',
      title: 'Property Tax Revision in Delhi NCR',
      description: 'Circle rates increased by 5-8% across Gurgaon and Noida, affecting stamp duty calculations',
      date: '2025-09-14',
      region: 'Delhi NCR',
      impact: 'medium'
    },
    {
      id: 3,
      type: 'market_trend',
      title: 'Residential Demand Surge in Bangalore',
      description: 'IT sector growth driving 15% increase in residential property demand in tech corridors',
      date: '2025-09-13',
      region: 'Karnataka',
      impact: 'low'
    },
    {
      id: 4,
      type: 'policy_change',
      title: 'GST Rate Changes for Under-Construction Properties',
      description: 'Revised GST structure for residential projects under construction, effective from next quarter',
      date: '2025-09-12',
      region: 'Pan India',
      impact: 'high'
    }
  ];

  // Mock data for performance chart
  const performanceData = [
    { month: 'Apr 2025', value: 2450000000 },
    { month: 'May 2025', value: 2520000000 },
    { month: 'Jun 2025', value: 2680000000 },
    { month: 'Jul 2025', value: 2590000000 },
    { month: 'Aug 2025', value: 2750000000 },
    { month: 'Sep 2025', value: 2850000000 }
  ];

  const handleClientAction = (clientId, action) => {
    if (action === 'view') {
      // Navigate to client details or open modal
      console.log(`Viewing client ${clientId}`);
    } else if (action === 'add_property') {
      navigate('/property-management');
    }
  };

  const handleActionClick = (actionId, type) => {
    if (type === 'view') {
      console.log(`Viewing action ${actionId}`);
    } else if (type === 'complete') {
      console.log(`Completing action ${actionId}`);
    }
  };

  const handlePrimaryAction = (action) => {
    switch (action) {
      case 'add_client': navigate('/client-onboarding');
        break;
      case 'create_property': navigate('/property-management');
        break;
      case 'generate_report': console.log('Generating report...');
        break;
      default:
        break;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recent':
        return <ActivityList activities={recentActivities} />;
      case 'milestones':
        return <MilestoneList milestones={upcomingMilestones} />;
      case 'actions':
        return <PriorityActionList actions={priorityActions} onActionClick={handleActionClick} />;
      default:
        return <ActivityList activities={recentActivities} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Client Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive overview of client portfolios and active transactions
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                iconName="FileText"
                onClick={() => handlePrimaryAction('generate_report')}
              >
                Generate Report
              </Button>
              <Button
                variant="outline"
                iconName="Building2"
                onClick={() => handlePrimaryAction('create_property')}
              >
                Create Property Listing
              </Button>
              <Button
                variant="default"
                iconName="UserPlus"
                onClick={() => handlePrimaryAction('add_client')}
              >
                Add New Client
              </Button>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                currency={metric?.currency}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Activities Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Activity Tabs */}
              <div className="bg-card border border-border rounded-md">
                <div className="px-6 py-4">
                  <ActivityTab activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
                <div className="px-6 pb-6">
                  {renderTabContent()}
                </div>
              </div>

              {/* Performance Chart */}
              <PerformanceChart data={performanceData} />
            </div>

            {/* Market Insights */}
            <div className="space-y-6">
              <MarketInsights insights={marketInsights} />
            </div>
          </div>

          {/* Client Summary Table */}
          <div className="mb-8">
            <ClientSummaryTable 
              clients={highPriorityClients} 
              onClientAction={handleClientAction}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;