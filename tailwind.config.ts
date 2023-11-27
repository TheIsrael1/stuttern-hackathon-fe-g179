import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      xm: '900px',
      lg: '1024px',
      xl: '1440px'
    },
    container: {
      center: true,
      screens: {
        xl: '1440px'
      }
    },
    extend: {
      padding: {
        'container-lg': '4.81rem',
        'container-base': '1.5rem'
      },
      margin: {
        'container-lg': '4.81rem',
        'container-base': '1.5rem'
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        jakarta: ['var(--font-jakarta)'],
        metal: ['var(--font-metal)']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: {
          1: '#0E0E0E',
          2: '#000000',
          3: '#171717'
        },
        green: {
          1: '#24B361'
        },
        gray: {
          1: '#EAEAEA',
          2: '#A3A3A3',
          3: '#6F6F6F',
          4: '#D4D4D4',
          5: '#BDBCBC',
          6: '#A2A2A2'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'button-gradient-1': 'linear-gradient(90deg, #24B361 0%, #00E461 100%)'
      },
      transitionProperty: {
        font: 'font-size, transform'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), nextui()]
};
export default config;
