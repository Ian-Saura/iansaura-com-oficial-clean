/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Nivel 0 - Teal colors
    'text-teal-400', 'text-teal-300', 'text-teal-500',
    'bg-teal-500', 'bg-teal-600', 'bg-teal-500/20', 'bg-teal-500/40',
    'border-teal-500/30', 'border-teal-500/20', 'border-teal-500/50',
    'from-teal-500', 'from-teal-600', 'from-teal-900/30',
    'via-teal-500', 'to-teal-400',
    'shadow-teal-500/40', 'shadow-teal-500/30',
    'hover:bg-teal-600',
    // Nivel 1 - Emerald
    'text-emerald-400', 'text-emerald-300',
    'bg-emerald-500/20', 'bg-emerald-500/40',
    'border-emerald-500/30', 'border-emerald-500/50',
    'shadow-emerald-500/40',
    // Nivel 2 - Blue
    'text-blue-400', 'text-blue-300',
    'bg-blue-500/20', 'bg-blue-500/40',
    'border-blue-500/30', 'border-blue-500/50',
    'shadow-blue-500/40',
    // Nivel 3 - Purple  
    'text-purple-400', 'text-purple-300',
    'bg-purple-500/20', 'bg-purple-500/40',
    'border-purple-500/30', 'border-purple-500/50',
    'shadow-purple-500/40',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 