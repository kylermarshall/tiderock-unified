/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Seawind navy palette
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          600: '#1e3a8a',
          700: '#1e3369',
          800: '#172554',
          900: '#0f1a3d',
        },
        // Premier Packaging brand palette
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Platform colors
        linkedin: '#0A66C2',
        youtube: '#FF0000',
        twitter: '#000000',
        instagram: '#E1306C',
        facebook: '#1877F2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
