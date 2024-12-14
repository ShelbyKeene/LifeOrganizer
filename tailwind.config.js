/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0A192F',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translate(0px, 0px) scale(1)',
            opacity: '0.4'
          },
          '50%': {
            transform: 'translate(30px, -30px) scale(1.1)',
            opacity: '0.6'
          }
        },
        butterfly: {
          '0%, 100%': {
            transform: 'translate(0px, 0px) rotate(0deg)',
          },
          '25%': {
            transform: 'translate(50px, -30px) rotate(15deg)',
          },
          '50%': {
            transform: 'translate(100px, 0px) rotate(-15deg)',
          },
          '75%': {
            transform: 'translate(50px, 30px) rotate(15deg)',
          }
        },
        'wing-left': {
          '0%, 100%': { transform: 'rotate(-30deg) scaleX(0.8)' },
          '50%': { transform: 'rotate(30deg) scaleX(1.2)' }
        },
        'wing-right': {
          '0%, 100%': { transform: 'rotate(30deg) scaleX(0.8)' },
          '50%': { transform: 'rotate(-30deg) scaleX(1.2)' }
        },
        bee: {
          '0%, 100%': {
            transform: 'translate(0px, 0px)',
          },
          '25%': {
            transform: 'translate(30px, -20px)',
          },
          '50%': {
            transform: 'translate(60px, 0px)',
          },
          '75%': {
            transform: 'translate(30px, 20px)',
          }
        },
        buzz: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' }
        },
        'gentle-sway': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' }
        },
        'leaf-sway': {
          '0%, 100%': {
            transform: 'rotate(-2deg) scale(1)',
          },
          '50%': {
            transform: 'rotate(2deg) scale(1.05)',
          }
        }
      },
      animation: {
        float: 'float 20s ease-in-out infinite',
        butterfly: 'butterfly 20s ease-in-out infinite',
        'wing-left': 'wing-left 0.5s ease-in-out infinite',
        'wing-right': 'wing-right 0.5s ease-in-out infinite',
        bee: 'bee 10s ease-in-out infinite',
        buzz: 'buzz 0.2s ease-in-out infinite',
        'gentle-sway': 'gentle-sway 4s ease-in-out infinite',
        'leaf-sway': 'leaf-sway 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};