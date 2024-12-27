'use client';

import { useEffect, useRef, useCallback } from 'react';

type useIntersectionObserverProps = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: (entry: IntersectionObserverEntry) => void;
  enabled?: boolean;
};

/**
 * @deprecated useInView로 대체 추후 제거 예정
 */
const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
  enabled = true,
}: useIntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(
    (node: Element | null) => {
      if (!enabled || !node) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onIntersect(entry);
          }
        },
        { root, rootMargin, threshold },
      );

      observerRef.current.observe(node);
    },
    [enabled, root, rootMargin, threshold, onIntersect],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return observe;
};

export default useIntersectionObserver;
