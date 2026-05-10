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
          blue: '#1a6fa8',
          navy: '#0a2a4a',
          deepblue: '#003580',
          orange: '#f47335',
          lightorange: '#ff6b35',
          gold: '#f0a500',
          sky: '#e8f4fd',
        }
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.10)',
        'float': '0 8px 40px rgba(0,53,128,0.18)',
        'hero': '0 20px 60px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
}
