/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary Palette
          midnight: '#0B1020',
          deep: '#14264D',
          electric: '#3478F6',
          orange: '#FF6B00',
          amber: '#FFB547',
          // Neutrals
          white: '#FFFFFF',
          soft: '#F5F7FB',
          muted: '#667085',
          // Legacy aliases (keep for backward compatibility)
          navy: '#14264D',
          'navy-deep': '#0B1020',
          'navy-light': '#1E3A8A',
          blue: '#3478F6',
          'blue-electric': '#3B82F6',
          gold: '#FFB547',
          grey: '#F5F7FB',
          'grey-light': '#FAFAFB',
          'grey-border': '#E5E7EB',
          'grey-dark': '#D1D5DB',
          text: '#1A1F36',
          'text-muted': '#667085',
          'orange-hover': '#E05D00',
          'orange-light': '#FFF5EE',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      boxShadow: {
        'card': '0 4px 24px -4px rgba(11, 16, 32, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 48px -8px rgba(11, 16, 32, 0.18), 0 4px 16px -4px rgba(255, 107, 0, 0.12)',
        'nav': '0 2px 24px rgba(11, 16, 32, 0.12)',
        'button': '0 4px 16px rgba(255, 107, 0, 0.35)',
        'button-hover': '0 8px 28px rgba(255, 107, 0, 0.5)',
        'glow-blue': '0 0 32px -4px rgba(52, 120, 246, 0.45)',
        'glow-orange': '0 0 32px -4px rgba(255, 107, 0, 0.45)',
        'glass': '0 8px 32px rgba(11, 16, 32, 0.16), inset 0 0 0 1px rgba(255,255,255,0.1)',
        'inset-orange': 'inset 0 0 0 1.5px rgba(255, 107, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-dark': 'linear-gradient(135deg, #0B1020 0%, #14264D 60%, #1a3060 100%)',
        'orange-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF8C3D 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'shine': 'shine 3s linear infinite',
        'laser-sweep': 'laserSweep 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'btn-shimmer': 'btnShimmer 2.5s linear infinite',
        'draw-line': 'drawLine 1.2s ease-out forwards',
        'counter-up': 'counterUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        laserSweep: {
          '0%': { top: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        btnShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
        drawLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        counterUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-3%, 1%)' },
          '40%': { transform: 'translate(1%, -2%)' },
          '50%': { transform: 'translate(-1%, 3%)' },
          '60%': { transform: 'translate(3%, 1%)' },
          '70%': { transform: 'translate(-1%, -1%)' },
          '80%': { transform: 'translate(2%, 3%)' },
          '90%': { transform: 'translate(-2%, 0%)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '108': '1.08',
      },
    },
  },
  plugins: [],
}
