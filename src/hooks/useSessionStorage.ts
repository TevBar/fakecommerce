// src/hooks/useSessionStorage.ts
import { useState, useEffect } from "react";

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading sessionStorage key:", key, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting sessionStorage key:", key, error);
    }
  };

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setValue];
}

export default useSessionStorage;
