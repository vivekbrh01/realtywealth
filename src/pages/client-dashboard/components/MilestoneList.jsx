import React from 'react';
import Icon from '../../../components/AppIcon';

const MilestoneList = ({ milestones }) => {
  const getPriorityColor = (priority) => {
    const colorMap = {
      'high': 'text-destructive bg-destructive/10',
      'medium': 'text-warning bg-warning/10',
      'low': 'text-success bg-success/10'
    };
    return colorMap?.[priority] || 'text-muted-foreground bg-muted/10';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffInDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays < 7) return `${diffInDays} days`;
    
    return date?.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-4">
      {milestones?.map((milestone) => (
        <div key={milestone?.id} className="flex items-center justify-between p-4 border border-border rounded-md hover:shadow-elevation-1 transition-smooth">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={16} className="text-secondary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">{milestone?.title}</h4>
              <p className="text-sm text-muted-foreground">{milestone?.description}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">{milestone?.client}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{milestone?.property}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(milestone?.priority)}`}>
              {milestone?.priority?.charAt(0)?.toUpperCase() + milestone?.priority?.slice(1)}
            </span>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">{formatDate(milestone?.dueDate)}</div>
              <div className="text-xs text-muted-foreground">{milestone?.type}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MilestoneList;