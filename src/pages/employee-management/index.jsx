import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFilters from './components/EmployeeFilters';
import TeamAnalytics from './components/TeamAnalytics';
import EmployeeModal from './components/EmployeeModal';

const EmployeeManagement = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'view', // 'view', 'edit', 'assign', 'add'
    employee: null
  });

  const [filters, setFilters] = useState({
    search: '',
    department: '',
    role: '',
    location: '',
    status: '',
    workload: ''
  });

  // Mock employee data
  const mockEmployees = [
    {
      id: 'EMP001',
      employeeId: 'RW001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@realtywealth.com',
      phone: '+91 98765 43210',
      role: 'Senior Manager',
      department: 'Sales',
      location: 'Mumbai',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      activeAssignments: 8,
      completedAssignments: 45,
      workloadPercentage: 85,
      performanceScore: 4.2,
      joinDate: '2022-03-15',
      skills: ['Property Valuation', 'Client Relations', 'Market Analysis']
    },
    {
      id: 'EMP002',
      employeeId: 'RW002',
      name: 'Priya Sharma',
      email: 'priya.sharma@realtywealth.com',
      phone: '+91 98765 43211',
      role: 'Property Manager',
      department: 'Property Management',
      location: 'Delhi',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      activeAssignments: 12,
      completedAssignments: 67,
      workloadPercentage: 92,
      performanceScore: 4.5,
      joinDate: '2021-08-20',
      skills: ['Maintenance Coordination', 'Tenant Relations', 'Property Inspection']
    },
    {
      id: 'EMP003',
      employeeId: 'RW003',
      name: 'Amit Patel',
      email: 'amit.patel@realtywealth.com',
      phone: '+91 98765 43212',
      role: 'Client Relations Executive',
      department: 'Client Relations',
      location: 'Bangalore',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      activeAssignments: 6,
      completedAssignments: 34,
      workloadPercentage: 65,
      performanceScore: 4.0,
      joinDate: '2023-01-10',
      skills: ['Customer Service', 'Communication', 'Problem Solving']
    },
    {
      id: 'EMP004',
      employeeId: 'RW004',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@realtywealth.com',
      phone: '+91 98765 43213',
      role: 'Operations Coordinator',
      department: 'Operations',
      location: 'Hyderabad',
      status: 'On Leave',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      activeAssignments: 3,
      completedAssignments: 28,
      workloadPercentage: 35,
      performanceScore: 3.8,
      joinDate: '2022-11-05',
      skills: ['Process Management', 'Documentation', 'Quality Control']
    },
    {
      id: 'EMP005',
      employeeId: 'RW005',
      name: 'Vikram Singh',
      email: 'vikram.singh@realtywealth.com',
      phone: '+91 98765 43214',
      role: 'Financial Analyst',
      department: 'Finance',
      location: 'Pune',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
      activeAssignments: 5,
      completedAssignments: 41,
      workloadPercentage: 58,
      performanceScore: 4.3,
      joinDate: '2021-12-18',
      skills: ['Financial Analysis', 'Investment Planning', 'Risk Assessment']
    },
    {
      id: 'EMP006',
      employeeId: 'RW006',
      name: 'Kavya Nair',
      email: 'kavya.nair@realtywealth.com',
      phone: '+91 98765 43215',
      role: 'Legal Specialist',
      department: 'Legal',
      location: 'Chennai',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
      activeAssignments: 4,
      completedAssignments: 22,
      workloadPercentage: 48,
      performanceScore: 4.1,
      joinDate: '2023-04-22',
      skills: ['Legal Documentation', 'Contract Review', 'Compliance']
    },
    {
      id: 'EMP007',
      employeeId: 'RW007',
      name: 'Arjun Gupta',
      email: 'arjun.gupta@realtywealth.com',
      phone: '+91 98765 43216',
      role: 'Marketing Executive',
      department: 'Marketing',
      location: 'Mumbai',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
      activeAssignments: 7,
      completedAssignments: 31,
      workloadPercentage: 72,
      performanceScore: 3.9,
      joinDate: '2022-07-14',
      skills: ['Digital Marketing', 'Content Creation', 'Campaign Management']
    },
    {
      id: 'EMP008',
      employeeId: 'RW008',
      name: 'Meera Joshi',
      email: 'meera.joshi@realtywealth.com',
      phone: '+91 98765 43217',
      role: 'Team Lead',
      department: 'Sales',
      location: 'Delhi',
      status: 'Inactive',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      activeAssignments: 0,
      completedAssignments: 52,
      workloadPercentage: 0,
      performanceScore: 4.4,
      joinDate: '2020-09-30',
      skills: ['Team Leadership', 'Sales Strategy', 'Training']
    }
  ];

  // Mock analytics data
  const mockAnalytics = {
    departmentDistribution: [
      { name: 'Sales', count: 15 },
      { name: 'Property Management', count: 12 },
      { name: 'Client Relations', count: 8 },
      { name: 'Operations', count: 6 },
      { name: 'Finance', count: 5 },
      { name: 'Legal', count: 4 },
      { name: 'Marketing', count: 7 }
    ],
    workloadDistribution: [
      { range: '0-50%', count: 18 },
      { range: '51-80%', count: 25 },
      { range: '81-100%', count: 14 }
    ],
    averagePerformance: 87,
    averageResponseTime: 2.4,
    completionRate: 94,
    teamSatisfaction: 4.2,
    recentActivity: [
      {
        type: 'assignment',
        description: 'New order assigned to Rajesh Kumar - Property Valuation #PV2024001',
        timestamp: '2 hours ago'
      },
      {
        type: 'completion',
        description: 'Priya Sharma completed maintenance order #MO2024045',
        timestamp: '4 hours ago'
      },
      {
        type: 'update',
        description: 'Amit Patel updated client profile for Sharma Holdings',
        timestamp: '6 hours ago'
      },
      {
        type: 'assignment',
        description: 'Bulk assignment completed for 5 property inspections',
        timestamp: '1 day ago'
      }
    ]
  };

  // Filter employees based on current filters
  const filteredEmployees = useMemo(() => {
    return mockEmployees?.filter(employee => {
      const matchesSearch = !filters?.search || 
        employee?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        employee?.employeeId?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        employee?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase());

      const matchesDepartment = !filters?.department || employee?.department === filters?.department;
      const matchesRole = !filters?.role || employee?.role === filters?.role;
      const matchesLocation = !filters?.location || employee?.location === filters?.location;
      const matchesStatus = !filters?.status || employee?.status === filters?.status;
      
      const matchesWorkload = !filters?.workload || 
        (filters?.workload === 'low' && employee?.workloadPercentage <= 50) ||
        (filters?.workload === 'medium' && employee?.workloadPercentage > 50 && employee?.workloadPercentage <= 80) ||
        (filters?.workload === 'high' && employee?.workloadPercentage > 80);

      return matchesSearch && matchesDepartment && matchesRole && 
             matchesLocation && matchesStatus && matchesWorkload;
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      department: '',
      role: '',
      location: '',
      status: '',
      workload: ''
    });
  };

  const handleViewEmployee = (employee) => {
    setModalState({
      isOpen: true,
      mode: 'view',
      employee
    });
  };

  const handleEditEmployee = (employee) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      employee
    });
  };

  const handleAssignOrder = (employee) => {
    setModalState({
      isOpen: true,
      mode: 'assign',
      employee
    });
  };

  const handleAddEmployee = () => {
    setModalState({
      isOpen: true,
      mode: 'add',
      employee: null
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      mode: 'view',
      employee: null
    });
  };

  const handleSaveEmployee = (employeeData) => {
    // Handle save logic here
    console.log('Saving employee:', employeeData);
  };

  const handleAssignment = (employeeId, assignmentData) => {
    // Handle assignment logic here
    console.log('Assigning order:', { employeeId, assignmentData });
  };

  const handleBulkAssignment = () => {
    if (selectedEmployees?.length === 0) {
      alert('Please select employees for bulk assignment');
      return;
    }
    // Handle bulk assignment logic
    console.log('Bulk assignment for:', selectedEmployees);
  };

  const handleGenerateReport = () => {
    // Handle report generation
    console.log('Generating team report...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Employee Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage your team, track performance, and assign orders efficiently
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAnalytics(!showAnalytics)}
                iconName={showAnalytics ? "Table" : "BarChart3"}
                iconPosition="left"
                iconSize={16}
              >
                {showAnalytics ? 'Show Table' : 'Show Analytics'}
              </Button>

              <Button
                variant="outline"
                onClick={handleGenerateReport}
                iconName="FileText"
                iconPosition="left"
                iconSize={16}
              >
                Generate Report
              </Button>

              <Button
                variant="outline"
                onClick={handleBulkAssignment}
                iconName="Users"
                iconPosition="left"
                iconSize={16}
                disabled={selectedEmployees?.length === 0}
              >
                Bulk Assignment
              </Button>

              <Button
                onClick={handleAddEmployee}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Add Employee
              </Button>
            </div>
          </div>

          {/* Content */}
          {showAnalytics ? (
            <TeamAnalytics analytics={mockAnalytics} />
          ) : (
            <div className="space-y-6">
              {/* Filters */}
              <EmployeeFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                resultCount={filteredEmployees?.length}
              />

              {/* Employee Table */}
              <EmployeeTable
                employees={filteredEmployees}
                onEditEmployee={handleEditEmployee}
                onAssignOrder={handleAssignOrder}
                onViewEmployee={handleViewEmployee}
              />

              {/* Empty State */}
              {filteredEmployees?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or add new employees to get started.
                  </p>
                  <Button onClick={handleAddEmployee} iconName="Plus" iconPosition="left">
                    Add First Employee
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Employee Modal */}
      <EmployeeModal
        isOpen={modalState?.isOpen}
        onClose={handleCloseModal}
        employee={modalState?.employee}
        mode={modalState?.mode}
        onSave={handleSaveEmployee}
        onAssign={handleAssignment}
      />
    </div>
  );
};

export default EmployeeManagement;