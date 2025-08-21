import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f7ff',
          100: '#e6efff',
          200: '#c7dcff',
          300: '#9fbfff',
          400: '#6d96ff',
          500: '#4a76ff',
          600: '#3559e6',
          700: '#2b46b4',
          800: '#243c8f',
          900: '#213671'
        }
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)'
      }
    }
  },
  plugins: []
} satisfies Config;
