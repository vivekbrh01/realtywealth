import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PurchaseCard from './components/PurchaseCard';
import FilterPanel from './components/FilterPanel';
import InitiatePurchaseModal from './components/InitiatePurchaseModal';
import PurchaseDetailsModal from './components/PurchaseDetailsModal';
import ActivityTimeline from './components/ActivityTimeline';
const PurchaseWorkflow = () => {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    clientType: '',
    location: '',
    assignedManager: '',
    investmentRange: '',
    search: ''
  });
  const [isInitiateModalOpen, setIsInitiateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [currentView, setCurrentView] = useState('grid'); // grid, list
  // Mock purchase data
  const mockPurchases = [
    {
      id: 'PUR-2024-001',
      clientName: 'Rajesh Mehta',
      clientType: 'High Net Worth Individual',
      contactNumber: '+91 98765 43210',
      propertyTitle: 'Luxury Apartment in Bandra West',
      location: 'Mumbai',
      investmentAmount: 35000000,
      status: 'due-diligence',
      assignedManager: 'Priya Sharma',
      startDate: '15/01/2024',
      expectedCompletion: '15/04/2024',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'PUR-2024-002',
      clientName: 'Sunita Agarwal',
      clientType: 'Corporate Client',
      contactNumber: '+91 98765 43211',
      propertyTitle: 'Commercial Space in Cyber City',
      location: 'Gurgaon',
      investmentAmount: 75000000,
      status: 'legal-verification',
      assignedManager: 'Amit Patel',
      startDate: '10/01/2024',
      expectedCompletion: '10/05/2024',
      lastUpdated: '1 day ago'
    },
    {
      id: 'PUR-2024-003',
      clientName: 'Vikram Industries Ltd',
      clientType: 'Institutional Investor',
      contactNumber: '+91 98765 43212',
      propertyTitle: 'Industrial Plot in MIDC',
      location: 'Pune',
      investmentAmount: 120000000,
      status: 'rera-compliance',
      assignedManager: 'Sneha Gupta',
      startDate: '05/01/2024',
      expectedCompletion: '05/06/2024',
      lastUpdated: '3 hours ago'
    },
    {
      id: 'PUR-2024-004',
      clientName: 'Arjun Kapoor',
      clientType: 'Individual Investor',
      contactNumber: '+91 98765 43213',
      propertyTitle: 'Villa in Whitefield',
      location: 'Bangalore',
      investAmount: 28000000,
      status: 'financing-arrangement',
      assignedManager: 'Rajesh Kumar',
      startDate: '20/12/2023',
      expectedCompletion: '20/04/2024',
      lastUpdated: '5 hours ago'
    },
    {
      id: 'PUR-2024-005',
      clientName: 'Meera Investments',
      clientType: 'Corporate Client',
      contactNumber: '+91 98765 43214',
      propertyTitle: 'Penthouse in Hitech City',
      location: 'Hyderabad',
      investmentAmount: 45000000,
      status: 'documentation',
      assignedManager: 'Vikram Singh',
      startDate: '01/12/2023',
      expectedCompletion: '01/04/2024',
      lastUpdated: '1 hour ago'
    },
    {
      id: 'PUR-2024-006',
      clientName: 'Deepak Shah',
      clientType: 'High Net Worth Individual',
      contactNumber: '+91 98765 43215',
      propertyTitle: 'Luxury Apartment in Anna Nagar',
      location: 'Chennai',
      investmentAmount: 32000000,
      status: 'completed',
      assignedManager: 'Priya Sharma',
      startDate: '15/10/2023',
      expectedCompletion: '15/02/2024',
      lastUpdated: '2 days ago'
    }
  ];
  // Mock activity data
  const mockActivities = [
    {
      id: 'ACT-001',
      type: 'status-update',
      title: 'Status Updated to Due Diligence',
      description: 'Purchase workflow for Rajesh Mehta moved to due diligence phase. Property valuation initiated.',
      performedBy: 'Priya Sharma',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      purchaseId: 'PUR-2024-001',
      stage: 'Due Diligence'
    },
    {
      id: 'ACT-002',
      type: 'document-upload',
      title: 'Legal Documents Uploaded',
      description: 'Title deed and encumbrance certificate uploaded for legal verification process.',
      performedBy: 'Amit Patel',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      purchaseId: 'PUR-2024-002',
      stage: 'Legal Verification',
      attachments: ['title_deed.pdf', 'encumbrance_certificate.pdf']
    },
    {
      id: 'ACT-003',
      type: 'client-communication',
      title: 'Client Meeting Scheduled',
      description: 'Meeting scheduled with Vikram Industries Ltd to discuss RERA compliance requirements.',
      performedBy: 'Sneha Gupta',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      purchaseId: 'PUR-2024-003',
      stage: 'RERA Compliance'
    },
    {
      id: 'ACT-004',
      type: 'approval',
      title: 'Loan Pre-approval Received',
      description: 'Bank has provided pre-approval for loan amount of ₹20 Cr for Arjun Kapoor\'s villa purchase.',
      performedBy: 'Rajesh Kumar',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      purchaseId: 'PUR-2024-004',
      stage: 'Financing Arrangement'
    },
    {
      id: 'ACT-005',
      type: 'verification',
      title: 'RERA Registration Verified',
      description: 'Property RERA registration number verified and compliance documentation completed.',
      performedBy: 'Sneha Gupta',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      purchaseId: 'PUR-2024-003',
      stage: 'RERA Compliance'
    },
    {
      id: 'ACT-006',
      type: 'note',
      title: 'Property Inspection Completed',
      description: 'Technical inspection completed for luxury apartment. Minor repairs required before handover.',
      performedBy: 'Vikram Singh',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      purchaseId: 'PUR-2024-005',
      stage: 'Documentation'
    }
  ];
  useEffect(() => {
    setPurchases(mockPurchases);
    setActivities(mockActivities);
  }, []);
  useEffect(() => {
    let filtered = purchases;
    // Apply filters
    if (filters?.status) {
      filtered = filtered?.filter(purchase => purchase?.status === filters?.status);
    }
    if (filters?.clientType) {
      filtered = filtered?.filter(purchase =>

        purchase?.clientType?.toLowerCase()?.includes(filters?.clientType?.toLowerCase())
      );
    }
    if (filters?.location) {
      filtered = filtered?.filter(purchase =>

        purchase?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }
    if (filters?.assignedManager) {
      filtered = filtered?.filter(purchase =>
        purchase?.assignedManager?.toLowerCase()?.replace(' ', '-') ===
        filters?.assignedManager
      );
    }
    if (filters?.investmentRange) {
      const [min, max] = filters?.investmentRange?.split('-')?.map(v =>
        v === '+' ? Infinity : parseInt(v) * 100000
      );
      filtered = filtered?.filter(purchase => {
        const amount = purchase?.investmentAmount;
        return max === undefined ? amount >= min : amount >= min && amount
          <= max;
      });
    }
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(purchase =>
        purchase?.clientName?.toLowerCase()?.includes(searchTerm) ||
        purchase?.propertyTitle?.toLowerCase()?.includes(searchTerm) ||
        purchase?.id?.toLowerCase()?.includes(searchTerm) ||
        purchase?.location?.toLowerCase()?.includes(searchTerm)
      );
    }
    setFilteredPurchases(filtered);
  }, [purchases, filters]);
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleClearFilters = () => {
    setFilters({
      status: '',
      clientType: '',
      location: '',
      assignedManager: '',
      investmentRange: '',
      search: ''
    });
  };
  const handleInitiatePurchase = (formData) => {
    const newPurchase = {
      id: `PUR-2024-${String(purchases?.length + 1)?.padStart(3, '0')}`,
      clientName: formData?.clientName,
      clientType: formData?.clientType,
      contactNumber: formData?.contactNumber,
      propertyTitle: 'Property to be identified',
      location: Array.isArray(formData?.preferredLocations)
        ? formData?.preferredLocations?.join(', ')
        : formData?.preferredLocations,
      investmentAmount: parseInt(formData?.budgetMax),
      status: 'property-identification',
      assignedManager: formData?.assignedManager,
      startDate: new Date()?.toLocaleDateString('en-IN'),
      expectedCompletion: new Date(Date.now() + 90 * 24 * 60 * 60 *
        1000)?.toLocaleDateString('en-IN'),
      lastUpdated: 'Just now'
    };
    setPurchases(prev => [newPurchase, ...prev]);
    // Add activity
    const newActivity = {
      id: `ACT-${Date.now()}`,
      type: 'assignment',
      title: 'New Purchase Workflow Initiated',
      description: `Purchase workflow initiated for ${formData?.clientName}. 
Assigned to ${formData?.assignedManager}.`,
      performedBy: 'System',
      timestamp: new Date(),
      purchaseId: newPurchase?.id,
      stage: 'Property Identification'
    };
    setActivities(prev => [newActivity, ...prev]);
  };
  const handleViewDetails = (purchase) => {
    setSelectedPurchase(purchase);
    setIsDetailsModalOpen(true);
  };
  const handleUpdateStatus = (purchaseId, newStatus, note) => {
    setPurchases(prev => prev?.map(purchase =>
      purchase?.id === purchaseId
        ? { ...purchase, status: newStatus, lastUpdated: 'Just now' }
        : purchase
    ));
    // Add activity
    const purchase = purchases?.find(p => p?.id === purchaseId);
    const newActivity = {
      id: `ACT-${Date.now()}`,
      type: 'status-update',
      title: `Status Updated to ${newStatus?.replace('-', ' ')?.replace(/\b\w/g, l =>
        l?.toUpperCase())}`,
      description: note || `Purchase workflow status updated for $
{purchase?.clientName}.`,
      performedBy: 'Current User',
      timestamp: new Date(),
      purchaseId: purchaseId,
      stage: newStatus?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())
    };
    setActivities(prev => [newActivity, ...prev]);
  };
  const getStatusStats = () => {
    const stats = {};
    purchases?.forEach(purchase => {
      stats[purchase.status] = (stats?.[purchase?.status] || 0) + 1;
    });
    return stats;
  };
  const statusStats = getStatusStats();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Purchase
                Workflow</h1>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-
medium rounded-full">
                  {filteredPurchases?.length} Active
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm 
font-medium rounded-full">
                  {statusStats?.completed || 0} Completed
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Navigation Links */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg 
p-1">
                <Link to="/sales-workflow">
                  <Button variant="ghost" size="sm">
                    <Icon name="TrendingUp" size={16} className="mr-2" />
                    Sales
                  </Button>
                </Link>
                <Button variant="secondary" size="sm">
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Purchase
                </Button>
                <Link to="/maintenance-orders">
                  <Button variant="ghost" size="sm">
                    <Icon name="Wrench" size={16} className="mr-2" />
                    Maintenance
                  </Button>
                </Link>
              </div>
              <Button
                onClick={() => setIsInitiateModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Initiate Purchase
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
            {/* View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing {filteredPurchases?.length} of {purchases?.length}
                  purchases
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={currentView === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('grid')}
                >
                  <Icon name="Grid3X3" size={16} />
                </Button>
                <Button
                  variant={currentView === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('list')}
                >
                  <Icon name="List" size={16} />
                </Button>
              </div>
            </div>
            {/* Purchase Cards */}
            <div className={`
              ${currentView === 'grid' ? 'grid grid-cols-1 xl:grid-cols-2 gap-6' : 'space-y-4'
              }
            `}>
              {filteredPurchases?.map((purchase) => (
                <PurchaseCard
                  key={purchase?.id}
                  purchase={purchase}
                  onViewDetails={handleViewDetails}
                  onUpdateStatus={(purchase) => {
                    setSelectedPurchase(purchase);
                    setIsDetailsModalOpen(true);
                  }}
                />
              ))}
            </div>
            {filteredPurchases?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No
                  purchase orders found</h3>
                <p className="text-gray-500 mb-6">
                  {Object.values(filters)?.some(filter => filter)
                    ? 'Try adjusting your filters to see more results.' : 'Get started by initiating your first purchase workflow.'
                  }
                </p>
                <Button
                  onClick={() => setIsInitiateModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Initiate Purchase
                </Button>
              </div>
            )}
          </div>
          {/* Activity Timeline Sidebar */}
          <div className="lg:col-span-1">
            <ActivityTimeline activities={activities} />
          </div>
        </div>
      </div>
      {/* Modals */}
      <InitiatePurchaseModal
        isOpen={isInitiateModalOpen}
        onClose={() => setIsInitiateModalOpen(false)}
        onSubmit={handleInitiatePurchase}
      />
      <PurchaseDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        purchase={selectedPurchase}
        onStatusUpdate={handleUpdateStatus}
      />
    </div >
  );
};
export default PurchaseWorkflow