/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'better-black': '#2c2c2c',
        'better-gray': '#3b3b3b',
        'better-white': '#F7FDF4',
      },
    },
    fontSize: {
      '2xs': '0.5rem',
      'md': '0.875rem'
    },
    fontFamily: {
      mono: ['var(--font-mono)'],
    },
  },
  plugins: [],
}
