import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const DocumentationStep = ({ formData, updateFormData, errors }) => {
  const [uploadProgress, setUploadProgress] = useState({});

  const requiredDocuments = [
    {
      id: 'panCard',
      title: 'PAN Card',
      description: 'Clear copy of PAN card (front side)',
      required: true,
      formats: 'PDF, JPG, PNG (Max 5MB)'
    },
    {
      id: 'aadhaarCard',
      title: 'Aadhaar Card',
      description: 'Both sides of Aadhaar card',
      required: false,
      formats: 'PDF, JPG, PNG (Max 5MB)'
    },
    {
      id: 'addressProof',
      title: 'Address Proof',
      description: 'Utility bill, bank statement, or rental agreement',
      required: true,
      formats: 'PDF, JPG, PNG (Max 5MB)'
    },
    {
      id: 'incomeProof',
      title: 'Income Proof',
      description: 'Salary slips, ITR, or business income proof',
      required: true,
      formats: 'PDF, JPG, PNG (Max 10MB)'
    },
    {
      id: 'bankStatement',
      title: 'Bank Statement',
      description: 'Last 6 months bank statement',
      required: true,
      formats: 'PDF (Max 10MB)'
    },
    {
      id: 'photograph',
      title: 'Passport Size Photograph',
      description: 'Recent passport size photograph',
      required: true,
      formats: 'JPG, PNG (Max 2MB)'
    }
  ];

  const handleFileUpload = (documentId, file) => {
    if (!file) return;

    // Simulate file upload progress
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev?.[documentId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          // Update form data with uploaded file info
          updateFormData('documentation', {
            ...formData?.documentation,
            [documentId]: {
              file: file,
              fileName: file?.name,
              fileSize: file?.size,
              uploadedAt: new Date()?.toISOString(),
              status: 'uploaded'
            }
          });
          return prev;
        }
        return { ...prev, [documentId]: currentProgress + 10 };
      });
    }, 200);
  };

  const handleFileRemove = (documentId) => {
    const updatedDocs = { ...formData?.documentation };
    delete updatedDocs?.[documentId];
    updateFormData('documentation', updatedDocs);
    
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated?.[documentId];
      return updated;
    });
  };

  const handleInputChange = (field, value) => {
    updateFormData('documentation', { ...formData?.documentation, [field]: value });
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'jpg': case'jpeg': case'png':
        return 'Image';
      default:
        return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Document Upload
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please upload the required documents for KYC verification and account setup. All documents should be clear and legible.
        </p>
        
        <div className="space-y-6">
          {requiredDocuments?.map((doc) => {
            const uploadedDoc = formData?.documentation?.[doc?.id];
            const isUploading = uploadProgress?.[doc?.id] !== undefined && uploadProgress?.[doc?.id] < 100;
            const isUploaded = uploadedDoc && uploadedDoc?.status === 'uploaded';

            return (
              <div key={doc?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{doc?.title}</h4>
                      {doc?.required && (
                        <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{doc?.description}</p>
                    <p className="text-xs text-muted-foreground">{doc?.formats}</p>
                  </div>
                </div>
                {!isUploaded && !isUploading && (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Icon name="Upload" size={24} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc?.id, e?.target?.files?.[0])}
                      className="hidden"
                      id={`file-${doc?.id}`}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById(`file-${doc?.id}`)?.click()}
                      iconName="Upload"
                      iconPosition="left"
                    >
                      Choose File
                    </Button>
                  </div>
                )}
                {isUploading && (
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Upload" size={16} className="text-primary" />
                      <span className="text-sm font-medium">Uploading...</span>
                      <span className="text-sm text-muted-foreground">
                        {uploadProgress?.[doc?.id]}%
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress?.[doc?.id]}%` }}
                      />
                    </div>
                  </div>
                )}
                {isUploaded && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon name={getFileIcon(uploadedDoc?.fileName)} size={20} className="text-success" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {uploadedDoc?.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(uploadedDoc?.fileSize)} • Uploaded successfully
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFileRemove(doc?.id)}
                        iconName="Trash2"
                        className="text-destructive hover:text-destructive"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Additional Information
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Referral Source"
            type="text"
            placeholder="How did you hear about us?"
            value={formData?.documentation?.referralSource || ''}
            onChange={(e) => handleInputChange('referralSource', e?.target?.value)}
            error={errors?.referralSource}
            description="e.g., Website, Friend referral, Advertisement"
          />

          <Input
            label="Relationship Manager Preference"
            type="text"
            placeholder="Any specific RM you'd like to work with?"
            value={formData?.documentation?.rmPreference || ''}
            onChange={(e) => handleInputChange('rmPreference', e?.target?.value)}
            error={errors?.rmPreference}
          />

          <Input
            label="Additional Comments"
            type="text"
            placeholder="Any additional information or special requests"
            value={formData?.documentation?.additionalComments || ''}
            onChange={(e) => handleInputChange('additionalComments', e?.target?.value)}
            error={errors?.additionalComments}
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Terms and Conditions
        </h3>
        
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4 max-h-40 overflow-y-auto">
            <p className="text-sm text-foreground leading-relaxed">
              By proceeding with the client onboarding process, you acknowledge and agree to the following terms:\n\n
              1. All information provided is accurate and complete to the best of your knowledge.\n
              2. You authorize RealtyWealth to verify the information and documents provided.\n
              3. You understand that investment in real estate carries inherent risks.\n
              4. You agree to comply with all applicable laws and regulations.\n
              5. You consent to receive communications regarding your investments and account.\n
              6. You understand the fee structure and charges applicable to your account.\n
              7. You agree to the privacy policy and data handling practices.\n
              8. You acknowledge that past performance does not guarantee future results.\n
              9. You understand the lock-in periods and exit clauses for investments.\n
              10. You agree to provide updated information as and when required.
            </p>
          </div>

          <div className="space-y-3">
            <Checkbox
              label="I have read and agree to the Terms and Conditions"
              checked={formData?.documentation?.agreeToTerms || false}
              onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
              required
            />

            <Checkbox
              label="I consent to receive marketing communications"
              checked={formData?.documentation?.consentToMarketing || false}
              onChange={(e) => handleInputChange('consentToMarketing', e?.target?.checked)}
            />

            <Checkbox
              label="I authorize credit and background verification"
              checked={formData?.documentation?.authorizeVerification || false}
              onChange={(e) => handleInputChange('authorizeVerification', e?.target?.checked)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationStep;