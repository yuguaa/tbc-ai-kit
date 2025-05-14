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
  content: ['./public/**/*.html', './src/**/*.{vue,ts,tsx}'],
  prefix: 'y-', // 自定义前缀
  darkMode: 'media', // 或 'media' / 'class'
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
      spacing: {
        1: '1px',
        ...spacingsSettings,
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      // 自定义小工具类
      addUtilities(
        {
          '.scrollbar-common': {
            '&::-webkit-scrollbar-track-piece': {
              background: 'rgba(0, 0, 0, 0)',
            },
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '6px',
              'border-radius': '20px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 0, 0, 0)',
              'border-radius': '20px',
            },
            '&::-webkit-scrollbar-thumb:window-inactive': {
              background: 'rgba(0, 0, 0, 0)',
            },

            '&:hover::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 0, 0, 0.15)',
            },

            '&:hover::-webkit-scrollbar-thumb:window-inactive': {
              background: 'rgba(0, 0, 0, 0.2)',
            },
          },
          '.before\\:content-placeholder': {
            content: 'attr(data-placeholder)',
          },
          '.before\\:content-empty': {
            content: "''",
          },
        },
        {
          variants: ['before'],
        },
      )
    }),
  ],
}
