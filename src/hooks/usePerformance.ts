import { useEffect, useState } from 'react';

export const usePerformance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger visibility animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Mark as loaded after animations complete
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(loadTimer);
    };
  }, []);

  return { isVisible, isLoaded };
};

export const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return [setRef, isIntersecting] as const;
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
