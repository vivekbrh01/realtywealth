import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkflowTracker = ({ currentStage, stages }) => {
  const getStageIcon = (stage) => {
    const icons = {
      'property-identification': 'Search',
      'due-diligence': 'FileSearch',
      'legal-verification': 'Scale',
      'rera-compliance': 'Shield',
      'financing-arrangement': 'CreditCard',
      'documentation': 'FileText',
      'final-acquisition': 'Key',
      'completed': 'CheckCircle'
    };
    return icons?.[stage] || 'Circle';
  };

  const getStageStatus = (stage, currentStage) => {
    const stageOrder = [
      'property-identification',
      'due-diligence',
      'legal-verification',
      'rera-compliance',
      'financing-arrangement',
      'documentation',
      'final-acquisition',
      'completed'
    ];

    const currentIndex = stageOrder?.indexOf(currentStage);
    const stageIndex = stageOrder?.indexOf(stage);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Purchase Workflow Progress</h3>
      <div className="space-y-4">
        {stages?.map((stage, index) => {
          const status = getStageStatus(stage?.key, currentStage);
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';
          const isPending = status === 'pending';

          return (
            <div key={stage?.key} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${isCompleted ? 'bg-green-100 border-green-500 text-green-600' : ''}
                  ${isCurrent ? 'bg-blue-100 border-blue-500 text-blue-600' : ''}
                  ${isPending ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
                `}>
                  <Icon
                    name={isCompleted ? 'Check' : getStageIcon(stage?.key)}
                    size={20}
                  />
                </div>
                {index < stages?.length - 1 && (
                  <div className={`
                    w-0.5 h-8 mt-2 transition-all
                    ${isCompleted ? 'bg-green-300' : 'bg-gray-200'}
                  `} />
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`
                    font-medium transition-all
                    ${isCompleted ? 'text-green-700' : ''}
                    ${isCurrent ? 'text-blue-700' : ''}
                    ${isPending ? 'text-gray-500' : ''}
                  `}>
                    {stage?.title}
                  </h4>
                  {stage?.completedDate && (
                    <span className="text-sm text-gray-500">{stage?.completedDate}</span>
                  )}
                </div>

                <p className={`
                  text-sm mb-2 transition-all
                  ${isCompleted ? 'text-green-600' : ''}
                  ${isCurrent ? 'text-blue-600' : ''}
                  ${isPending ? 'text-gray-400' : ''}
                `}>
                  {stage?.description}
                </p>

                {stage?.requirements && (
                  <div className="space-y-1">
                    {stage?.requirements?.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center gap-2 text-sm">
                        <Icon
                          name={req?.completed ? 'CheckCircle2' : 'Circle'}
                          size={16}
                          className={req?.completed ? 'text-green-500' : 'text-gray-400'}
                        />
                        <span className={req?.completed ? 'text-gray-700' : 'text-gray-500'}>
                          {req?.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {isCurrent && stage?.nextActions && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">Next Actions:</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {stage?.nextActions?.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-center gap-2">
                          <Icon name="ArrowRight" size={14} />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowTracker;