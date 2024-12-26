import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const tailwindConfig = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1280px',
      xl: '1600px',
    },
    fontSize: {
      '3xl': ['32px', '42px'],
      '2xl': ['24px', '32px'],
      xl: ['20px', '32px'],
      '2lg': ['18px', '26px'],
      lg: ['16px', '26px'],
      md: ['14px', '24px'],
      sm: ['13px', '22px'],
      xs: ['12px', '18px'],
    },
    fontWeight: {
      bold: '700',
      semibold: '600',
      medium: '500',
      regular: '400',
    },
    maxWidth: {
      container: '1600px',
      'container-md': '1200px',
    },
    minWidth: {
      container: '320px',
    },
    colors: {
      black: {
        100: '#6B6B6B',
        200: '#525252',
        300: '#373737',
        400: '#1F1F1F',
        500: '#040404',
      },
      gray: {
        50: '#FFFFFF',
        100: '#DEDEDE',
        200: '#C4C4C4',
        300: '#ABABAB',
        400: '#999999',
        500: '#808080',
      },
      orange: {
        50: '#FFF7EB',
        100: '#FCC369',
        200: '#FBAF37',
        300: '#F89A05',
        400: '#E18C05',
      },
      blue: {
        100: '#535779',
        200: '#3E415B',
        300: '#2A2C3D',
      },
      background: {
        100: '#FCFCFC',
        200: '#F7F7F7',
        300: '#EFEFEF',
      },
      line: {
        100: '#F2F2F2',
        200: '#E6E6E6',
      },
      error: '#FC4100',
    },
  },
  plugins: [
    function ({ addUtilities, theme }: PluginAPI) {
      addUtilities({
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '3px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: theme('colors.gray.200'),
          borderRadius: '100px',
        },
      });
    },
  ],
} satisfies Config;

export default tailwindConfig;
