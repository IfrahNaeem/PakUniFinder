/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        accent: '#2563EB',
        background: '#F1F5F9',
      },
    },
  },
  plugins: [],
}
