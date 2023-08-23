import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Read the value from session storage
  const readValue = useCallback((): T => {
    try {
      const item = typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null;
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // Update the stored value and sessionStorage
  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        setStoredValue(newValue);
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(newValue));
          const event = new Event('session-storage');
          window.dispatchEvent(event);
        }
      } catch (error) {
        console.warn(`Error setting sessionStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  // Handle storage change event
  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key === key) {
        setStoredValue(readValue());
      }
    },
    [key, readValue]
  );

  useEffect(() => {
    // Sync initial value on mount
    setStoredValue(readValue());

    // Add storage change event listener
    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange, readValue]);

  return [storedValue, setValue];
}

// A wrapper for "JSON.parse()" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
}