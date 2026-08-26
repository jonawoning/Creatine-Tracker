/** @type {import('tailwindcss').Config} */
export default {
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
        line: '#DFD9C8'
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
