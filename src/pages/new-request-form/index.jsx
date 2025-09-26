import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RequestTypeSection from './components/RequestTypeSection';
import RequesterInfoSection from './components/RequesterInfoSection';
import RequestDetailsSection from './components/RequestDetailsSection';
import BusinessJustificationSection from './components/BusinessJustificationSection';
import PrioritySection from './components/PrioritySection';
import DocumentsSection from './components/DocumentsSection';
import PreviewPanel from './components/PreviewPanel';
import ProgressIndicator from './components/ProgressIndicator';
import { cn } from '../../utils/cn';

const NewRequestForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    requestType: '',
    title: '',
    description: '',
    businessJustification: '',
    priority: 'normal',
    requesterInfo: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Finance',
      employeeId: 'EMP-2024-001',
      position: 'Senior Analyst'
    },
    departmentDetails: {
      targetDepartment: '',
      managerName: '',
      managerEmail: ''
    },
    amount: '',
    dueDate: '',
    category: '',
    documents: [],
    additionalNotes: ''
  });

  // Form state management
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [validationTouched, setValidationTouched] = useState({});

  // Form sections
  const sections = [
    { id: 'type', label: 'Request Type', required: true },
    { id: 'requester', label: 'Your Information', required: true },
    { id: 'details', label: 'Request Details', required: true },
    { id: 'justification', label: 'Business Justification', required: true },
    { id: 'priority', label: 'Priority & Timeline', required: true },
    { id: 'documents', label: 'Supporting Documents', required: false }
  ];

  // Pure validation function that doesn't update state
  const checkSectionValidity = (sectionId, data = formData) => {
    switch (sectionId) {
      case 'type':
        return Boolean(data?.requestType);

      case 'details':
        return Boolean(
          data?.title?.trim() &&
          data?.description?.trim() &&
          data?.description?.length >= 20 &&
          data?.targetDepartment
        );

      case 'justification':
        return Boolean(
          data?.businessJustification?.trim() &&
          data?.businessJustification?.length >= 50
        );

      case 'priority':
        return Boolean(data?.priority);

      default:
        return true;
    }
  };

  // Validation rules with state updates
  const validateSection = (sectionId) => {
    const newErrors = { ...errors };

    switch (sectionId) {
      case 'type':
        if (!formData?.requestType) {
          newErrors.requestType = 'Request type is required';
        } else {
          delete newErrors?.requestType;
        }
        break;

      case 'details':
        if (!formData?.title?.trim()) {
          newErrors.title = 'Request title is required';
        } else {
          delete newErrors?.title;
        }

        if (!formData?.description?.trim()) {
          newErrors.description = 'Description is required';
        } else if (formData?.description?.length < 20) {
          newErrors.description = 'Description must be at least 20 characters';
        } else {
          delete newErrors?.description;
        }

        if (!formData?.targetDepartment) {
          newErrors.targetDepartment = 'Target department is required';
        } else {
          delete newErrors?.targetDepartment;
        }
        break;

      case 'justification':
        if (!formData?.businessJustification?.trim()) {
          newErrors.businessJustification = 'Business justification is required';
        } else if (formData?.businessJustification?.length < 50) {
          newErrors.businessJustification = 'Business justification must be at least 50 characters';
        } else {
          delete newErrors?.businessJustification;
        }
        break;

      case 'priority':
        if (!formData?.priority) {
          newErrors.priority = 'Priority level is required';
        } else {
          delete newErrors?.priority;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Memoized completion percentage calculation
  const completionPercentage = useMemo(() => {
    const requiredSections = sections?.filter(s => s?.required);
    const completedSections = requiredSections?.filter(section => {
      return checkSectionValidity(section?.id, formData);
    })?.length;
    return Math.round((completedSections / requiredSections?.length) * 100);
  }, [formData, sections]);

  // Form handlers
  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      if (field?.includes('.')) {
        const [parent, child] = field?.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev?.[parent],
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });

    // Clear field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.[field];
        return newErrors;
      });
    }
  };

  const handleNextSection = () => {
    const currentSectionId = sections?.[currentSection]?.id;
    setValidationTouched(prev => ({ ...prev, [currentSectionId]: true }));

    if (validateSection(currentSectionId)) {
      if (currentSection < sections?.length - 1) {
        setCurrentSection(prev => prev + 1);
      }
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleSaveAsDraft = async () => {
    setIsDraft(true);
    setIsSubmitting(true);

    try {
      // Simulate API call for saving draft
      await new Promise(resolve => setTimeout(resolve, 1000));

      const draftId = `DRAFT-${Date.now()}`;
      console.log('Draft saved:', { ...formData, id: draftId, status: 'draft' });

      // Show success message
      alert(`Draft saved successfully! Draft ID: ${draftId}`);

    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsDraft(false);
    }
  };

  const handleSubmitRequest = async () => {
    // Validate all sections
    const allSectionsValid = sections?.every(section => {
      if (section?.required) {
        setValidationTouched(prev => ({ ...prev, [section?.id]: true }));
        return validateSection(section?.id);
      }
      return true;
    });

    if (!allSectionsValid) {
      alert('Please complete all required sections before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for request submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      const requestId = `REQ-2024-${String(Date.now())?.slice(-3)}`;
      const submissionData = {
        ...formData,
        id: requestId,
        status: 'pending',
        submittedAt: new Date()?.toISOString(),
        trackingNumber: requestId
      };

      console.log('Request submitted:', submissionData);

      // Show success and redirect
      alert(`Request submitted successfully! Tracking Number: ${requestId}`);
      navigate('/employee-dashboard', {
        state: {
          newRequest: submissionData,
          message: `Your request has been submitted with tracking number: ${requestId}`
        }
      });

    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleGoBack = () => {
    navigate('/employee-dashboard');
  };

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const requiredSections = sections?.filter(s => s?.required);
    const completedSections = requiredSections?.filter(section => {
      return validateSection(section?.id);
    })?.length;
    return Math.round((completedSections / requiredSections?.length) * 100);
  };

  const renderSection = () => {
    const sectionId = sections?.[currentSection]?.id;
    const sectionErrors = Object.keys(errors)?.reduce((acc, key) => {
      acc[key] = errors?.[key];
      return acc;
    }, {});

    switch (sectionId) {
      case 'type':
        return (
          <RequestTypeSection
            value={formData?.requestType}
            onChange={(value) => handleFieldChange('requestType', value)}
            error={errors?.requestType}
          />
        );

      case 'requester':
        return (
          <RequesterInfoSection
            data={formData?.requesterInfo}
            departmentDetails={formData?.departmentDetails}
            onChange={(field, value) => handleFieldChange(field, value)}
            errors={sectionErrors}
          />
        );

      case 'details':
        return (
          <RequestDetailsSection
            data={{
              title: formData?.title,
              description: formData?.description,
              category: formData?.category,
              amount: formData?.amount,
              dueDate: formData?.dueDate,
              targetDepartment: formData?.targetDepartment
            }}
            requestType={formData?.requestType}
            onChange={(field, value) => handleFieldChange(field, value)}
            errors={sectionErrors}
          />
        );

      case 'justification':
        return (
          <BusinessJustificationSection
            value={formData?.businessJustification}
            additionalNotes={formData?.additionalNotes}
            onChange={(field, value) => handleFieldChange(field, value)}
            error={errors?.businessJustification}
          />
        );

      case 'priority':
        return (
          <PrioritySection
            priority={formData?.priority}
            dueDate={formData?.dueDate}
            onChange={(field, value) => handleFieldChange(field, value)}
            error={errors?.priority}
          />
        );

      case 'documents':
        return (
          <DocumentsSection
            documents={formData?.documents}
            onChange={(documents) => handleFieldChange('documents', documents)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 mb-6 text-sm text-muted-foreground">
            <button
              onClick={handleGoBack}
              className="hover:text-foreground transition-colors flex items-center space-x-1"
            >
              <Icon name="Home" size={14} />
              <span>Dashboard</span>
            </button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground font-medium">New Request</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Submit New Request</h1>
            <p className="text-muted-foreground">
              Complete the form below to submit your approval request. All required sections must be completed before submission.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressIndicator
              sections={sections}
              currentSection={currentSection}
              completionPercentage={completionPercentage}
              onSectionClick={(index) => setCurrentSection(index)}
              validationTouched={validationTouched}
              errors={errors}
            />
          </div>

          {/* Main Form Layout */}
          <div className={cn(
            "grid gap-8 transition-all duration-300",
            showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          )}>
            {/* Form Section */}
            <div className="space-y-6">
              {/* Section Header */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {sections?.[currentSection]?.label}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Step {currentSection + 1} of {sections?.length}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePreview}
                    iconName={showPreview ? "EyeOff" : "Eye"}
                  >
                    {showPreview ? "Hide" : "Preview"}
                  </Button>
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                  {renderSection()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={handlePrevSection}
                      disabled={currentSection === 0}
                      iconName="ChevronLeft"
                    >
                      Previous
                    </Button>

                    {currentSection < sections?.length - 1 ? (
                      <Button
                        onClick={handleNextSection}
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        Next Section
                      </Button>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          onClick={handleSaveAsDraft}
                          loading={isDraft}
                          iconName="Save"
                          disabled={isSubmitting}
                        >
                          Save Draft
                        </Button>
                        <Button
                          onClick={handleSubmitRequest}
                          loading={isSubmitting && !isDraft}
                          iconName="Send"
                          disabled={isSubmitting}
                        >
                          Submit Request
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {completionPercentage}% Complete
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            {showPreview && (
              <div className="space-y-6">
                <PreviewPanel
                  formData={formData}
                  requestType={formData?.requestType}
                  onClose={() => setShowPreview(false)}
                />
              </div>
            )}
          </div>

          {/* Mobile Actions - Fixed Bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:hidden">
            <div className="flex items-center justify-between max-w-sm mx-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevSection}
                disabled={currentSection === 0}
                iconName="ChevronLeft"
              >
                Back
              </Button>

              {currentSection < sections?.length - 1 ? (
                <Button
                  size="sm"
                  onClick={handleNextSection}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleSubmitRequest}
                  loading={isSubmitting}
                  iconName="Send"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewRequestForm;
