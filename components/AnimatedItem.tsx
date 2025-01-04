'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';

type DirectionType = 'top' | 'bottom' | 'right' | 'left';

interface AnimatedItemProps {
  delay?: number;
  direction?: DirectionType;
  className?: string;
}

const getTranslateClass = (direction: DirectionType) => {
  if (direction === 'left') {
    return '-translate-x-1/2';
  }
  if (direction === 'right') {
    return 'translate-x-1/2';
  }
  if (direction === 'bottom') {
    return 'translate-y-1/2';
  }
  if (direction === 'top') {
    return '-translate-y-1/2';
  }
  return '';
};

const AnimatedItem = ({
  delay = 0,
  direction = 'bottom',
  className,
  children,
}: PropsWithChildren<AnimatedItemProps>) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              const translateClass = getTranslateClass(direction);

              const translateNoneClass =
                direction === 'left' || direction === 'right'
                  ? 'translate-x-0'
                  : 'translate-y-0';

              entry.target.classList.add('opacity-100', translateNoneClass);
              entry.target.classList.remove(translateClass);
            }, delay);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (item) {
      observer.observe(item);
    }

    return () => {
      if (item) {
        observer.unobserve(item);
      }
      observer.disconnect();
    };
  }, [delay, direction]);

  return (
    <div
      ref={itemRef}
      className={`opacity-0 ${getTranslateClass(direction)} transition-all duration-500 ${className}`}
      data-delay={delay}
      data-direction={direction}
    >
      {children}
    </div>
  );
};

export default AnimatedItem;
