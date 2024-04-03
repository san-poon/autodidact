import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Brand color:  Hue -> 180 (Cyan) Platform Color: Saturation -> 65 
        wash: {
          50: '#f5fcfc',
          100: '#e6eeee',
          150: '#d5e0e0',
          200: '#c6d2d2',
          250: '#b7c4c4',
          300: '#a8b6b6',
          350: '#9aa8a8',
          400: '#8c9a9a',
          450: '#7d8c8c',
          500: '#707e7e',
          550: '#627070',
          600: '#556262',
          650: '#485454',
          700: '#3b4646',
          710: '#3a4444',
          720: '#374141',
          730: '#353e3e',
          740: '#323b3b',
          750: '#2f3838',
          760: '#2e3636',
          770: '#2b3333',
          780: '#283030',
          790: '#262d2d',
          800: '#232a2a',
          850: '#1d2323',
          900: '#171c1c',
          950: '#111515'
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 as unknown as string },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 as unknown as string },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
