/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F1E8',
        ink: '#20281F',
        moss: {
          DEFAULT: '#3F6B52',
          light: '#5C8A6C',
          dark: '#2C4C39'
        },
        rust: {
          DEFAULT: '#B0562E',
          light: '#C97A3E'
        },
        line: '#DFD9C8',
        // Donker thema — zelfde familie, verdiept ipv omgekeerd naar zwart/wit
        night: {
          paper: '#161F19',
          ink: '#EDE8DB',
          card: '#1E2A22',
          line: '#2B3A30',
          moss: '#6FA582',
          rust: '#E08F5C'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
}
