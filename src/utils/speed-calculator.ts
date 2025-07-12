export const formatSpeed = (speedMbps: number): string => {
  if (speedMbps >= 1000) {
    return `${(speedMbps / 1000).toFixed(2)} Gbps`;
  } else if (speedMbps >= 1) {
    return `${speedMbps.toFixed(2)} Mbps`;
  } else {
    return `${(speedMbps * 1000).toFixed(0)} Kbps`;
  }
};

export const formatPing = (pingMs: number): string => {
  return `${Math.round(pingMs)} ms`;
};

export const calculateDownloadSpeed = (bytes: number, timeMs: number): number => {
  const megabits = (bytes * 8) / 1000000;
  const seconds = timeMs / 1000;
  return megabits / seconds;
};

export const calculateUploadSpeed = (bytes: number, timeMs: number): number => {
  return calculateDownloadSpeed(bytes, timeMs);
};

export const getSpeedCategory = (speedMbps: number): { label: string; color: string } => {
  if (speedMbps >= 100) {
    return { label: 'Excellent', color: 'text-emerald-500' };
  } else if (speedMbps >= 50) {
    return { label: 'Very Good', color: 'text-amber-500' };
  } else if (speedMbps >= 25) {
    return { label: 'Good', color: 'text-yellow-500' };
  } else if (speedMbps >= 10) {
    return { label: 'Fair', color: 'text-orange-500' };
  } else {
    return { label: 'Poor', color: 'text-red-500' };
  }
};