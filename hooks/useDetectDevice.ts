'use client';

import { UAParser } from 'ua-parser-js';
import { BREAKPOINTS, IS_SERVER } from '@/constants/responsive';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDeskTop: boolean;
}

const useDetectDevice = () => {
  const detectDeviceFromUA = () => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDeskTop: true,
      };
    }

    const { device } = UAParser(navigator.userAgent);
    return {
      isMobile: device.is('mobile'),
      isTablet: device.is('tablet'),
      isDeskTop: !device.type,
    };
  };

  const detectDeviceFromWindow = useCallback(() => {
    const innerWidth = window.innerWidth;
    return {
      isMobile: innerWidth < BREAKPOINTS.tablet,
      isTablet:
        innerWidth >= BREAKPOINTS.tablet && innerWidth < BREAKPOINTS.desktop,
      isDeskTop: innerWidth >= BREAKPOINTS.desktop,
    };
  }, []);

  const initialDevice = useMemo(() => detectDeviceFromUA(), []);

  const [device, setDevice] = useState<DeviceInfo>(initialDevice);

  const handleResize = throttle(() => {
    setDevice(detectDeviceFromWindow());
  }, 500);

  useEffect(() => {
    if (!IS_SERVER) {
      setDevice(detectDeviceFromWindow());
    }
  }, []);

  useEffect(() => {
    if (!IS_SERVER) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return device;
};

export default useDetectDevice;
