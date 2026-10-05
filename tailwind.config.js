/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#080808',
          secondary: '#101010',
          card: '#151515',
          elevated: '#1a1a1a',
        },
        border: {
          subtle: '#292929',
          muted: '#1f1f1f',
          accent: '#B11226',
        },
        crimson: {
          dark: '#750F1C',
          DEFAULT: '#B11226',
          accent: '#D62839',
          light: '#e03a4c',
          subtle: 'rgba(177, 18, 38, 0.12)',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A0A0A0',
          muted: '#666666',
        },
      },
      fontFamily: {
        display: [
          '"Barlow Condensed"',
          '-apple-system',
          'sans-serif',
        ],
        sans: [
          '"IBM Plex Sans"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'monospace',
        ],
      },
      boxShadow: {
        'crimson-sm': '0 2px 8px -2px rgba(177, 18, 38, 0.25)',
        'crimson-md': '0 4px 20px -2px rgba(177, 18, 38, 0.35)',
        'dark-card': '0 8px 30px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}
