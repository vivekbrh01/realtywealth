import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkflowVisualization = ({ currentStage, stages, onStageClick }) => {
  const getStageIcon = (stage) => {
    const icons = {
      'inquiry': 'MessageSquare',
      'documentation': 'FileText',
      'legal-verification': 'Shield',
      'payment-processing': 'CreditCard',
      'final-transfer': 'Key',
      'completed': 'CheckCircle'
    };
    return icons?.[stage] || 'Circle';
  };

  const getStageColor = (stage, isActive, isCompleted) => {
    if (isCompleted) return 'bg-green-500 text-white';
    if (isActive) return 'bg-blue-500 text-white';
    return 'bg-gray-200 text-gray-600';
  };

  const getConnectorColor = (isCompleted) => {
    return isCompleted ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
        <div className="text-sm text-gray-500">
          Stage {stages?.findIndex(s => s?.key === currentStage) + 1} of {stages?.length}
        </div>
      </div>
      <div className="relative">
        <div className="flex items-center justify-between">
          {stages?.map((stage, index) => {
            const isActive = stage?.key === currentStage;
            const isCompleted = stages?.findIndex(s => s?.key === currentStage) > index;

            return (
              <div key={stage?.key} className="flex flex-col items-center relative">
                {/* Connector Line */}
                {index < stages?.length - 1 && (
                  <div
                    className={`absolute top-6 left-12 w-full h-0.5 ${getConnectorColor(isCompleted)} z-0`}
                    style={{ width: 'calc(100% + 2rem)' }}
                  />
                )}
                {/* Stage Circle */}
                <button
                  onClick={() => onStageClick(stage?.key)}
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${getStageColor(stage?.key, isActive, isCompleted)}`}
                >
                  <Icon
                    name={getStageIcon(stage?.key)}
                    size={20}
                  />
                </button>
                {/* Stage Label */}
                <div className="mt-3 text-center max-w-24">
                  <div className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                    {stage?.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stage?.duration}
                  </div>
                </div>
                {/* Compliance Indicator */}
                {stage?.requiresCompliance && (
                  <div className="mt-2 flex items-center">
                    <Icon name="Shield" size={12} className="text-orange-500 mr-1" />
                    <span className="text-xs text-orange-600">RERA</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stage Details */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          {stages?.map((stage) => {
            if (stage?.key !== currentStage) return null;

            return (
              <div key={stage?.key}>
                <h4 className="font-medium text-gray-900 mb-2">{stage?.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{stage?.description}</p>
                {stage?.requirements && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stage?.requirements?.map((req, idx) => (
                        <li key={idx} className="flex items-center">
                          <Icon name="Check" size={14} className="text-green-500 mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowVisualization;