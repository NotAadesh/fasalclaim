/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F1F7F3',
          100: '#E1EFE7',
          200: '#C3DFCF',
          300: '#99C7AE',
          400: '#69A986',
          500: '#3D8661',
          600: '#286848',
          700: '#1F5339',
          800: '#173F2B', // Brand Forest Green
          900: '#102E22', // Brand Deep Green
          950: '#091A13',
        },
        ivory: {
          50: '#FCFAF6',
          100: '#F7F5ED', // Brand Warm Ivory
          200: '#EFEBDC',
          300: '#E5DFC8',
          400: '#D6CCAA',
          500: '#C2B588',
        },
        sage: {
          50: '#F6F9F5',
          100: '#EDF3EC',
          200: '#DDE7DA', // Brand Muted Sage
          300: '#C5D6C1',
          400: '#A3BE9C',
          500: '#83A57B',
        },
        terracotta: {
          50: '#FBF5F2',
          100: '#F6EAE3',
          200: '#EDD3C4',
          300: '#E1B49D',
          400: '#D49270',
          500: '#C9794B', // Brand Restrained Terracotta Accent
          600: '#B25F33',
          700: '#904924',
          800: '#743B1E',
          900: '#5F311A',
        },
        charcoal: {
          DEFAULT: '#202820', // Brand Charcoal text
          muted: '#70786F',   // Brand Neutral grey
          dark: '#131913',
          light: '#3A443A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 46, 34, 0.05), 0 1px 2px -1px rgba(16, 46, 34, 0.05)',
        'card': '0 4px 20px -2px rgba(16, 46, 34, 0.06), 0 2px 6px -2px rgba(16, 46, 34, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(16, 46, 34, 0.12), 0 4px 10px -2px rgba(16, 46, 34, 0.06)',
        'elevated': '0 20px 40px -15px rgba(16, 46, 34, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}

