import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketInsights = ({ insights }) => {
  const getInsightIcon = (type) => {
    const iconMap = {
      'rera_update': 'Shield',
      'tax_regulation': 'FileText',
      'market_trend': 'TrendingUp',
      'policy_change': 'AlertTriangle',
      'regional_performance': 'MapPin'
    };
    return iconMap?.[type] || 'Info';
  };

  const getInsightColor = (impact) => {
    const colorMap = {
      'high': 'border-l-destructive bg-destructive/5',
      'medium': 'border-l-warning bg-warning/5',
      'low': 'border-l-success bg-success/5',
      'neutral': 'border-l-secondary bg-secondary/5'
    };
    return colorMap?.[impact] || 'border-l-muted bg-muted/5';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-md">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Market Insights</h3>
        <p className="text-sm text-muted-foreground">Latest updates affecting Indian real estate</p>
      </div>
      <div className="p-6 space-y-4">
        {insights?.map((insight) => (
          <div key={insight?.id} className={`border-l-4 p-4 rounded-r-md ${getInsightColor(insight?.impact)}`}>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={getInsightIcon(insight?.type)} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground">{insight?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{insight?.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-muted-foreground">
                      <Icon name="Calendar" size={12} className="inline mr-1" />
                      {formatDate(insight?.date)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      <Icon name="MapPin" size={12} className="inline mr-1" />
                      {insight?.region}
                    </span>
                  </div>
                  <button className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
            View All Market Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;