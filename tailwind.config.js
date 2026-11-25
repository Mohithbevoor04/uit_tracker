/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        axa: {
          blue: '#00008f',
          red: '#c91432',
          lightBlue: '#004fe6',
          darkBlue: '#00005a',
          sky: '#e8f0fe',
          gray: '#f5f7fa',
          darkGray: '#333333',
          purple: '#6b3074',
          headerBg: '#64226f',
          accent: '#0275d8'
        }
      }
    },
  },
  plugins: [],
}
