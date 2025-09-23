import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalInfoStep from './components/PersonalInfoStep';
import FinancialProfileStep from './components/FinancialProfileStep';
import InvestmentPreferencesStep from './components/InvestmentPreferencesStep';
import DocumentationStep from './components/DocumentationStep';
import HelpPanel from './components/HelpPanel';

const ClientOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    financialProfile: {},
    investmentPreferences: {},
    documentation: {}
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  const steps = [
    { id: 1, title: 'Personal Info', component: PersonalInfoStep },
    { id: 2, title: 'Financial Profile', component: FinancialProfileStep },
    { id: 3, title: 'Investment Preferences', component: InvestmentPreferencesStep },
    { id: 4, title: 'Documentation', component: DocumentationStep }
  ];

  const totalSteps = steps?.length;

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('clientOnboardingDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft?.formData || formData);
        setCurrentStep(parsedDraft?.currentStep || 1);
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveDraft(false);
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [formData, currentStep]);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    // Clear errors for the updated section
    setErrors(prev => ({
      ...prev,
      ...Object.keys(data)?.reduce((acc, key) => ({ ...acc, [key]: '' }), {})
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Personal Information
        const personalInfo = formData?.personalInfo || {};
        if (!personalInfo?.title) newErrors.title = 'Title is required';
        if (!personalInfo?.firstName) newErrors.firstName = 'First name is required';
        if (!personalInfo?.lastName) newErrors.lastName = 'Last name is required';
        if (!personalInfo?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!personalInfo?.gender) newErrors.gender = 'Gender is required';
        if (!personalInfo?.email) newErrors.email = 'Email is required';
        if (!personalInfo?.mobile) newErrors.mobile = 'Mobile number is required';
        if (!personalInfo?.addressLine1) newErrors.addressLine1 = 'Address is required';
        if (!personalInfo?.city) newErrors.city = 'City is required';
        if (!personalInfo?.state) newErrors.state = 'State is required';
        if (!personalInfo?.pinCode) newErrors.pinCode = 'PIN code is required';
        if (!personalInfo?.panNumber) newErrors.panNumber = 'PAN number is required';
        
        // Validate email format
        if (personalInfo?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(personalInfo?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        
        // Validate mobile number
        if (personalInfo?.mobile && !/^[0-9]{10}$/?.test(personalInfo?.mobile)) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }
        
        // Validate PAN format
        if (personalInfo?.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/?.test(personalInfo?.panNumber)) {
          newErrors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
        }
        
        // Validate PIN code
        if (personalInfo?.pinCode && !/^[0-9]{6}$/?.test(personalInfo?.pinCode)) {
          newErrors.pinCode = 'Please enter a valid 6-digit PIN code';
        }
        break;

      case 2: // Financial Profile
        const financialProfile = formData?.financialProfile || {};
        if (!financialProfile?.occupation) newErrors.occupation = 'Occupation is required';
        if (!financialProfile?.companyName) newErrors.companyName = 'Company name is required';
        if (!financialProfile?.incomeRange) newErrors.incomeRange = 'Income range is required';
        if (!financialProfile?.networthRange) newErrors.networthRange = 'Net worth range is required';
        if (!financialProfile?.primaryBank) newErrors.primaryBank = 'Primary bank is required';
        if (!financialProfile?.accountNumber) newErrors.accountNumber = 'Account number is required';
        if (!financialProfile?.ifscCode) newErrors.ifscCode = 'IFSC code is required';
        if (!financialProfile?.branchName) newErrors.branchName = 'Branch name is required';
        if (!financialProfile?.primaryObjective) newErrors.primaryObjective = 'Investment objective is required';
        if (!financialProfile?.riskTolerance) newErrors.riskTolerance = 'Risk tolerance is required';
        
        // Validate IFSC code format
        if (financialProfile?.ifscCode && !/^[A-Z]{4}[0-9]{7}$/?.test(financialProfile?.ifscCode)) {
          newErrors.ifscCode = 'Please enter a valid IFSC code (e.g., SBIN0001234)';
        }
        break;

      case 3: // Investment Preferences
        const investmentPreferences = formData?.investmentPreferences || {};
        if (!investmentPreferences?.primaryPropertyType) {
          newErrors.primaryPropertyType = 'Primary property type is required';
        }
        if (!investmentPreferences?.locationPreferences || investmentPreferences?.locationPreferences?.length === 0) {
          newErrors.locationPreferences = 'Please select at least one location preference';
        }
        if (!investmentPreferences?.investmentStrategies || investmentPreferences?.investmentStrategies?.length === 0) {
          newErrors.investmentStrategies = 'Please select at least one investment strategy';
        }
        break;

      case 4: // Documentation
        const documentation = formData?.documentation || {};
        if (!documentation?.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        if (!documentation?.authorizeVerification) {
          newErrors.authorizeVerification = 'Authorization for verification is required';
        }
        
        // Check required documents
        const requiredDocs = ['panCard', 'addressProof', 'incomeProof', 'bankStatement', 'photograph'];
        const missingDocs = requiredDocs?.filter(doc => !documentation?.[doc] || documentation?.[doc]?.status !== 'uploaded');
        if (missingDocs?.length > 0) {
          newErrors.documents = `Please upload the following required documents: ${missingDocs?.join(', ')}`;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const saveDraft = async (showNotification = true) => {
    setIsDraftSaving(true);
    
    try {
      const draftData = {
        formData,
        currentStep,
        lastSaved: new Date()?.toISOString()
      };
      
      localStorage.setItem('clientOnboardingDraft', JSON.stringify(draftData));
      
      if (showNotification) {
        // You could show a toast notification here
        console.log('Draft saved successfully');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsDraftSaving(false);
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        saveDraft(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved draft
      localStorage.removeItem('clientOnboardingDraft');
      
      // Navigate to success page or client dashboard
      navigate('/client-dashboard', { 
        state: { 
          message: 'Client onboarding completed successfully! Welcome to RealtyWealth.',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'An error occurred while submitting the form. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentStepComponent = steps?.find(step => step?.id === currentStep)?.component;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Client Management', path: '/client-dashboard' },
    { label: 'Client Onboarding', path: '/client-onboarding' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="mb-6">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              Client Onboarding
            </h1>
            <p className="text-muted-foreground">
              Complete the multi-step registration process to create a new client profile
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <ProgressIndicator 
                currentStep={currentStep}
                totalSteps={totalSteps}
                steps={steps}
              />

              {/* Error Display */}
              {errors?.submit && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-destructive" />
                    <p className="text-sm text-destructive">{errors?.submit}</p>
                  </div>
                </div>
              )}

              {errors?.documents && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <p className="text-sm text-warning">{errors?.documents}</p>
                  </div>
                </div>
              )}

              {/* Step Content */}
              <div className="bg-card border border-border rounded-lg">
                <div className="p-6">
                  {CurrentStepComponent && (
                    <CurrentStepComponent
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                    />
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="border-t border-border p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        iconName="ChevronLeft"
                        iconPosition="left"
                      >
                        Previous
                      </Button>
                      
                      <Button
                        variant="ghost"
                        onClick={() => saveDraft(true)}
                        loading={isDraftSaving}
                        iconName="Save"
                        iconPosition="left"
                        className="text-muted-foreground"
                      >
                        Save Draft
                      </Button>
                    </div>

                    <div className="flex items-center space-x-3">
                      {currentStep < totalSteps ? (
                        <Button
                          variant="default"
                          onClick={handleNext}
                          iconName="ChevronRight"
                          iconPosition="right"
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          onClick={handleSubmit}
                          loading={isLoading}
                          iconName="Check"
                          iconPosition="left"
                        >
                          Complete Onboarding
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Panel */}
            <div className="lg:col-span-1">
              <HelpPanel currentStep={currentStep} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientOnboarding;