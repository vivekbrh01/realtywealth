import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceTab = ({ property }) => {
  const [uploadingDoc, setUploadingDoc] = useState(null);

  const complianceItems = [
    {
      id: 'rera',
      title: 'RERA Registration',
      status: 'Valid',
      registrationNumber: property?.compliance?.reraNumber,
      expiryDate: '15/03/2026',
      statusColor: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Real Estate Regulatory Authority registration is active and compliant'
    },
    {
      id: 'property_tax',
      title: 'Property Tax',
      status: 'Paid',
      registrationNumber: property?.compliance?.propertyTaxId,
      expiryDate: '31/03/2025',
      statusColor: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Annual property tax payment completed for FY 2024-25'
    },
    {
      id: 'noc',
      title: 'NOC Certificate',
      status: 'Pending Renewal',
      registrationNumber: 'NOC/2023/BLR/4567',
      expiryDate: '20/12/2024',
      statusColor: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'No Objection Certificate renewal required within 90 days'
    },
    {
      id: 'fire_safety',
      title: 'Fire Safety Certificate',
      status: 'Valid',
      registrationNumber: 'FSC/2024/KA/8901',
      expiryDate: '10/08/2025',
      statusColor: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Fire safety compliance certificate is current and valid'
    }
  ];

  const handleDocumentUpload = (docId) => {
    setUploadingDoc(docId);
    // Simulate upload
    setTimeout(() => {
      setUploadingDoc(null);
    }, 2000);
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate.split('/').reverse().join('-'));
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Regulatory Compliance Status
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Download All Documents
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {complianceItems?.map((item) => {
          const daysUntilExpiry = getDaysUntilExpiry(item?.expiryDate);
          const isExpiringSoon = daysUntilExpiry <= 90 && daysUntilExpiry > 0;
          const isExpired = daysUntilExpiry <= 0;

          return (
            <div
              key={item?.id}
              className={`border rounded-lg p-4 transition-smooth hover:shadow-elevation-2 ${
                isExpired ? 'border-destructive' : isExpiringSoon ? 'border-warning' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item?.bgColor}`}>
                    <div className={`w-full h-full rounded-full ${item?.statusColor?.replace('text-', 'bg-')}`} />
                  </div>
                  <h4 className="font-medium text-foreground">{item?.title}</h4>
                </div>
                <span className={`text-sm font-medium ${item?.statusColor}`}>
                  {item?.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration No:</span>
                  <span className="font-mono text-foreground">{item?.registrationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expiry Date:</span>
                  <span className={`font-medium ${
                    isExpired ? 'text-destructive' : isExpiringSoon ? 'text-warning' : 'text-foreground'
                  }`}>
                    {item?.expiryDate}
                  </span>
                </div>
                {(isExpiringSoon || isExpired) && (
                  <div className={`text-xs p-2 rounded ${
                    isExpired ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
                  }`}>
                    {isExpired ? 'Expired' : `Expires in ${daysUntilExpiry} days`}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3 mb-4">
                {item?.description}
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  className="flex-1"
                >
                  View Document
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Upload"
                  iconPosition="left"
                  loading={uploadingDoc === item?.id}
                  onClick={() => handleDocumentUpload(item?.id)}
                  className="flex-1"
                >
                  {uploadingDoc === item?.id ? 'Uploading...' : 'Update'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Compliance Summary */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Info" size={16} className="text-primary" />
          <h4 className="font-medium text-foreground">Compliance Summary</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">3</div>
            <div className="text-muted-foreground">Valid Documents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">1</div>
            <div className="text-muted-foreground">Pending Renewal</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">0</div>
            <div className="text-muted-foreground">Expired</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTab;