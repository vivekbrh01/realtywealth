import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MaintenanceMetrics from './components/MaintenanceMetrics';
import MaintenanceFilters from './components/MaintenanceFilters';
import MaintenanceTable from './components/MaintenanceTable';
import CreateMaintenanceModal from './components/CreateMaintenanceModal';
import MaintenanceDetailsModal from './components/MaintenanceDetailsModal';

const MaintenanceOrders = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filters, setFilters] = useState({});

  // Mock maintenance requests data
  const mockRequests = [
    {
      id: 1,
      requestId: "MR001",
      property: {
        name: "Prestige Lakeside Habitat",
        address: "Whitefield, Bangalore - 560066"
      },
      client: {
        name: "Rajesh Kumar Sharma",
        phone: "+91 98765 43210"
      },
      maintenanceType: "plumbing",
      issueDescription: "Kitchen sink faucet is leaking continuously. Water pressure is also very low in the bathroom taps. Need immediate attention as it\'s causing water wastage.",
      priority: "high",
      status: "in-progress",
      assignedTo: {
        name: "Suresh Plumbing Services",
        role: "Plumbing Contractor"
      },
      createdAt: new Date('2024-09-15T10:30:00'),
      targetDate: new Date('2024-09-20T18:00:00'),
      estimatedCost: 8500,
      photos: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop"
      ],
      timeline: [
        {
          action: "Request submitted by client",
          timestamp: new Date('2024-09-15T10:30:00'),
          notes: "Initial request with photos"
        },
        {
          action: "Assigned to Suresh Plumbing Services",
          timestamp: new Date('2024-09-15T14:20:00'),
          notes: "Contractor contacted and site visit scheduled"
        },
        {
          action: "Site inspection completed",
          timestamp: new Date('2024-09-16T11:00:00'),
          notes: "Issue confirmed, parts ordered"
        }
      ]
    },
    {
      id: 2,
      requestId: "MR002",
      property: {
        name: "DLF Cyber City",
        address: "Gurgaon, Delhi NCR - 122002"
      },
      client: {
        name: "Priya Patel",
        phone: "+91 87654 32109"
      },
      maintenanceType: "electrical",
      issueDescription: "Power fluctuation in the living room. Some switches are not working properly and there\'s a burning smell from the main electrical panel.",
      priority: "critical",
      status: "assigned",
      assignedTo: {
        name: "Delhi Electrical Works",
        role: "Electrical Contractor"
      },
      createdAt: new Date('2024-09-16T09:15:00'),
      targetDate: new Date('2024-09-18T17:00:00'),
      estimatedCost: 15000,
      timeline: [
        {
          action: "Emergency request submitted",
          timestamp: new Date('2024-09-16T09:15:00'),
          notes: "Critical electrical issue reported"
        },
        {
          action: "Assigned to Delhi Electrical Works",
          timestamp: new Date('2024-09-16T10:00:00'),
          notes: "Emergency response team dispatched"
        }
      ]
    },
    {
      id: 3,
      requestId: "MR003",
      property: {
        name: "Godrej Properties",
        address: "Bandra East, Mumbai - 400051"
      },
      client: {
        name: "Amit Singh",
        phone: "+91 76543 21098"
      },
      maintenanceType: "hvac",
      issueDescription: "Air conditioning unit in master bedroom is not cooling properly. Making unusual noise and consuming more electricity than usual.",
      priority: "medium",
      status: "completed",
      assignedTo: {
        name: "Cool Air Services",
        role: "HVAC Technician"
      },
      createdAt: new Date('2024-09-10T14:45:00'),
      targetDate: new Date('2024-09-15T16:00:00'),
      estimatedCost: 12000,
      actualCost: 11500,
      timeline: [
        {
          action: "Request submitted",
          timestamp: new Date('2024-09-10T14:45:00')
        },
        {
          action: "Assigned to Cool Air Services",
          timestamp: new Date('2024-09-11T09:00:00')
        },
        {
          action: "Service completed",
          timestamp: new Date('2024-09-14T15:30:00'),
          notes: "AC serviced, gas refilled, filters replaced"
        },
        {
          action: "Client approval received",
          timestamp: new Date('2024-09-14T18:00:00'),
          notes: "Client satisfied with service quality"
        }
      ]
    },
    {
      id: 4,
      requestId: "MR004",
      property: {
        name: "Brigade Gateway",
        address: "Rajajinagar, Bangalore - 560010"
      },
      client: {
        name: "Sneha Gupta",
        phone: "+91 65432 10987"
      },
      maintenanceType: "painting",
      issueDescription: "Living room and bedroom walls need repainting. There are water stains on the ceiling and some wall cracks that need to be fixed before painting.",
      priority: "low",
      status: "submitted",
      assignedTo: null,
      createdAt: new Date('2024-09-17T11:20:00'),
      targetDate: new Date('2024-09-25T18:00:00'),
      estimatedCost: 25000,
      timeline: [
        {
          action: "Request submitted",
          timestamp: new Date('2024-09-17T11:20:00'),
          notes: "Detailed painting requirements provided"
        }
      ]
    },
    {
      id: 5,
      requestId: "MR005",
      property: {
        name: "Hiranandani Gardens",
        address: "Powai, Mumbai - 400076"
      },
      client: {
        name: "Vikram Reddy",
        phone: "+91 54321 09876"
      },
      maintenanceType: "security",
      issueDescription: "CCTV camera in parking area is not working. Door lock system also needs upgrade for better security. Motion sensors need calibration.",
      priority: "high",
      status: "pending-approval",
      assignedTo: {
        name: "SecureHome Systems",
        role: "Security Systems Specialist"
      },
      createdAt: new Date('2024-09-14T16:30:00'),
      targetDate: new Date('2024-09-22T17:00:00'),
      estimatedCost: 35000,
      timeline: [
        {
          action: "Request submitted",
          timestamp: new Date('2024-09-14T16:30:00')
        },
        {
          action: "Assigned to SecureHome Systems",
          timestamp: new Date('2024-09-15T10:00:00')
        },
        {
          action: "Site survey completed",
          timestamp: new Date('2024-09-16T14:00:00'),
          notes: "Detailed quote prepared, awaiting client approval"
        }
      ]
    }
  ];

  useEffect(() => {
    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);

    let filtered = mockRequests;

    if (newFilters?.location) {
      filtered = filtered?.filter(request =>
        request?.property?.address?.toLowerCase()?.includes(newFilters?.location?.toLowerCase())
      );
    }

    if (newFilters?.maintenanceType) {
      filtered = filtered?.filter(request =>
        request?.maintenanceType === newFilters?.maintenanceType
      );
    }
    if (newFilters?.priority) {
      filtered = filtered?.filter(request =>
        request?.priority === newFilters?.priority
      );
    }

    if (newFilters?.status) {
      filtered = filtered?.filter(request =>
        request?.status === newFilters?.status
      );
    }

    if (newFilters?.search) {
      filtered = filtered?.filter(request =>
        request?.requestId?.toLowerCase()?.includes(newFilters?.search?.toLowerCase()) ||
        request?.client?.name?.toLowerCase()?.includes(newFilters?.search?.toLowerCase()) ||
        request?.property?.name?.toLowerCase()?.includes(newFilters?.search?.toLowerCase()) ||
        request?.issueDescription?.toLowerCase()?.includes(newFilters?.search?.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  };

  const handleCreateRequest = async (formData) => {
    // Mock API call
    const newRequest = {
      id: requests?.length + 1,
      requestId: `MR${String(requests?.length + 1)?.padStart(3, '0')}`,
      property: mockRequests?.find(r => r?.property?.name)?.property || { name: "Selected Property", address: "Address" },
      client: mockRequests?.find(r => r?.client?.name)?.client || { name: "Selected Client", phone: "+91 00000 00000" },
      maintenanceType: formData?.maintenanceType,
      issueDescription: formData?.issueDescription,
      priority: formData?.priority,
      status: "submitted",
      assignedTo: null,
      createdAt: new Date(),
      targetDate: new Date(formData.preferredDate || Date.now() + 7 * 24 * 60 * 60 * 1000),
      timeline: [
        {
          action: "Request submitted",
          timestamp: new Date(),
          notes: "New maintenance request created"
        }
      ]
    };

    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateStatus = async (requestId, newStatus, notes) => {
    // Mock API call
    const updatedRequests = requests?.map(request => {
      if (request?.id === requestId) {
        const updatedTimeline = [
          ...request?.timeline,
          {
            action: `Status updated to ${newStatus?.replace('-', ' ')}`,
            timestamp: new Date(),
            notes: notes || `Status changed to ${newStatus?.replace('-', ' ')}`
          }
        ];

        return {
          ...request,
          status: newStatus,
          timeline: updatedTimeline
        };
      }
      return request;
    });

    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Maintenance Orders</h1>
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link to="/sales-workflow" className="hover:text-gray-700">Sales Workflow</Link>
                <Icon name="ChevronRight" size={16} />
                <Link to="/purchase-workflow" className="hover:text-gray-700">Purchase Workflow</Link>
                <Icon name="ChevronRight" size={16} />
                <span className="text-gray-900 font-medium">Maintenance Orders</span>
              </nav>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Create Request
            </Button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Dashboard */}
        <MaintenanceMetrics />

        {/* Filters */}
        <MaintenanceFilters
          onFiltersChange={handleFiltersChange}
          resultCount={filteredRequests?.length}
        />

        {/* Maintenance Requests Table */}
        <MaintenanceTable
          requests={filteredRequests}
          onViewDetails={handleViewDetails}
          onUpdateStatus={(request) => {
            setSelectedRequest(request);
            setIsDetailsModalOpen(true);
          }}
        />

        {/* Empty State */}
        {filteredRequests?.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Icon name="Wrench" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests found</h3>
            <p className="text-gray-600 mb-6">
              {Object.values(filters)?.some(f => f)
                ? "Try adjusting your filters to see more results." : "Get started by creating your first maintenance request."
              }
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Create Request
            </Button>
          </div>
        )}
      </div>
      {/* Modals */}
      <CreateMaintenanceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRequest}
      />
      <MaintenanceDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        request={selectedRequest}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default MaintenanceOrders;