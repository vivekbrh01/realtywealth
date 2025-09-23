/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* gray-200 */
        input: 'var(--color-input)', /* white */
        ring: 'var(--color-ring)', /* custom-navy */
        background: 'var(--color-background)', /* gray-50 */
        foreground: 'var(--color-foreground)', /* slate-700 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* custom-navy */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* custom-teal */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-50 */
          foreground: 'var(--color-muted-foreground)' /* slate-500 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* orange-600 */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)' /* slate-700 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)' /* slate-700 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* green-600 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-600 */
          foreground: 'var(--color-error-foreground)' /* white */
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'elevation-2': '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        'elevation-3': '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        'elevation-4': '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}