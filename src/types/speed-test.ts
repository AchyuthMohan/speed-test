export interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  timestamp: Date;
}

export interface TestProgress {
  phase: 'idle' | 'ping' | 'download' | 'upload' | 'complete';
  progress: number;
  currentSpeed: number;
}