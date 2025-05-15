/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'bounce-top': 'bounceTop 0.9s ease 0s 1 normal both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceTop: {
          '0%': {
            transform: 'translateY(-45px)',
            animationTimingFunction: 'ease-in',
            opacity: '1',
          },
          '24%': {
            opacity: '1',
          },
          '40%': {
            transform: 'translateY(-24px)',
            animationTimingFunction: 'ease-in',
          },
          '65%': {
            transform: 'translateY(-12px)',
            animationTimingFunction: 'ease-in',
          },
          '82%': {
            transform: 'translateY(-6px)',
            animationTimingFunction: 'ease-in',
          },
          '93%': {
            transform: 'translateY(-4px)',
            animationTimingFunction: 'ease-in',
          },
          '25%': {
            transform: 'translateY(0px)',
            animationTimingFunction: 'ease-out',
          },
          '55%': {
            transform: 'translateY(0px)',
            animationTimingFunction: 'ease-out',
          },
          '75%': {
            transform: 'translateY(0px)',
            animationTimingFunction: 'ease-out',
          },
          '87%': {
            transform: 'translateY(0px)',
            animationTimingFunction: 'ease-out',
          },
          '100%': {
            transform: 'translateY(0px)',
            animationTimingFunction: 'ease-out',
            opacity: '1',
          },
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
