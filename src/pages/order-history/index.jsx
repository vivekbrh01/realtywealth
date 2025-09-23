import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/Button';
import OrderFilters from './components/OrderFilters';
import OrderTable from './components/OrderTable';
import OrderStats from './components/OrderStats';
import OrderDetailModal from './components/OrderDetailModal';
import ExportModal from './components/ExportModal';

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    transactionType: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    amountRange: '',
    clientName: '',
    propertyLocation: ''
  });

  // Mock order data
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      orderNumber: 'RW-SL-240915-001',
      clientName: 'Rajesh Kumar Sharma',
      propertyTitle: 'Luxury 3BHK Apartment',
      propertyLocation: 'Bandra West, Mumbai',
      transactionType: 'sales',
      amount: 12500000,
      completionDate: '2024-09-15T14:30:00',
      assignedStaff: 'Priya Patel',
      staffRole: 'Senior Sales Manager',
      status: 'completed'
    },
    {
      id: 'ORD-2024-002',
      orderNumber: 'RW-PU-240914-002',
      clientName: 'Anita Desai',
      propertyTitle: '2BHK Villa with Garden',
      propertyLocation: 'Koramangala, Bangalore',
      transactionType: 'purchase',
      amount: 8500000,
      completionDate: '2024-09-14T11:15:00',
      assignedStaff: 'Amit Singh',
      staffRole: 'Purchase Specialist',
      status: 'completed'
    },
    {
      id: 'ORD-2024-003',
      orderNumber: 'RW-MT-240913-003',
      clientName: 'Vikram Malhotra',
      propertyTitle: 'Commercial Office Space',
      propertyLocation: 'Cyber City, Gurgaon',
      transactionType: 'maintenance',
      amount: 150000,
      completionDate: '2024-09-13T16:45:00',
      assignedStaff: 'Sunita Rao',
      staffRole: 'Maintenance Coordinator',
      status: 'in-progress'
    },
    {
      id: 'ORD-2024-004',
      orderNumber: 'RW-SL-240912-004',
      clientName: 'Deepak Agarwal',
      propertyTitle: '4BHK Penthouse',
      propertyLocation: 'Juhu, Mumbai',
      transactionType: 'sales',
      amount: 25000000,
      completionDate: '2024-09-12T10:00:00',
      assignedStaff: 'Kavita Joshi',
      staffRole: 'Senior Sales Manager',
      status: 'completed'
    },
    {
      id: 'ORD-2024-005',
      orderNumber: 'RW-PU-240911-005',
      clientName: 'Meera Nair',
      propertyTitle: '1BHK Studio Apartment',
      propertyLocation: 'Whitefield, Bangalore',
      transactionType: 'purchase',
      amount: 4200000,
      completionDate: '2024-09-11T13:20:00',
      assignedStaff: 'Rohit Gupta',
      staffRole: 'Purchase Specialist',
      status: 'pending'
    },
    {
      id: 'ORD-2024-006',
      orderNumber: 'RW-MT-240910-006',
      clientName: 'Suresh Reddy',
      propertyTitle: 'Residential Complex',
      propertyLocation: 'Hitech City, Hyderabad',
      transactionType: 'maintenance',
      amount: 300000,
      completionDate: '2024-09-10T09:30:00',
      assignedStaff: 'Lakshmi Iyer',
      staffRole: 'Maintenance Coordinator',
      status: 'cancelled'
    },
    {
      id: 'ORD-2024-007',
      orderNumber: 'RW-SL-240909-007',
      clientName: 'Arjun Kapoor',
      propertyTitle: '3BHK Independent House',
      propertyLocation: 'Sector 50, Noida',
      transactionType: 'sales',
      amount: 15000000,
      completionDate: '2024-09-09T15:10:00',
      assignedStaff: 'Neha Sharma',
      staffRole: 'Sales Executive',
      status: 'completed'
    },
    {
      id: 'ORD-2024-008',
      orderNumber: 'RW-PU-240908-008',
      clientName: 'Pooja Mehta',
      propertyTitle: '2BHK Flat',
      propertyLocation: 'Andheri East, Mumbai',
      transactionType: 'purchase',
      amount: 9500000,
      completionDate: '2024-09-08T12:45:00',
      assignedStaff: 'Rajesh Kumar',
      staffRole: 'Purchase Specialist',
      status: 'in-progress'
    }
  ];

  // Filter orders based on current filters
  const filteredOrders = useMemo(() => {
    return mockOrders?.filter(order => {
      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        const searchableText = `${order?.id} ${order?.orderNumber} ${order?.clientName} ${order?.propertyTitle} ${order?.propertyLocation}`?.toLowerCase();
        if (!searchableText?.includes(searchTerm)) return false;
      }

      // Transaction type filter
      if (filters?.transactionType && order?.transactionType !== filters?.transactionType) {
        return false;
      }

      // Status filter
      if (filters?.status && order?.status !== filters?.status) {
        return false;
      }

      // Client name filter
      if (filters?.clientName) {
        const clientNameTerm = filters?.clientName?.toLowerCase();
        if (!order?.clientName?.toLowerCase()?.includes(clientNameTerm)) return false;
      }

      // Property location filter
      if (filters?.propertyLocation) {
        const locationTerm = filters?.propertyLocation?.toLowerCase();
        if (!order?.propertyLocation?.toLowerCase()?.includes(locationTerm)) return false;
      }

      // Date range filter
      if (filters?.dateFrom || filters?.dateTo) {
        const orderDate = new Date(order.completionDate);
        if (filters?.dateFrom && orderDate < new Date(filters.dateFrom)) return false;
        if (filters?.dateTo && orderDate > new Date(filters.dateTo)) return false;
      }

      // Amount range filter
      if (filters?.amountRange) {
        const [min, max] = filters?.amountRange?.split('-')?.map(v => v?.replace('+', ''));
        const minAmount = parseInt(min) || 0;
        const maxAmount = max ? parseInt(max) : Infinity;

        if (order?.amount < minAmount || order?.amount > maxAmount) return false;
      }

      return true;
    });
  }, [filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalOrders = filteredOrders?.length;
    const totalRevenue = filteredOrders?.reduce((sum, order) => sum + order?.amount, 0);
    const completedOrders = filteredOrders?.filter(order => order?.status === 'completed')?.length;
    const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

    return {
      totalOrders,
      totalRevenue,
      completedOrders,
      completionRate
    };
  }, [filteredOrders]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting orders with config:', exportConfig);
    // Mock export functionality
    const exportData = {
      orders: filteredOrders,
      config: exportConfig,
      timestamp: new Date()?.toISOString()
    };

    // Simulate file download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-history-${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order History</h1>
            <p className="text-muted-foreground">
              Comprehensive transaction tracking across sales, purchases, and maintenance activities
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Link to="/sales-workflow">
              <Button variant="outline" iconName="TrendingUp" iconPosition="left">
                Sales Workflow
              </Button>
            </Link>
            <Link to="/purchase-workflow">
              <Button variant="outline" iconName="ShoppingCart" iconPosition="left">
                Purchase Workflow
              </Button>
            </Link>
            <Link to="/maintenance-orders">
              <Button variant="outline" iconName="Wrench" iconPosition="left">
                Maintenance
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <OrderStats stats={stats} />

        {/* Filters */}
        <OrderFilters
          filters={filters}
          onFiltersChange={setFilters}
          onExport={() => setIsExportModalOpen(true)}
          totalOrders={filteredOrders?.length}
        />

        {/* Orders Table */}
        <OrderTable
          orders={filteredOrders}
          onOrderClick={handleOrderClick}
          onViewDetails={handleViewDetails}
        />

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/sales-workflow">
              <Button variant="outline" iconName="Plus" iconPosition="left">
                New Sales Order
              </Button>
            </Link>
            <Link to="/purchase-workflow">
              <Button variant="outline" iconName="Plus" iconPosition="left">
                New Purchase Order
              </Button>
            </Link>
            <Link to="/maintenance-orders">
              <Button variant="outline" iconName="Plus" iconPosition="left">
                New Maintenance Request
              </Button>
            </Link>
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
              onClick={() => setIsExportModalOpen(true)}
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>
      {/* Modals */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedOrder(null);
        }}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default OrderHistory;