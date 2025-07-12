import React from 'react';
import { Play, RotateCcw, Wifi } from 'lucide-react';
import { useSpeedTest } from '../hooks/useSpeedTest';
import { SpeedGauge } from './SpeedGauge';
import { ProgressBar } from './ProgressBar';
import { TestResults } from './TestResults';
import { formatSpeed } from '../utils/speed-calculator';

export const SpeedTestMain: React.FC = () => {
  const { isRunning, progress, result, runSpeedTest, resetTest } = useSpeedTest();

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'ping':
        return 'bg-orange-500';
      case 'download':
        return 'bg-emerald-500';
      case 'upload':
        return 'bg-amber-500';
      case 'complete':
        return 'bg-yellow-500';
      default:
        return 'bg-amber-700';
    }
  };

  const getGaugeColor = (phase: string) => {
    switch (phase) {
      case 'ping':
        return '#F97316';
      case 'download':
        return '#10B981';
      case 'upload':
        return '#F59E0B';
      default:
        return '#92400E';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-amber-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Wood grain texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-amber-800 to-orange-900" 
           style={{
             backgroundImage: `
               linear-gradient(45deg, rgba(139, 69, 19, 0.1) 25%, transparent 25%),
               linear-gradient(-45deg, rgba(139, 69, 19, 0.1) 25%, transparent 25%),
               linear-gradient(45deg, transparent 75%, rgba(139, 69, 19, 0.1) 75%),
               linear-gradient(-45deg, transparent 75%, rgba(139, 69, 19, 0.1) 75%)
             `,
             backgroundSize: '20px 20px',
             backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
           }}>
      </div>
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Wifi className="w-12 h-12 text-amber-400 mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold text-amber-100 drop-shadow-lg">
            Speed Test
          </h1>
        </div>
        <p className="text-xl text-amber-200 max-w-2xl mx-auto">
          Test your internet connection speed with our advanced speed testing tool
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        {!result && !isRunning && (
          <div className="text-center">
            <div className="bg-amber-900/30 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-amber-700/40 mb-8 shadow-2xl">
              <div className="mb-8">
                <SpeedGauge
                  speed={0}
                  label="Ready"
                  unit="Mbps"
                  color="#92400E"
                />
              </div>
              
              <button
                onClick={runSpeedTest}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-amber-100 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto border border-amber-500/30"
              >
                <Play className="w-6 h-6 mr-3" />
                Start Speed Test
              </button>
            </div>
          </div>
        )}

        {isRunning && (
          <div className="text-center">
            <div className="bg-amber-900/30 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-amber-700/40 mb-8 shadow-2xl">
              <div className="mb-8">
                <SpeedGauge
                  speed={progress.currentSpeed}
                  label={progress.phase.charAt(0).toUpperCase() + progress.phase.slice(1)}
                  unit="Mbps"
                  color={getGaugeColor(progress.phase)}
                  maxSpeed={200}
                />
              </div>

              {progress.currentSpeed > 0 && (
                <div className="text-center mb-6">
                  <div className="text-lg text-amber-200">
                    Current Speed: <span className="text-amber-100 font-semibold">
                      {formatSpeed(progress.currentSpeed)}
                    </span>
                  </div>
                </div>
              )}

              <ProgressBar
                progress={progress.progress}
                phase={progress.phase}
                color={getPhaseColor(progress.phase)}
              />
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-8">
            <TestResults result={result} />
            
            <div className="text-center">
              <button
                onClick={resetTest}
                className="bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-amber-100 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto border border-amber-600/30"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Test Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-amber-300 relative z-10">
        <p className="text-sm">
          Results may vary based on network conditions and server location
        </p>
      </div>
    </div>
  );
};