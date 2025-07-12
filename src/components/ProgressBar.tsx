import React from 'react';

interface ProgressBarProps {
  progress: number;
  phase: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  phase,
  color = 'bg-amber-600',
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-amber-200 capitalize">
          {phase === 'idle' ? 'Ready' : `Testing ${phase}...`}
        </span>
        <span className="text-sm text-amber-300">{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full bg-amber-900/50 rounded-full h-2 overflow-hidden border border-amber-800/30">
        <div
          className={`h-full ${color} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-30 animate-pulse" />
        </div>
      </div>
    </div>
  );
};