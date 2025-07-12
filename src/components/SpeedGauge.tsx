import React from 'react';

interface SpeedGaugeProps {
  speed: number;
  maxSpeed?: number;
  label: string;
  unit: string;
  color: string;
}

export const SpeedGauge: React.FC<SpeedGaugeProps> = ({
  speed,
  maxSpeed = 100,
  label,
  unit,
  color,
}) => {
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="rgba(139, 69, 19, 0.3)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-amber-100 mb-1">
          {speed.toFixed(1)}
        </div>
        <div className="text-sm text-amber-200 mb-1">{unit}</div>
        <div className="text-xs text-amber-300">{label}</div>
      </div>
    </div>
  );
};