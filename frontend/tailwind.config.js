/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        surfaceHover: '#F1F5F9',
        primary: '#2563EB',
        primaryHover: '#1D4ED8',
        secondary: '#4F46E5',
        accent: '#E11D48',
        textMain: '#0F172A',
        textMuted: '#64748B',
        border: '#E2E8F0'
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}