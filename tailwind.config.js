/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ff88',
          dark: '#00cc6a',
          light: '#33ffaa',
        },
        secondary: {
          DEFAULT: '#00aaff',
          dark: '#0088cc',
          light: '#33bbff',
        },
        accent: {
          purple: '#9b59b6',
          orange: '#ff6600',
          yellow: '#f39c12',
        },
        danger: '#e74c3c',
        warning: '#f59e0b',
        success: '#10b981',
        dark: {
          bg: '#0a0a0a',
          card: '#1a1a1a',
          border: '#333333',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cisco': 'linear-gradient(45deg, #00ff88, #00aaff)',
        'gradient-purple': 'linear-gradient(45deg, #9b59b6, #e74c3c)',
        'gradient-orange': 'linear-gradient(45deg, #ff6600, #ff9933)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
