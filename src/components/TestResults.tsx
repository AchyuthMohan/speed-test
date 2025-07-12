import React from 'react';
import { Download, Upload, Zap, Activity } from 'lucide-react';
import { SpeedTestResult } from '../types/speed-test';
import { formatSpeed, formatPing, getSpeedCategory } from '../utils/speed-calculator';

interface TestResultsProps {
  result: SpeedTestResult;
}

export const TestResults: React.FC<TestResultsProps> = ({ result }) => {
  const downloadCategory = getSpeedCategory(result.downloadSpeed);
  const uploadCategory = getSpeedCategory(result.uploadSpeed);

  const metrics = [
    {
      icon: Download,
      label: 'Download',
      value: formatSpeed(result.downloadSpeed),
      category: downloadCategory,
      color: 'text-emerald-400',
    },
    {
      icon: Upload,
      label: 'Upload',
      value: formatSpeed(result.uploadSpeed),
      category: uploadCategory,
      color: 'text-amber-400',
    },
    {
      icon: Zap,
      label: 'Ping',
      value: formatPing(result.ping),
      category: { label: result.ping < 50 ? 'Excellent' : result.ping < 100 ? 'Good' : 'Fair', color: result.ping < 50 ? 'text-emerald-500' : result.ping < 100 ? 'text-amber-500' : 'text-red-500' },
      color: 'text-orange-400',
    },
    {
      icon: Activity,
      label: 'Jitter',
      value: formatPing(result.jitter),
      category: { label: result.jitter < 5 ? 'Excellent' : result.jitter < 10 ? 'Good' : 'Fair', color: result.jitter < 5 ? 'text-emerald-500' : result.jitter < 10 ? 'text-amber-500' : 'text-red-500' },
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-amber-100 mb-2">Test Results</h2>
        <p className="text-amber-300">
          Tested on {result.timestamp.toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="bg-amber-900/20 backdrop-blur-md rounded-xl p-6 border border-amber-700/30 hover:bg-amber-900/30 transition-all duration-300 shadow-lg"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
              <span className={`text-sm font-medium ${metric.category.color}`}>
                {metric.category.label}
              </span>
            </div>
            
            <div className="text-2xl font-bold text-amber-100 mb-1">
              {metric.value}
            </div>
            
            <div className="text-amber-300 text-sm">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};