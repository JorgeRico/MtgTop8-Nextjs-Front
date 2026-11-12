/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#101419',
          dim: '#0a0e13',
          low: '#181c21',
          card: '#13181f',
          high: '#20262e',
          border: '#232c38',
          hover: '#293340',
        },
        primary: {
          DEFAULT: '#f97316',
          container: '#c2410c',
          glow: 'rgba(249, 115, 22, 0.4)',
        },
        mana: {
          white: '#F8F6D8',
          blue: '#0E68AB',
          black: '#150B00',
          red: '#D3202A',
          green: '#00733E',
        },
      },
    },
  },
  plugins: [],
}