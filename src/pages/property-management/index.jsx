import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PropertyFilters from './components/PropertyFilters';
import PropertyTable from './components/PropertyTable';
import PortfolioAnalytics from './components/PortfolioAnalytics';

const PropertyManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock property data with Indian real estate specifics
  const mockProperties = [
    {
      id: 'PROP001',
      name: 'Prestige Lakeside Habitat',
      owner: 'Rajesh Kumar',
      type: 'Apartment',
      location: 'Whitefield, Bangalore',
      address: 'Varthur Road, Whitefield, Bangalore - 560066',
      carpetArea: 1250,
      builtUpArea: 1450,
      superBuiltUpArea: 1650,
      purchaseValue: 8500000,
      currentValue: 12500000,
      status: 'active',
      reraStatus: 'registered',
      reraNumber: 'PRM/KA/RERA/1251/446/PR/171019/001953',
      propertyTax: 45000,
      maintenanceCharges: 8500,
      purchaseDate: '2021-03-15',
      lastValuationDate: '2024-08-15'
    },
    {
      id: 'PROP002',
      name: 'DLF Cyber City',
      owner: 'Priya Sharma',
      type: 'Commercial',
      location: 'Gurgaon, Haryana',
      address: 'DLF Phase 2, Gurgaon - 122002',
      carpetArea: 2800,
      builtUpArea: 3200,
      superBuiltUpArea: 3600,
      purchaseValue: 25000000,
      currentValue: 32000000,
      status: 'active',
      reraStatus: 'registered',
      reraNumber: 'RC/REP/HARERA/GGM/767/499/2019/48',
      propertyTax: 125000,
      maintenanceCharges: 15000,
      purchaseDate: '2020-11-20',
      lastValuationDate: '2024-09-01'
    },
    {
      id: 'PROP003',
      name: 'Godrej Properties Villa',
      owner: 'Amit Patel',
      type: 'Villa',
      location: 'Pune, Maharashtra',
      address: 'Hinjewadi Phase 1, Pune - 411057',
      carpetArea: 3500,
      builtUpArea: 4200,
      superBuiltUpArea: 4800,
      purchaseValue: 18500000,
      currentValue: 24500000,
      status: 'maintenance',
      reraStatus: 'registered',
      reraNumber: 'P52100017740',
      propertyTax: 85000,
      maintenanceCharges: 12000,
      purchaseDate: '2019-07-10',
      lastValuationDate: '2024-07-20'
    },
    {
      id: 'PROP004',
      name: 'Phoenix MarketCity Plot',
      owner: 'Sunita Reddy',
      type: 'Plot',
      location: 'Hyderabad, Telangana',
      address: 'Kondapur, Hyderabad - 500084',
      carpetArea: 0,
      builtUpArea: 0,
      superBuiltUpArea: 5400,
      purchaseValue: 12000000,
      currentValue: 16800000,
      status: 'vacant',
      reraStatus: 'pending',
      reraNumber: '',
      propertyTax: 35000,
      maintenanceCharges: 0,
      purchaseDate: '2022-01-25',
      lastValuationDate: '2024-08-30'
    },
    {
      id: 'PROP005',
      name: 'Lodha World Towers',
      owner: 'Vikram Singh',
      type: 'Apartment',
      location: 'Mumbai, Maharashtra',
      address: 'Lower Parel, Mumbai - 400013',
      carpetArea: 1850,
      builtUpArea: 2100,
      superBuiltUpArea: 2400,
      purchaseValue: 45000000,
      currentValue: 58000000,
      status: 'active',
      reraStatus: 'registered',
      reraNumber: 'P51700000271',
      propertyTax: 180000,
      maintenanceCharges: 25000,
      purchaseDate: '2018-12-05',
      lastValuationDate: '2024-09-10'
    },
    {
      id: 'PROP006',
      name: 'Brigade Gateway Office',
      owner: 'Neha Gupta',
      type: 'Office',
      location: 'Bangalore, Karnataka',
      address: 'Rajaji Nagar, Bangalore - 560010',
      carpetArea: 1200,
      builtUpArea: 1400,
      superBuiltUpArea: 1600,
      purchaseValue: 15000000,
      currentValue: 19500000,
      status: 'active',
      reraStatus: 'registered',
      reraNumber: 'PRM/KA/RERA/1251/309/PR/200515/002345',
      propertyTax: 65000,
      maintenanceCharges: 18000,
      purchaseDate: '2020-05-18',
      lastValuationDate: '2024-08-25'
    },
    {
      id: 'PROP007',
      name: 'Mahindra Lifespace Warehouse',
      owner: 'Ravi Krishnan',
      type: 'Warehouse',
      location: 'Chennai, Tamil Nadu',
      address: 'Sriperumbudur, Chennai - 602105',
      carpetArea: 8500,
      builtUpArea: 9200,
      superBuiltUpArea: 10000,
      purchaseValue: 22000000,
      currentValue: 26500000,
      status: 'active',
      reraStatus: 'not-applicable',
      reraNumber: '',
      propertyTax: 95000,
      maintenanceCharges: 35000,
      purchaseDate: '2021-09-12',
      lastValuationDate: '2024-09-05'
    },
    {
      id: 'PROP008',
      name: 'Tata Housing Complex',
      owner: 'Meera Joshi',
      type: 'Apartment',
      location: 'Kolkata, West Bengal',
      address: 'New Town, Kolkata - 700156',
      carpetArea: 1100,
      builtUpArea: 1300,
      superBuiltUpArea: 1500,
      purchaseValue: 6500000,
      currentValue: 8200000,
      status: 'sold',
      reraStatus: 'registered',
      reraNumber: 'HIRA/P/SOU/2018/000156',
      propertyTax: 28000,
      maintenanceCharges: 6500,
      purchaseDate: '2019-02-28',
      lastValuationDate: '2024-06-15'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFilteredProperties(mockProperties);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...mockProperties];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(property =>
        property?.name?.toLowerCase()?.includes(searchTerm) ||
        property?.owner?.toLowerCase()?.includes(searchTerm) ||
        property?.location?.toLowerCase()?.includes(searchTerm) ||
        property?.address?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply state filter
    if (filters?.state) {
      filtered = filtered?.filter(property => {
        const state = property?.location?.split(', ')?.pop()?.toLowerCase();
        return state?.includes(filters?.state?.toLowerCase());
      });
    }

    // Apply city filter
    if (filters?.city) {
      filtered = filtered?.filter(property => {
        const city = property?.location?.split(',')?.[0]?.toLowerCase();
        return city?.includes(filters?.city?.toLowerCase());
      });
    }

    // Apply property type filter
    if (filters?.propertyType) {
      filtered = filtered?.filter(property =>
        property?.type?.toLowerCase() === filters?.propertyType?.toLowerCase()
      );
    }

    // Apply RERA status filter
    if (filters?.reraStatus) {
      filtered = filtered?.filter(property =>
        property?.reraStatus === filters?.reraStatus
      );
    }

    // Apply price range filter
    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      filtered = filtered?.filter(property => {
        const price = property?.currentValue;
        const min = filters?.priceRange?.min ? parseInt(filters?.priceRange?.min) : 0;
        const max = filters?.priceRange?.max ? parseInt(filters?.priceRange?.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply area range filter
    if (filters?.area?.min || filters?.area?.max) {
      filtered = filtered?.filter(property => {
        const area = property?.carpetArea || property?.superBuiltUpArea;
        const min = filters?.area?.min ? parseInt(filters?.area?.min) : 0;
        const max = filters?.area?.max ? parseInt(filters?.area?.max) : Infinity;
        return area >= min && area <= max;
      });
    }

    setFilteredProperties(filtered);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'export':
        console.log('Exporting properties:', selectedProperties);
        // Implement export functionality
        break;
      case 'update': console.log('Bulk updating properties:', selectedProperties);
        // Implement bulk update functionality
        break;
      case 'delete':
        console.log('Deleting properties:', selectedProperties);
        // Implement delete functionality
        break;
      default:
        break;
    }
  };

  const handleAddProperty = () => {
    navigate('/property-details');
  };

  const handleGenerateReport = () => {
    console.log('Generating portfolio report');
    // Implement report generation
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-2">
                <Icon name="Loader2" size={24} className="animate-spin text-primary" />
                <span className="text-foreground">Loading property data...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col space-y-4">
            <Breadcrumb />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">Property Management</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive property portfolio oversight and management
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={handleGenerateReport}>
                  <Icon name="FileText" size={16} className="mr-2" />
                  Generate Report
                </Button>
                <Button onClick={handleAddProperty}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add New Property
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('properties')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === 'properties' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name="Building2" size={16} className="inline mr-2" />
                Properties
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === 'analytics' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name="BarChart3" size={16} className="inline mr-2" />
                Portfolio Analytics
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              {/* Filters */}
              <PropertyFilters
                onFiltersChange={handleFiltersChange}
                totalProperties={mockProperties?.length}
                filteredCount={filteredProperties?.length}
              />

              {/* Property Table */}
              <PropertyTable
                properties={filteredProperties}
                onPropertySelect={setSelectedProperties}
                onBulkAction={handleBulkAction}
                selectedProperties={selectedProperties}
              />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <PortfolioAnalytics properties={filteredProperties} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyManagement;