export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const ss = secs < 10 ? `0${secs}` : `${secs}`;
  if (hours > 0) {
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${ss}`;
  }
  return `${minutes}:${ss}`;
}
