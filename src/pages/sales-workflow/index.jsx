import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

import SalesOrderTable from './components/SalesOrderTable';
import WorkflowVisualization from './components/WorkflowVisualization';
import FilterControls from './components/FilterControls';
import CreateSaleModal from './components/CreateSaleModal';
import StatusUpdateModal from './components/StatusUpdateModal';
import ActivityLog from './components/ActivityLog';
import SalesStats from './components/SalesStats';

const SalesWorkflow = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentWorkflowStage, setCurrentWorkflowStage] = useState('inquiry');
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    assignedEmployee: '',
    propertyType: '',
    searchTerm: '',
    fromDate: '',
    toDate: ''
  });

  // Mock data for sales orders
  const mockSalesOrders = [
    {
      id: 'SO001',
      clientName: 'Rajesh Gupta',
      clientPhone: '+91 98765 43210',
      propertyTitle: 'Prestige Lakeside Habitat',
      propertyLocation: 'Whitefield, Bangalore',
      propertyType: 'apartment',
      carpetArea: 1200,
      saleAmount: 8500000,
      status: 'documentation',
      assignedRM: 'Priya Sharma',
      targetDate: '2025-01-15',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-10T14:30:00Z'
    },
    {
      id: 'SO002',
      clientName: 'Priya Mehta',
      clientPhone: '+91 87654 32109',
      propertyTitle: 'Brigade Gateway',
      propertyLocation: 'Rajaji Nagar, Bangalore',
      propertyType: 'apartment',
      carpetArea: 950,
      saleAmount: 6200000,
      status: 'legal-verification',
      assignedRM: 'Amit Patel',
      targetDate: '2025-01-20',
      createdAt: '2024-11-25T09:15:00Z',
      updatedAt: '2024-12-08T11:45:00Z'
    },
    {
      id: 'SO003',
      clientName: 'Amit Sharma',
      clientPhone: '+91 76543 21098',
      propertyTitle: 'Sobha City Villa',
      propertyLocation: 'Thanisandra, Bangalore',
      propertyType: 'villa',
      carpetArea: 2500,
      saleAmount: 15000000,
      status: 'payment-processing',
      assignedRM: 'Sneha Reddy',
      targetDate: '2025-02-01',
      createdAt: '2024-11-20T16:20:00Z',
      updatedAt: '2024-12-12T09:10:00Z'
    },
    {
      id: 'SO004',
      clientName: 'Sneha Patel',
      clientPhone: '+91 65432 10987',
      propertyTitle: 'Godrej Properties',
      propertyLocation: 'Electronic City, Bangalore',
      propertyType: 'apartment',
      carpetArea: 1350,
      saleAmount: 7800000,
      status: 'inquiry',
      assignedRM: 'Vikram Singh',
      targetDate: '2025-01-30',
      createdAt: '2024-12-15T12:00:00Z',
      updatedAt: '2024-12-15T12:00:00Z'
    },
    {
      id: 'SO005',
      clientName: 'Vikram Reddy',
      clientPhone: '+91 54321 09876',
      propertyTitle: 'DLF Phase 3 Commercial',
      propertyLocation: 'Gurgaon, Delhi NCR',
      propertyType: 'commercial',
      carpetArea: 800,
      saleAmount: 12000000,
      status: 'final-transfer',
      assignedRM: 'Rajesh Kumar',
      targetDate: '2024-12-25',
      createdAt: '2024-11-10T08:30:00Z',
      updatedAt: '2024-12-16T15:20:00Z'
    }
  ];

  // Mock workflow stages
  const workflowStages = [
    {
      key: 'inquiry',
      name: 'Initial Inquiry',
      duration: '1-2 days',
      description: 'Client has expressed interest in the property. Initial discussions and requirement gathering.',
      requirements: [
        'Client contact information',
        'Property preference details',
        'Budget confirmation',
        'Initial site visit scheduling'
      ]
    },
    {
      key: 'documentation',
      name: 'Documentation',
      duration: '3-5 days',
      description: 'Collecting and verifying all required documents from client and property.',
      requirements: [
        'Client KYC documents',
        'Income proof and bank statements',
        'Property title verification',
        'NOC from society/builder'
      ],
      requiresCompliance: true
    },
    {
      key: 'legal-verification',
      name: 'Legal Verification',
      duration: '5-7 days',
      description: 'Legal team verification of property documents and compliance checks.',
      requirements: [
        'Title deed verification',
        'Encumbrance certificate',
        'RERA registration verification',
        'Legal opinion report'
      ],
      requiresCompliance: true
    },
    {
      key: 'payment-processing',
      name: 'Payment Processing',
      duration: '2-3 days',
      description: 'Processing payments, loan approvals, and agreement execution.',
      requirements: [
        'Sale agreement execution',
        'Token amount processing',
        'Loan documentation',
        'Payment schedule confirmation'
      ]
    },
    {
      key: 'final-transfer',
      name: 'Final Transfer',
      duration: '3-5 days',
      description: 'Property registration and final handover process.',
      requirements: [
        'Registration documents',
        'Stamp duty payment',
        'Property handover',
        'Utility transfers'
      ]
    },
    {
      key: 'completed',
      name: 'Completed',
      duration: 'Complete',
      description: 'Sale process successfully completed.',
      requirements: []
    }
  ];

  // Mock activities
  const mockActivities = [
    {
      id: 'ACT001',
      orderId: 'SO001',
      type: 'status_update',
      title: 'Status Updated',
      description: 'Order status changed from Initial Inquiry to Documentation',
      details: {
        previousStatus: 'Initial Inquiry',
        newStatus: 'Documentation'
      },
      user: 'Priya Sharma',
      timestamp: '2024-12-10T14:30:00Z'
    },
    {
      id: 'ACT002',
      orderId: 'SO002',
      type: 'document_upload',
      title: 'Documents Uploaded',
      description: 'Legal verification documents uploaded',
      details: {
        documents: ['Title Deed', 'Encumbrance Certificate', 'RERA Certificate']
      },
      user: 'Amit Patel',
      timestamp: '2024-12-08T11:45:00Z'
    },
    {
      id: 'ACT003',
      orderId: 'SO003',
      type: 'payment',
      title: 'Payment Received',
      description: 'Token amount payment processed',
      details: {
        amount: 500000
      },
      user: 'Sneha Reddy',
      timestamp: '2024-12-12T09:10:00Z'
    },
    {
      id: 'ACT004',
      orderId: 'SO004',
      type: 'assignment',
      title: 'Order Assigned',
      description: 'Order assigned to relationship manager',
      details: {
        assignedTo: 'Vikram Singh'
      },
      user: 'System Admin',
      timestamp: '2024-12-15T12:00:00Z'
    },
    {
      id: 'ACT005',
      orderId: 'SO005',
      type: 'communication',
      title: 'Client Communication',
      description: 'Final handover meeting scheduled with client',
      user: 'Rajesh Kumar',
      timestamp: '2024-12-16T15:20:00Z'
    }
  ];

  // Mock sales statistics
  const salesStats = {
    totalSalesValue: 49500000,
    salesValueChange: 12.5,
    activeOrders: 4,
    activeOrdersChange: -8.3,
    completedThisMonth: 2,
    completedChange: 25.0,
    averageDealSize: 9900000,
    dealSizeChange: 5.2
  };

  useEffect(() => {
    setSalesOrders(mockSalesOrders);
    setActivities(mockActivities);
  }, []);

  useEffect(() => {
    let filtered = salesOrders;

    if (filters?.status) {
      filtered = filtered?.filter(order => order?.status === filters?.status);
    }

    if (filters?.assignedEmployee) {
      filtered = filtered?.filter(order =>
        order?.assignedRM?.toLowerCase()?.replace(' ', '-') === filters?.assignedEmployee
      );
    }

    if (filters?.propertyType) {
      filtered = filtered?.filter(order => order?.propertyType === filters?.propertyType);
    }

    if (filters?.searchTerm) {
      filtered = filtered?.filter(order =>
        order?.clientName?.toLowerCase()?.includes(filters?.searchTerm?.toLowerCase()) ||
        order?.propertyTitle?.toLowerCase()?.includes(filters?.searchTerm?.toLowerCase())
      );
    }

    if (filters?.fromDate) {
      filtered = filtered?.filter(order =>
        new Date(order.createdAt) >= new Date(filters.fromDate)
      );
    }

    if (filters?.toDate) {
      filtered = filtered?.filter(order =>
        new Date(order.createdAt) <= new Date(filters.toDate)
      );
    }

    setFilteredOrders(filtered);
  }, [salesOrders, filters]);

  const handleCreateSale = (newSale) => {
    const updatedOrders = [...salesOrders, newSale];
    setSalesOrders(updatedOrders);

    // Add activity log
    const newActivity = {
      id: `ACT${Date.now()}`,
      orderId: newSale?.id,
      type: 'assignment',
      title: 'New Sales Order Created',
      description: `Sales order created for ${newSale?.clientName}`,
      details: {
        assignedTo: newSale?.assignedRM
      },
      user: 'Current User',
      timestamp: new Date()?.toISOString()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleStatusUpdate = (updateData) => {
    const updatedOrders = salesOrders?.map(order => {
      if (order?.id === updateData?.orderId) {
        return {
          ...order,
          status: updateData?.newStatus,
          updatedAt: updateData?.updatedAt
        };
      }
      return order;
    });
    setSalesOrders(updatedOrders);

    // Add activity log
    const newActivity = {
      id: `ACT${Date.now()}`,
      orderId: updateData?.orderId,
      type: 'status_update',
      title: 'Status Updated',
      description: updateData?.notes || 'Order status updated',
      details: {
        previousStatus: selectedOrder?.status,
        newStatus: updateData?.newStatus
      },
      user: updateData?.updatedBy,
      timestamp: updateData?.updatedAt
    };
    setActivities(prev => [newActivity, ...prev]);
    setIsStatusModalOpen(false);
    setSelectedOrder(null);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setCurrentWorkflowStage(order?.status);
  };

  const handleStatusUpdateClick = (order) => {
    setSelectedOrder(order);
    setIsStatusModalOpen(true);
  };

  const handleAssignEmployee = (order) => {
    console.log('Assign employee for order:', order?.id);
    // This would open an assignment modal in a real application
  };

  const handleStageClick = (stageKey) => {
    setCurrentWorkflowStage(stageKey);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      assignedEmployee: '',
      propertyType: '',
      searchTerm: '',
      fromDate: '',
      toDate: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Sales Workflow</h1>
              <div className="ml-4 flex items-center space-x-2">
                <span className="text-sm text-gray-500">Total Orders:</span>
                <span className="text-sm font-medium text-gray-900">{salesOrders?.length}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-4">
                <Link
                  to="/sales-workflow"
                  className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
                >
                  Sales Workflow
                </Link>
                <Link
                  to="/purchase-workflow"
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  Purchase Workflow
                </Link>
                <Link
                  to="/maintenance-orders"
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  Maintenance Orders
                </Link>
              </nav>

              <Button
                variant="default"
                iconName="Plus"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create New Sale
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sales Statistics */}
        <div className="mb-8">
          <SalesStats stats={salesStats} />
        </div>

        {/* Workflow Visualization */}
        <div className="mb-8">
          <WorkflowVisualization
            currentStage={currentWorkflowStage}
            stages={workflowStages}
            onStageClick={handleStageClick}
          />
        </div>

        {/* Filter Controls */}
        <div className="mb-8">
          <FilterControls
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Orders Table */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Sales Orders ({filteredOrders?.length})
              </h2>
              <div className="text-sm text-gray-500">
                Showing {filteredOrders?.length} of {salesOrders?.length} orders
              </div>
            </div>

            <SalesOrderTable
              orders={filteredOrders}
              onStatusUpdate={handleStatusUpdateClick}
              onViewDetails={handleViewDetails}
              onAssignEmployee={handleAssignEmployee}
            />
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-1">
            <ActivityLog
              activities={activities}
              orderId={selectedOrder?.id}
            />
          </div>
        </div>
      </div>
      {/* Modals */}
      <CreateSaleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSale}
      />
      <StatusUpdateModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        order={selectedOrder}
        onUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default SalesWorkflow;