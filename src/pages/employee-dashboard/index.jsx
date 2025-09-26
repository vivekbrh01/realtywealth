import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StatusOverviewPanel from './components/StatusOverviewPanel';
import RecentRequestsTable from './components/RecentRequestsTable';
import QuickActionsPanel from './components/QuickActionsPanel';
import NotificationCenter from './components/NotificationCenter';
import SearchAndFilterControls from './components/SearchAndFilterControls';

const EmployeeDashboard = () => {
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});

  // Mock data for status counts
  const statusCounts = {
    pending: 8,
    approved: 24,
    rejected: 3,
    inReview: 5
  };

  // Mock data for recent requests
  const mockRequests = [
    {
      id: "REQ-2024-001",
      title: "Office Equipment Purchase - Standing Desk",
      type: "equipment",
      description: "Request for ergonomic standing desk for improved workplace wellness and productivity",
      status: "pending",
      createdAt: "2024-01-20T09:30:00Z",
      assignedTo: "Priya Sharma",
      amount: "₹25,000",
      category: "Office Equipment"
    },
    {
      id: "REQ-2024-002",
      title: "Annual Leave - Diwali Vacation",
      type: "leave",
      description: "Annual leave request for Diwali festival celebration with family",
      status: "approved",
      createdAt: "2024-01-18T14:15:00Z",
      assignedTo: "Rajesh Kumar",
      dueDate: "2024-01-25T00:00:00Z"
    },
    {
      id: "REQ-2024-003",
      title: "Client Meeting Travel - Mumbai",
      type: "travel",
      description: "Business travel request for client presentation and project discussion in Mumbai office",
      status: "in-review",
      createdAt: "2024-01-17T11:45:00Z",
      assignedTo: "Anita Desai",
      amount: "₹15,500",
      category: "Business Travel"
    },
    {
      id: "REQ-2024-004",
      title: "Software License - Adobe Creative Suite",
      type: "purchase",
      description: "Annual license renewal for Adobe Creative Suite for marketing design work",
      status: "rejected",
      createdAt: "2024-01-16T16:20:00Z",
      assignedTo: "Vikram Singh",
      amount: "₹45,000",
      category: "Software"
    },
    {
      id: "REQ-2024-005",
      title: "Database Access Permission",
      type: "permission",
      description: "Request for read-only access to customer database for quarterly report generation",
      status: "pending",
      createdAt: "2024-01-15T10:00:00Z",
      assignedTo: "Meera Patel",
      category: "Data Access"
    }
  ];

  // Mock data for notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Request Approved",
      message: "Your annual leave request for Diwali vacation has been approved by Rajesh Kumar. Enjoy your holidays!",
      type: "approval",
      createdAt: "2024-01-20T08:30:00Z",
      read: false,
      requestId: "REQ-2024-002",
      status: "approved"
    },
    {
      id: 2,
      title: "New Assignment",
      message: "You have been assigned to review the quarterly budget allocation request. Please review and provide feedback by end of week.",
      type: "assignment",
      createdAt: "2024-01-19T15:45:00Z",
      read: false,
      actionRequired: true
    },
    {
      id: 3,
      title: "Comment Added",
      message: "Priya Sharma added a comment to your equipment purchase request: 'Please provide vendor quotations for comparison.'",
      type: "comment",
      createdAt: "2024-01-19T12:20:00Z",
      read: true,
      requestId: "REQ-2024-001"
    },
    {
      id: 4,
      title: "Request Rejected",
      message: "Your software license request has been rejected. Reason: Budget constraints for current quarter. Please resubmit next quarter.",
      type: "rejection",
      createdAt: "2024-01-18T14:10:00Z",
      read: true,
      requestId: "REQ-2024-004",
      status: "rejected"
    },
    {
      id: 5,
      title: "Deadline Reminder",
      message: "Your travel request requires additional documentation. Please upload flight itinerary within 2 days.",
      type: "reminder",
      createdAt: "2024-01-17T09:00:00Z",
      read: false,
      requestId: "REQ-2024-003",
      actionRequired: true
    }
  ];

  useEffect(() => {
    setFilteredRequests(mockRequests);
  }, []);

  const handleStatusClick = (status) => {
    let filtered = mockRequests?.filter(request => {
      if (status === 'inReview') return request?.status === 'in-review';
      return request?.status === status;
    });
    setFilteredRequests(filtered);
    setActiveFilters({ status });
  };

  const handleSearch = (query) => {
    if (!query?.trim()) {
      setFilteredRequests(mockRequests);
      return;
    }

    let filtered = mockRequests?.filter(request =>
      request?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
      request?.id?.toLowerCase()?.includes(query?.toLowerCase()) ||
      request?.description?.toLowerCase()?.includes(query?.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  const handleFilter = (filters) => {
    let filtered = [...mockRequests];

    if (filters?.status) {
      filtered = filtered?.filter(request => {
        if (filters?.status === 'inReview') return request?.status === 'in-review';
        return request?.status === filters?.status;
      });
    }

    if (filters?.type) {
      filtered = filtered?.filter(request => request?.type === filters?.type);
    }

    if (filters?.dateRange) {
      const now = new Date();
      const filterDate = new Date();

      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'year':
          filterDate?.setFullYear(now?.getFullYear() - 1);
          break;
      }

      if (filters?.dateRange !== '') {
        filtered = filtered?.filter(request =>
          new Date(request.createdAt) >= filterDate
        );
      }
    }

    setFilteredRequests(filtered);
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setFilteredRequests(mockRequests);
    setActiveFilters({});
  };

  const handleViewDetails = (request) => {
    console.log('View details for request:', request?.id);
    // Navigate to request details page
  };

  const handleWithdraw = (request) => {
    console.log('Withdraw request:', request?.id);
    // Handle request withdrawal
  };

  const handleQuickAction = (action) => {
    console.log('Quick action clicked:', action?.id);
    // Navigate to appropriate form based on action type
  };

  const handleMarkAsRead = (notification) => {
    console.log('Mark notification as read:', notification?.id);
    // Update notification read status
  };

  const handleViewAllNotifications = () => {
    console.log('View all notifications');
    // Navigate to notifications page
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Employee Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your approval requests and quick actions.
            </p>
          </div>

          {/* Status Overview */}
          <StatusOverviewPanel
            statusCounts={statusCounts}
            onStatusClick={handleStatusClick}
          />

          {/* Search and Filter Controls */}
          <SearchAndFilterControls
            onSearch={handleSearch}
            onFilter={handleFilter}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Recent Requests */}
            <div className="xl:col-span-2">
              <RecentRequestsTable
                requests={filteredRequests}
                onViewDetails={handleViewDetails}
                onWithdraw={handleWithdraw}
              />
            </div>

            {/* Right Column - Notifications */}
            <div className="xl:col-span-1">
              <NotificationCenter
                notifications={mockNotifications}
                onMarkAsRead={handleMarkAsRead}
                onViewAll={handleViewAllNotifications}
              />
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="mt-8">
            <QuickActionsPanel onActionClick={handleQuickAction} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;