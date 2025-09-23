import React from 'react';
import Icon from '../AppIcon';

const LoadingSpinner = ({ size = 20, className = '' }) => (
  <div className={`animate-spin ${className}`}>
    <Icon name="Loader2" size={size} />
  </div>
);

const SkeletonLine = ({ width = 'w-full', height = 'h-4', className = '' }) => (
  <div className={`bg-muted animate-pulse rounded ${width} ${height} ${className}`} />
);

const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-card border border-border rounded-md p-4 space-y-3 ${className}`}>
    <SkeletonLine width="w-3/4" height="h-5" />
    <SkeletonLine width="w-full" height="h-4" />
    <SkeletonLine width="w-1/2" height="h-4" />
  </div>
);

const SkeletonTable = ({ rows = 5, columns = 4, className = '' }) => (
  <div className={`bg-card border border-border rounded-md overflow-hidden ${className}`}>
    {/* Table Header */}
    <div className="border-b border-border p-4 space-y-2">
      <div className="flex space-x-4">
        {Array.from({ length: columns })?.map((_, index) => (
          <SkeletonLine key={index} width="flex-1" height="h-4" />
        ))}
      </div>
    </div>
    
    {/* Table Rows */}
    <div className="divide-y divide-border">
      {Array.from({ length: rows })?.map((_, rowIndex) => (
        <div key={rowIndex} className="p-4">
          <div className="flex space-x-4">
            {Array.from({ length: columns })?.map((_, colIndex) => (
              <SkeletonLine key={colIndex} width="flex-1" height="h-4" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LoadingOverlay = ({ isVisible, message = 'Loading...', className = '' }) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-[1030] ${className}`}>
      <div className="bg-card border border-border rounded-md p-6 shadow-elevation-4 flex items-center space-x-3">
        <LoadingSpinner size={24} />
        <span className="text-foreground font-medium">{message}</span>
      </div>
    </div>
  );
};

const InlineLoader = ({ message = 'Loading...', size = 'default', className = '' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    default: 'text-base',
    lg: 'text-lg'
  };

  const spinnerSizes = {
    sm: 16,
    default: 20,
    lg: 24
  };

  return (
    <div className={`flex items-center justify-center space-x-2 py-8 ${sizeClasses?.[size]} ${className}`}>
      <LoadingSpinner size={spinnerSizes?.[size]} />
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
};

const ButtonLoader = ({ size = 16, className = '' }) => (
  <LoadingSpinner size={size} className={className} />
);

const LoadingIndicator = {
  Spinner: LoadingSpinner,
  Skeleton: {
    Line: SkeletonLine,
    Card: SkeletonCard,
    Table: SkeletonTable
  },
  Overlay: LoadingOverlay,
  Inline: InlineLoader,
  Button: ButtonLoader
};

export default LoadingIndicator;