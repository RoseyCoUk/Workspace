import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'indigo' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  color = 'red',
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const colorStyles = {
    red: 'bg-red-600',
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    yellow: 'bg-yellow-500',
    indigo: 'bg-indigo-600',
    purple: 'bg-purple-600',
  };
  
  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <div className="flex justify-between w-full">
            <span className="text-xs font-medium text-gray-700">Progress</span>
            <span className="text-xs font-medium text-gray-700">{percentage}%</span>
          </div>
        )}
      </div>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`${colorStyles[color]} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;