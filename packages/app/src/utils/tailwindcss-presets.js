const plugin = require('tailwindcss/plugin')
const spacings = []
for (let i = 0; i <= 100; i++) {
  spacings.push(i * 2)
}
const spacingsSettings = spacings.reduce((pre, cur) => {
  pre[cur] = cur + 'px'
  return pre
}, {})
module.exports = {
  theme: {
    extend: {
      colors: {
        main: '#1159FF',
        second: '#E8F3FF',
        to: '#2D8CFF',
        mainText: '#262626',
        secondText: '#595959',
        thirdText: '#8C8C8C',
        borderDark: '#D9D9D9',
        borderLight: '#F0F0F0',
        limit: '#BFBFBF',
      },
      animation: {
        fade: 'fade 0.3s ease-in-out',
        slide: 'slide 0.3s ease-in-out',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
    spacing: {
      1: '1px',
      ...spacingsSettings,
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      // addBase({
      //   'html,body,#app': {
      //     fontFamily: 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif',
      //     height: '100%',
      //     'line-height': '1.15'
      //   }
      // })
      addUtilities({
        '.scrollbar-common': {
          '&::-webkit-scrollbar-track-piece': {
            background: '#d3dce6',
          },
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#99a9bf',
            'border-radius': '20px',
          },
        },
      })
      addUtilities(
        {
          '.before\\:content-placeholder': {
            content: 'attr(data-placeholder)',
          },
          '.before\\:content-empty': {
            content: "''",
          },
        },
        ['before'],
      )
    }),
  ],
}
