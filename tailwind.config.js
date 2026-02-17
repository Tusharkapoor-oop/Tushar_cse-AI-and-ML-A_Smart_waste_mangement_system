/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        eco: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981', // Emerald Primary
          600: '#059669',
          900: '#064e3b',
        },
        cyber: {
          dark: '#0f172a',   // Slate 900
          card: '#1e293b',   // Slate 800
          accent: '#0ea5e9', // Sky 500
          neon: '#22d3ee',   // Cyan 400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}