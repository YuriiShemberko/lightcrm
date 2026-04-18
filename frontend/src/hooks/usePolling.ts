import { useEffect } from 'react';

export function usePolling(callback: () => void, interval: number) {
  useEffect(() => {
    callback(); // Викликаємо одразу при монтуванні
  }, []);

  useEffect(() => {
    const timer = setInterval(callback, interval);
    return () => clearInterval(timer);
  }, [callback, interval]);
}
