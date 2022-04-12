import { useEffect, useState } from 'react'

export default function useDebounce(value, timeout, callback) {
  const [timer, setTimer] = useState(null);
  const clearTimer = () => {
    clearTimeout(timer);
  }

  useEffect(() => {
    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
    clearTimer();
  }, [value]);
}