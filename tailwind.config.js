/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
    colors: { ink: '#17213b', muted: '#68738d', violet: '#7058f5', cyan: '#37bce8' },
    boxShadow: { soft: '0 20px 60px rgba(51, 73, 130, .10)' }
  }},
  plugins: []
}