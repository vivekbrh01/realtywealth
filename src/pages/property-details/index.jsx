import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PropertyHeader from './components/PropertyHeader';
import PropertyTabs from './components/PropertyTabs';
import LoadingIndicator from '../../components/ui/LoadingIndicator';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);

  // Mock property data
  const mockProperty = {
    id: searchParams?.get('id') || 'PROP001',
    title: 'Prestige Lakeside Habitat - 3BHK Premium Apartment',
    location: 'Varthur, Bangalore, Karnataka 560087',
    status: 'Active',
    type: '3BHK Apartment',
    carpetArea: 1450,
    builtUpArea: 1650,
    superBuiltUpArea: 1850,
    purchasePrice: 8500000,
    currentValue: 12500000,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    compliance: {
      reraNumber: 'PRM/KA/RERA/1251/446/PR/010824/006902',
      propertyTaxId: 'BBMP/PT/2024/VTR/4567',
      nocCertificate: 'NOC/2023/BLR/4567',
      fireSafety: 'FSC/2024/KA/8901'
    },
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      'Children Play Area',
      'Clubhouse',
      'Security',
      'Power Backup',
      'Parking',
      'Landscaped Gardens'
    ],
    specifications: {
      floor: '12th Floor',
      facing: 'East',
      furnishing: 'Semi-Furnished',
      possession: 'Ready to Move',
      ageOfProperty: '4 Years',
      totalFloors: 25
    }
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProperty(mockProperty);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleEditProperty = () => {
    navigate(`/property-management?edit=${property?.id}`);
  };

  const handleCreateSaleOrder = () => {
    navigate(`/property-management?sale=${property?.id}`);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Property Management', path: '/property-management' },
    { label: property?.title || 'Property Details', path: '/property-details' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-6">
            <LoadingIndicator.Skeleton.Card className="h-96 mb-6" />
            <LoadingIndicator.Skeleton.Card className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                Property Not Found
              </h2>
              <p className="text-muted-foreground mb-6">
                The requested property could not be found or may have been removed.
              </p>
              <button
                onClick={() => navigate('/property-management')}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth"
              >
                Back to Property Management
              </button>
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
          <Breadcrumb customItems={breadcrumbItems} />
          
          <PropertyHeader
            property={property}
            onEdit={handleEditProperty}
            onCreateSaleOrder={handleCreateSaleOrder}
          />
          
          <PropertyTabs property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;