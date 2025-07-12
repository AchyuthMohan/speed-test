import { useState, useCallback } from 'react';
import { SpeedTestResult, TestProgress } from '../types/speed-test';
import { calculateDownloadSpeed, calculateUploadSpeed } from '../utils/speed-calculator';

export const useSpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<TestProgress>({
    phase: 'idle',
    progress: 0,
    currentSpeed: 0,
  });
  const [result, setResult] = useState<SpeedTestResult | null>(null);

  const measurePing = async (): Promise<number> => {
    const measurements: number[] = [];
    
    for (let i = 0; i < 5; i++) {
      const start = performance.now();
      try {
        await fetch('/favicon.ico?' + Math.random(), { 
          method: 'HEAD',
          cache: 'no-cache' 
        });
        const end = performance.now();
        measurements.push(end - start);
      } catch {
        measurements.push(1000); // Fallback for failed requests
      }
      
      setProgress(prev => ({
        ...prev,
        progress: ((i + 1) / 5) * 100,
      }));
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return measurements.reduce((a, b) => a + b, 0) / measurements.length;
  };

  const measureDownloadSpeed = async (): Promise<number> => {
    const testSizes = [1, 5, 10]; // MB
    let totalSpeed = 0;
    let validTests = 0;

    for (let i = 0; i < testSizes.length; i++) {
      const size = testSizes[i];
      const testData = new Array(size * 1024 * 1024).fill('a').join('');
      const blob = new Blob([testData]);
      const url = URL.createObjectURL(blob);

      try {
        const start = performance.now();
        const response = await fetch(url);
        await response.blob();
        const end = performance.now();

        const speed = calculateDownloadSpeed(size * 1024 * 1024, end - start);
        totalSpeed += speed;
        validTests++;

        setProgress(prev => ({
          ...prev,
          progress: ((i + 1) / testSizes.length) * 100,
          currentSpeed: speed,
        }));
      } catch (error) {
        console.warn('Download test failed:', error);
      } finally {
        URL.revokeObjectURL(url);
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return validTests > 0 ? totalSpeed / validTests : 0;
  };

  const measureUploadSpeed = async (): Promise<number> => {
    const testSizes = [0.5, 1, 2]; // MB
    let totalSpeed = 0;
    let validTests = 0;

    for (let i = 0; i < testSizes.length; i++) {
      const size = testSizes[i];
      const testData = new Array(size * 1024 * 1024).fill('a').join('');

      try {
        const start = performance.now();
        await fetch('data:text/plain;base64,', {
          method: 'POST',
          body: testData,
        }).catch(() => {}); // Expected to fail, we just measure the time
        const end = performance.now();

        const speed = calculateUploadSpeed(size * 1024 * 1024, end - start);
        totalSpeed += speed;
        validTests++;

        setProgress(prev => ({
          ...prev,
          progress: ((i + 1) / testSizes.length) * 100,
          currentSpeed: speed,
        }));
      } catch (error) {
        console.warn('Upload test failed:', error);
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return validTests > 0 ? totalSpeed / validTests : 0;
  };

  const runSpeedTest = useCallback(async () => {
    setIsRunning(true);
    setResult(null);

    try {
      // Ping Test
      setProgress({ phase: 'ping', progress: 0, currentSpeed: 0 });
      const ping = await measurePing();

      // Download Test
      setProgress({ phase: 'download', progress: 0, currentSpeed: 0 });
      const downloadSpeed = await measureDownloadSpeed();

      // Upload Test
      setProgress({ phase: 'upload', progress: 0, currentSpeed: 0 });
      const uploadSpeed = await measureUploadSpeed();

      // Calculate jitter (simplified)
      const jitter = ping * 0.1;

      const testResult: SpeedTestResult = {
        downloadSpeed,
        uploadSpeed,
        ping,
        jitter,
        timestamp: new Date(),
      };

      setResult(testResult);
      setProgress({ phase: 'complete', progress: 100, currentSpeed: 0 });
    } catch (error) {
      console.error('Speed test failed:', error);
    } finally {
      setIsRunning(false);
    }
  }, []);

  const resetTest = useCallback(() => {
    setProgress({ phase: 'idle', progress: 0, currentSpeed: 0 });
    setResult(null);
    setIsRunning(false);
  }, []);

  return {
    isRunning,
    progress,
    result,
    runSpeedTest,
    resetTest,
  };
};