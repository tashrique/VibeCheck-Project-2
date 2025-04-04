/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'genz-purple': '#9370DB',
        'genz-pink': '#FF69B4',
        'genz-blue': '#00BFFF',
        'genz-green': '#7FFFD4',
        'genz-dark': '#191414',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  safelist: [
    'genz-gradient',
    'emoji-shadow',
    'card-hover',
    'genz-button',
  ],
  plugins: [],
} 